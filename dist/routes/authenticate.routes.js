"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _bcryptjs = require("bcryptjs");

var _Users = _interopRequireDefault(require("../entity/Users"));

var _jsonwebtoken = require("jsonwebtoken");

var _auth = _interopRequireDefault(require("../config/auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticateRouter = (0, _express.Router)();
authenticateRouter.post('/', async (request, response) => {
  const {
    email,
    password
  } = request.body;

  if (!email || !password) {
    return response.status(400).json({
      message: "Informe o email e a senha."
    });
  }

  const UsersRepo = (0, _typeorm.getMongoRepository)(_Users.default);
  const user = await UsersRepo.findOne({
    where: {
      email: email
    }
  });

  if (user == undefined) {
    return response.status(402).json({
      message: "Usuário não encontrado."
    });
  }

  const passwordMatched = await (0, _bcryptjs.compare)(password, user.senha);

  if (!passwordMatched) {
    return response.status(402).json({
      message: "Usuário não encontrado."
    });
  }

  const {
    secret,
    expiresIn
  } = _auth.default.jwt; // lshflshfksksjfhksdhfskjhlskjfhslakjh

  const token = (0, _jsonwebtoken.sign)({}, secret, {
    subject: user?.id.toString(),
    expiresIn
  });
  const result = {
    user: {
      id: user.id,
      nome: user.nome,
      email: user.email
    },
    token: token
  };
  return response.json(result);
});
var _default = authenticateRouter;
exports.default = _default;