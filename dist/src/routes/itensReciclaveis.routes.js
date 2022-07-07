"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
const ItensReciclaveis_1 = __importDefault(require("../entity/ItensReciclaveis"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const Anexos_1 = __importDefault(require("../entity/Anexos"));
const ensureAuthenticated_1 = __importDefault(require("../middleware/ensureAuthenticated"));
const Users_1 = __importDefault(require("../entity/Users"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});
const itensReciclaveisRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)({ storage });
const formatmoney = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };
itensReciclaveisRouter.get('/', async (request, response) => {
    const itensRepo = (0, typeorm_1.getMongoRepository)(ItensReciclaveis_1.default);
    const UserRepo = (0, typeorm_1.getMongoRepository)(Users_1.default);
    const itens = await itensRepo.find();
    itens.map(async (x) => {
        x.user = await UserRepo.findOne({ _id: new mongodb_1.ObjectID(x.user_id) });
    });
    itens.map(x => {
        x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
        x.imagem = `data:image/png;base64, ${getImage(x.imagem)}`;
    });
    return response.json(itens);
});
itensReciclaveisRouter.get('/:id', async (request, response) => {
    const params = request.params;
    const itensRepo = (0, typeorm_1.getMongoRepository)(ItensReciclaveis_1.default);
    const UserRepo = (0, typeorm_1.getMongoRepository)(Users_1.default);
    const item = await itensRepo.findOne({ _id: new mongodb_1.ObjectID(params.id) });
    if (item != undefined) {
        item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
        item.user = await UserRepo.findOne({ _id: new mongodb_1.ObjectID(item.user_id) });
        item.imagem = `data:image/png;base64, ${getImage(item.imagem)}`;
    }
    return response.json(item);
});
function getImage(caminho) {
    try {
        const filePath = path.join(__dirname, '..', '..', 'uploads', caminho);
        console.log(__dirname);
        const f = fs_1.default.readFileSync(filePath, { encoding: 'base64' });
        return f ?? null;
    }
    catch {
        return null;
    }
}
itensReciclaveisRouter.patch('/:path', async (request, response) => {
    const paths = request.params;
    const filePath = path.join(__dirname, '..', '..', 'uploads', paths.path);
    console.log(__dirname);
    const f = fs_1.default.createReadStream(filePath, { encoding: 'base64' });
    f.pipe(response);
});
itensReciclaveisRouter.use(ensureAuthenticated_1.default);
itensReciclaveisRouter.post('/', upload.single("imagem"), async (request, response) => {
    const itemReciclavel = request.body;
    const ItensReciclaveisRepo = (0, typeorm_1.getMongoRepository)(ItensReciclaveis_1.default);
    const AnexoRepo = (0, typeorm_1.getMongoRepository)(Anexos_1.default);
    const arquivo = request.file;
    const user_id = request.user.id;
    console.log(user_id);
    if (arquivo == undefined) {
        return response.status(400).json({ message: "Arquivo não encontrado, informe a imagem do item." });
    }
    const caminho = `${arquivo.filename}`;
    // const caminho = `${arquivo.filename}${path.extname(arquivo.originalname)}`
    const anexoCreate = AnexoRepo.create({ tipo: "profile", caminho: caminho });
    await AnexoRepo.save(anexoCreate);
    const ItensReciclaveisCreate = ItensReciclaveisRepo.create({
        nome: itemReciclavel.nome,
        descricao: itemReciclavel.descricao,
        itens: JSON.parse(itemReciclavel.itens),
        imagem: anexoCreate.caminho.toString(),
        user_id: user_id,
        categoria_id: itemReciclavel.categoria_id,
        preco: parseFloat(itemReciclavel.preco.toString())
    });
    await ItensReciclaveisRepo.save(ItensReciclaveisCreate);
    return response.json({ message: "Cadastrado", ItensReciclaveisCreate });
});
exports.default = itensReciclaveisRouter;
