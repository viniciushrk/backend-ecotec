"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const bcryptjs_1 = require("bcryptjs");
const Users_1 = __importDefault(require("../entity/Users"));
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const authenticateRouter = (0, express_1.Router)();
authenticateRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    if (!email || !password) {
        return response.status(400).json({ message: "Informe o email e a senha." });
    }
    const UsersRepo = (0, typeorm_1.getMongoRepository)(Users_1.default);
    const user = await UsersRepo.findOne({
        where: { email: email }
    });
    if (user == undefined) {
        return response.status(402).json({ message: "Usuário não encontrado." });
    }
    const passwordMatched = await (0, bcryptjs_1.compare)(password, user.senha);
    if (!passwordMatched) {
        return response.status(402).json({ message: "Usuário não encontrado." });
    }
    const { secret, expiresIn } = auth_1.default.jwt;
    // lshflshfksksjfhksdhfskjhlskjfhslakjh
    const token = (0, jsonwebtoken_1.sign)({}, secret, {
        subject: user?.id.toString(),
        expiresIn,
    });
    const result = {
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
        },
        token: token
    };
    return response.json(result);
});
exports.default = authenticateRouter;
