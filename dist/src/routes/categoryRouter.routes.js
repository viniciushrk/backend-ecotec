"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeorm_1 = require("typeorm");
const Categorias_1 = __importDefault(require("../entity/Categorias"));
const ensureAuthenticated_1 = __importDefault(require("../middleware/ensureAuthenticated"));
const categoryRouter = (0, express_1.Router)();
categoryRouter.use(ensureAuthenticated_1.default);
categoryRouter.get('/', async (request, response) => {
    const categoriasRepo = (0, typeorm_1.getMongoRepository)(Categorias_1.default);
    const categorias = await categoriasRepo.find();
    return response.json(categorias);
});
categoryRouter.post('/', async (req, res) => {
    const categoria = req.body;
    const categoriasRepo = (0, typeorm_1.getMongoRepository)(Categorias_1.default);
    const categoriaCreate = categoriasRepo.create(categoria);
    await categoriasRepo.save(categoriaCreate);
    return res.status(202).json({ message: "Criado com sucesso." });
});
categoryRouter.put('/update', async (req, res) => {
    const { id, nome } = req.body;
    const categoriasRepo = (0, typeorm_1.getMongoRepository)(Categorias_1.default);
    const categoria = await categoriasRepo.update(id, { name: nome });
    return res.json({ message: "Atualizado com sucesso." });
});
exports.default = categoryRouter;
