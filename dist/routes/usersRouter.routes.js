"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

var _userController = _interopRequireDefault(require("../controller/userController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRouter = (0, _express.Router)();

var storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
    cb(null, `${file.fieldname}-${uniqueSuffix}${_path.default.extname(file.originalname)}`);
  }
});

const upload = (0, _multer.default)({
  storage
});
usersRouter.post('/', _userController.default.create);
usersRouter.get('/:id', _userController.default.profile);
usersRouter.post('/:id', upload.single("imagem"), _userController.default.picture_profile);
var _default = usersRouter;
exports.default = _default;