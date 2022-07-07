"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
const Users_1 = __importDefault(require("../entity/Users"));
const typeorm_1 = require("typeorm");
class createUserService {
    static async execute(user) {
        const { nome, email, senha, telefone } = user;
        if (nome === undefined && senha === undefined && email === undefined && telefone === undefined) {
            return ({ message: "Insira todos os dados necessários." });
        }
        const UsersRepo = (0, typeorm_1.getMongoRepository)(Users_1.default);
        const passwordHashed = (0, bcryptjs_1.hashSync)(senha, 8);
        const userCreate = UsersRepo.create({ nome: nome, email: email, telefone: telefone, senha: passwordHashed });
        await UsersRepo.save(userCreate);
        return true;
    }
}
exports.default = createUserService;
