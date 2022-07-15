"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Categorias = _interopRequireDefault(require("../entity/Categorias"));

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _path = _interopRequireDefault(require("path"));

var _getImage = _interopRequireDefault(require("../config/getImage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async get(request, response) {
    try {
      const categoriasRepo = (0, _typeorm.getMongoRepository)(_Categorias.default);
      const categorias = await categoriasRepo.find();
      return response.json(categorias);
    } catch (e) {
      throw new _AppError.default("Error internal");
    }
  },

  async store(request, response) {
    try {
      let categoria = request.body;
      const categoriasRepo = (0, _typeorm.getMongoRepository)(_Categorias.default);
      const arquivo = request.file;

      if (arquivo == undefined) {
        return response.status(400).json({
          message: "Arquivo não encontrado, informe a imagem do item."
        });
      }

      const caminho = `${arquivo.filename}${_path.default.extname(arquivo.originalname)}`;
      categoria.imagem = (0, _getImage.default)(caminho);
      const categoriaCreate = categoriasRepo.create(categoria);
      await categoriasRepo.save(categoriaCreate);
      return response.status(201).json({
        message: "Criado com sucesso."
      });
    } catch (e) {
      throw new _AppError.default("Error internal");
    }
  },

  async update(req, res) {
    try {
      const {
        id,
        nome
      } = req.body;
      const categoriasRepo = (0, _typeorm.getMongoRepository)(_Categorias.default);
      await categoriasRepo.update(id, {
        name: nome
      });
      return res.json({
        message: "Atualizado com sucesso."
      });
    } catch (e) {
      throw new _AppError.default("Error internal");
    }
  }

};
exports.default = _default;