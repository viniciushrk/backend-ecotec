"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _express = require("express");
var _userController = _interopRequireDefault(require("../controller/userController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const usersRouter = (0, _express.Router)();
usersRouter.post('/', _userController.default.create);
var _default = usersRouter;
exports.default = _default;
