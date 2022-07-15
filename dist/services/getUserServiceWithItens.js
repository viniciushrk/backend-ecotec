"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Users = _interopRequireDefault(require("../entity/Users"));

var _ItensReciclaveis = _interopRequireDefault(require("../entity/ItensReciclaveis"));

var _typeorm = require("typeorm");

var _mongodb = require("mongodb");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getImage(caminho) {
  try {
    const filePath = _path.default.join(__dirname, '..', '..', 'uploads', caminho);

    console.log(__dirname);

    const f = _fs.default.readFileSync(filePath, {
      encoding: 'base64'
    });

    return f ?? null;
  } catch {
    return null;
  }
}

const formatmoney = {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'BRL'
};

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
    itens.map(x => {
      x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
    });
    return result;
  }

}

exports.default = getUserServiceWithItens;