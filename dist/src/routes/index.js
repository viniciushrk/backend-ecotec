"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");
const authenticate_routes_1 = __importDefault(require("./authenticate.routes"));
const categoryRouter_routes_1 = __importDefault(require("./categoryRouter.routes"));
const itensReciclaveis_routes_1 = __importDefault(require("./itensReciclaveis.routes"));
const usersRouter_routes_1 = __importDefault(require("./usersRouter.routes"));
const routes = (0, express_1.Router)();

routes.get('/', (req, res) => {
    return res.json({ message: 'Tá funfando' });
});

routes.use('/categorias', categoryRouter_routes_1.default);
routes.use('/itensReciclaveis', itensReciclaveis_routes_1.default);
routes.use('/user', usersRouter_routes_1.default);
routes.use('/login', authenticate_routes_1.default);
exports.default = routes;
