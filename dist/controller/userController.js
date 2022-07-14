"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Anexos = _interopRequireDefault(require("../entity/Anexos"));

var _Users = _interopRequireDefault(require("../entity/Users"));

var _typeorm = require("typeorm");

var _createUserServicec = _interopRequireDefault(require("../services/createUserServicec"));

var _getUserServiceWithItens = _interopRequireDefault(require("../services/getUserServiceWithItens"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async create(request, response) {
    const {
      nome,
      email,
      senha,
      telefone
    } = request.body;
    await _createUserServicec.default.execute({
      nome: nome,
      email: email,
      senha: senha,
      telefone: telefone
    });
    return response.json({
      message: "Usuário criado com sucesso."
    });
  },

  async profile(request, response) {
    const {
      id
    } = request.params;
    const result = await _getUserServiceWithItens.default.execute(id);
    return response.json(result);
  },

  async picture_profile(request, response) {
    const {
      id
    } = request.params;
    const UserRepo = (0, _typeorm.getMongoRepository)(_Users.default);
    const AnexoRepo = (0, _typeorm.getMongoRepository)(_Anexos.default);
    const arquivo = request.file;

    if (arquivo == undefined) {
      return response.status(400).json({
        message: "Arquivo não encontrado, informe a imagem do item."
      });
    }

    const caminho = `${arquivo.filename}`;
    const anexoCreate = AnexoRepo.create({
      tipo: "profile",
      caminho: caminho
    });
    await AnexoRepo.save(anexoCreate);
    await UserRepo.update(id, {
      foto_user: anexoCreate.caminho.toString()
    });
    return response.status(201).json({
      message: "Imagem cadastrada"
    });
  }

};
exports.default = _default;