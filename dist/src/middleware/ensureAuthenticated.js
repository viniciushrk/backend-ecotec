"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
const AppError_1 = __importDefault(require("../errors/AppError"));
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    console.log('auth', authHeader);
    if (!authHeader) {
        throw new AppError_1.default('JWT token is missing', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        const { sub } = decoded; // Forçando que o decode é do tipo TokenPayload
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default('Invalid JWT', 401);
    }
}
exports.default = ensureAuthenticated;
