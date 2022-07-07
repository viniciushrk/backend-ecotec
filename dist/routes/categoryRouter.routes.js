"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _Categorias = _interopRequireDefault(require("../entity/Categorias"));

var _ensureAuthenticated = _interopRequireDefault(require("../middleware/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoryRouter = (0, _express.Router)();
categoryRouter.use(_ensureAuthenticated.default);
categoryRouter.get('/', async (request, response) => {
  const categoriasRepo = (0, _typeorm.getMongoRepository)(_Categorias.default);
  const categorias = await categoriasRepo.find();
  return response.json(categorias);
});
categoryRouter.post('/', async (req, res) => {
  const categoria = req.body;
  const categoriasRepo = (0, _typeorm.getMongoRepository)(_Categorias.default);
  const categoriaCreate = categoriasRepo.create(categoria);
  await categoriasRepo.save(categoriaCreate);
  return res.status(202).json({
    message: "Criado com sucesso."
  });
});
categoryRouter.put('/update', async (req, res) => {
  const {
    id,
    nome
  } = req.body;
  const categoriasRepo = (0, _typeorm.getMongoRepository)(_Categorias.default);
  const categoria = await categoriasRepo.update(id, {
    name: nome
  });
  return res.json({
    message: "Atualizado com sucesso."
  });
});
var _default = categoryRouter;
exports.default = _default;