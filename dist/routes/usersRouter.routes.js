"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _storage = _interopRequireDefault(require("../config/storage"));

var _userController = _interopRequireDefault(require("../controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();
usersRouter.post('/', _userController.default.create);
usersRouter.get('/', _userController.default.helpPeoples);
usersRouter.get('/:id', _userController.default.profile);
usersRouter.post('/:id', _storage.default.single("imagem"), _userController.default.picture_profile);
var _default = usersRouter;
exports.default = _default;