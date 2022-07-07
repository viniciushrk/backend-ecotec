"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
var _Users = _interopRequireDefault(require("../entity/Users"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class createUserService {
    static async execute(user) {
        const { nome, email, senha, telefone } = user;
        if (nome === undefined && senha === undefined && email === undefined && telefone === undefined) {
            return {
                message: "Insira todos os dados necessários."
            };
        }
        const UsersRepo = (0, _typeorm.getMongoRepository)(_Users.default);
        const passwordHashed = (0, _bcryptjs.hashSync)(senha, 8);
        const userCreate = UsersRepo.create({
            nome: nome,
            email: email,
            telefone: telefone,
            senha: passwordHashed
        });
        await UsersRepo.save(userCreate);
        return true;
    }
}
exports.default = createUserService;
