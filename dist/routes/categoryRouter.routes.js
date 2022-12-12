"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _storage = _interopRequireDefault(require("../config/storage"));

var _categoryController = _interopRequireDefault(require("../controller/categoryController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const categoryRouter = (0, _express.Router)();
categoryRouter.get('/', _categoryController.default.get);
categoryRouter.post('/', _storage.default.single("imagem"), _categoryController.default.store);
categoryRouter.put('/update', _categoryController.default.update);
var _default = categoryRouter;
exports.default = _default;