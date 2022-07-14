"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _mongodb = require("mongodb");

var _ItensReciclaveis = _interopRequireDefault(require("../entity/ItensReciclaveis"));

var _multer = _interopRequireDefault(require("multer"));

var _fs = _interopRequireDefault(require("fs"));

var path = _interopRequireWildcard(require("path"));

var _Anexos = _interopRequireDefault(require("../entity/Anexos"));

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

var _Users = _interopRequireDefault(require("../entity/Users"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const itensReciclaveisRouter = (0, _express.Router)();
const upload = (0, _multer.default)({
  storage
});
const formatmoney = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL'
};
itensReciclaveisRouter.get('/', async (request, response) => {
  const itensRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
  const UserRepo = (0, _typeorm.getMongoRepository)(_Users.default);
  const itens = await itensRepo.find();
  itens.map(async x => {
    x.user = await UserRepo.findOne({
      _id: new _mongodb.ObjectID(x.user_id)
    });
  });
  itens.map(x => {
    x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
    x.imagem = `data:image/png;base64, ${getImage(x.imagem)}`;
  });
  return response.json(itens);
});
itensReciclaveisRouter.get('/:id', async (request, response) => {
  const params = request.params;
  const itensRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
  const UserRepo = (0, _typeorm.getMongoRepository)(_Users.default);
  const item = await itensRepo.findOne({
    _id: new _mongodb.ObjectID(params.id)
  });

  if (item != undefined) {
    if (item.preco != null) {
      item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
    }

    item.user = await UserRepo.findOne({
      _id: new _mongodb.ObjectID(item.user_id)
    });
    item.imagem = `data:image/png;base64, ${getImage(item.imagem)}`;
  }

  return response.json(item);
});

function getImage(caminho) {
  try {
    const filePath = path.join(__dirname, '..', '..', 'uploads', caminho);
    console.log(__dirname);

    const f = _fs.default.readFileSync(filePath, {
      encoding: 'base64'
    });

    return f ?? null;
  } catch {
    return null;
  }
}

itensReciclaveisRouter.patch('/:path', async (request, response) => {
  try {
    const paths = request.params;
    const filePath = path.join(__dirname, '..', '..', 'uploads', paths.path);
    console.log(__dirname);

    const f = _fs.default.readFileSync(filePath, {
      encoding: 'base64'
    });

    return response.status(200).json({
      imagem: `data:image/png;base64, ${f}`
    });
  } catch (e) {
    return response.status(500).json({
      mensage: `Error internal ${e}`
    });
  }
});
itensReciclaveisRouter.use(_ensureAuthenticated.default);
itensReciclaveisRouter.post('/:id', upload.single("imagem"), async (request, response) => {
  const ItensReciclaveisRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
  const AnexoRepo = (0, _typeorm.getMongoRepository)(_Anexos.default);
  const arquivo = request.file;

  if (arquivo == undefined) {
    return response.status(400).json({
      message: "Arquivo não encontrado, informe a imagem do item."
    });
  }

  const caminho = `${arquivo.filename}`;
  const anexoCreate = AnexoRepo.create({
    tipo: "itens",
    caminho: caminho
  });
  await AnexoRepo.save(anexoCreate);
  const id = request.params.id;
  await ItensReciclaveisRepo.update(id, {
    imagem: anexoCreate.caminho.toString()
  });
  return response.status(201).json({
    message: "Imagem cadastrada"
  });
});
itensReciclaveisRouter.post('/', async (request, response) => {
  try {
    const itemReciclavel = request.body;
    const ItensReciclaveisRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
    const user_id = request.user.id;
    const ItensReciclaveisCreate = ItensReciclaveisRepo.create({
      nome: itemReciclavel.nome,
      descricao: itemReciclavel.descricao,
      itens: itemReciclavel.itens,
      imagem: '',
      user_id: user_id,
      categoria_id: itemReciclavel.categoria_id,
      preco: itemReciclavel.preco
    });
    await ItensReciclaveisRepo.save(ItensReciclaveisCreate);
    return response.json({
      message: "Cadastrado",
      ItensReciclaveisCreate
    });
  } catch (e) {
    return response.status(500).json(e);
  }
});
itensReciclaveisRouter.delete('/:id', async (request, response) => {
  const {
    id
  } = request.params;
  const ItensReciclaveisRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
  await ItensReciclaveisRepo.delete(id);
  return response.json({
    message: "Deletado com ssucesso"
  });
});
var _default = itensReciclaveisRouter;
exports.default = _default;