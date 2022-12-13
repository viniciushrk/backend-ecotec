"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _getImage = _interopRequireDefault(require("../config/getImage"));

var _ItensReciclaveis = _interopRequireDefault(require("../entity/ItensReciclaveis"));

var _Users = _interopRequireDefault(require("../entity/Users"));

var _mongodb = require("mongodb");

var _Anexos = _interopRequireDefault(require("../entity/Anexos"));

var _fs = _interopRequireDefault(require("fs"));

var path = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatmoney = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL'
};
var _default = {
  async all(request, response) {
    const {
      filter
    } = request.query;

    if (filter != undefined) {
      const itensRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
      const itens = await itensRepo.find({
        where: {
          nome: {
            $eq: filter
          } // { user: Like(`${filter}`) }

        }
      });
      itens.map(item => {
        if (item != undefined) {
          item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
        }
      });
      return response.json(itens);
    }

    const itensRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
    const itens = await itensRepo.find();
    itens.map(async x => {
      x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
    });
    return response.json(itens);
  },

  async get(request, response) {
    try {
      const params = request.params;
      const itensRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
      const UserRepo = (0, _typeorm.getMongoRepository)(_Users.default);
      const item = await itensRepo.findOne({
        _id: new _mongodb.ObjectID(params.id)
      });

      if (item != undefined) {
        item.imagem = '';
        item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
        item.user = await UserRepo.findOne({
          _id: new _mongodb.ObjectID(item.user_id)
        });
      }

      return response.json(item);
    } catch (e) {
      throw new _AppError.default("Error internal");
    }
  },

  async getByDescriptionOrUser(filter) {
    try {
      const itensRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
      const itens = await itensRepo.find({
        where: [{
          nome: (0, _typeorm.Like)(`${filter}`)
        }, {
          user: (0, _typeorm.Like)(`${filter}`)
        }]
      });
      itens.map(item => {
        if (item != undefined) {
          item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
        }
      });
      return itens;
    } catch (e) {
      console.error(e);
      throw new _AppError.default("Error internal");
    }
  },

  async store(request, response) {
    try {
      const itemReciclavel = request.body;
      const ItensReciclaveisRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
      const UserRepo = (0, _typeorm.getMongoRepository)(_Users.default);
      const user_id = request.user.id;
      const user = await UserRepo.findOne({
        _id: new _mongodb.ObjectID(user_id)
      });
      console.log("user: ", user);
      const data = {
        nome: itemReciclavel.nome,
        descricao: itemReciclavel.descricao,
        itens: itemReciclavel.itens,
        imagem: '',
        user_id: user_id,
        user: `${user?.nome} - ${user?.telefone}`,
        categoria_id: itemReciclavel.categoria_id,
        preco: parseFloat(itemReciclavel.preco)
      };
      const ItensReciclaveisCreate = ItensReciclaveisRepo.create(data);
      await ItensReciclaveisRepo.save(ItensReciclaveisCreate);
      return response.json({
        message: "Cadastrado",
        ItensReciclaveisCreate
      });
    } catch (e) {
      return response.status(500).json(e);
    }
  },

  async uploadImage(request, response) {
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
      imagem: (0, _getImage.default)(anexoCreate.caminho)
    });
    return response.status(201).json({
      message: "Imagem cadastrada"
    });
  },

  async patchImage(request, response) {
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
  },

  async delete(request, response) {
    try {
      const {
        id
      } = request.params;
      const ItensReciclaveisRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
      await ItensReciclaveisRepo.delete(id);
      return response.json({
        message: "Deletado com sucesso"
      });
    } catch (e) {
      throw new _AppError.default("Error internal");
    }
  }

};
exports.default = _default;