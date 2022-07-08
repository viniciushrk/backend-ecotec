"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Users = _interopRequireDefault(require("../entity/Users"));

var _ItensReciclaveis = _interopRequireDefault(require("../entity/ItensReciclaveis"));

var _typeorm = require("typeorm");

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class getUserServiceWithItens {
  static async execute(id) {
    const UserRepo = (0, _typeorm.getMongoRepository)(_Users.default);
    const ItensReciclaveisRepo = (0, _typeorm.getMongoRepository)(_ItensReciclaveis.default);
    const user = await UserRepo.findOne({
      _id: new _mongodb.ObjectID(id)
    });
    let itens = await ItensReciclaveisRepo.find({
      where: {
        user_id: id
      }
    });
    const result = {
      user: user,
      itens: itens
    };
    return result;
  }

}

exports.default = getUserServiceWithItens;