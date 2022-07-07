"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUserServicec_1 = __importDefault(require("../services/createUserServicec"));
exports.default = {
    async create(request, response) {
        const { nome, email, senha, telefone } = request.body;
        await createUserServicec_1.default.execute({ nome: nome, email: email, senha: senha, telefone: telefone });
        return response.json({ message: "Usuário criado com sucesso." });
    }
};
