"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authenticate = _interopRequireDefault(require("./authenticate.routes"));

var _categoryRouter = _interopRequireDefault(require("./categoryRouter.routes"));

var _itensReciclaveis = _interopRequireDefault(require("./itensReciclaveis.routes"));

var _usersRouter = _interopRequireDefault(require("./usersRouter.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.get('/', (req, res) => {
  return res.json({
    message: 'Tá funfando'
  });
});
routes.use('/categorias', _categoryRouter.default);
routes.use('/itensReciclaveis', _itensReciclaveis.default);
routes.use('/user', _usersRouter.default);
routes.use('/login', _authenticate.default);
var _default = routes;
exports.default = _default;