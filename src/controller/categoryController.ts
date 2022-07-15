import Categorias from "../entity/Categorias";
import { Request, Response } from "express";
import { getMongoRepository } from "typeorm";
import AppError from "../errors/AppError";
import path from "path";
import getImage from '../config/getImage';

interface ICategoria {
    name: string,
    imagem?: string
}

export default {
    async get(request: Request, response: Response) {
        try {
            const categoriasRepo = getMongoRepository(Categorias);
            const categorias = await categoriasRepo.find();

            return response.json(categorias);
        } catch (e) {
            throw new AppError("Error internal");
        }
    },

    async store(request: Request, response: Response) {
        try {
            let categoria: ICategoria = request.body;
            const categoriasRepo = getMongoRepository(Categorias);

            const arquivo = request.file;

            if (arquivo == undefined) {
                return response.status(400).json({ message: "Arquivo não encontrado, informe a imagem do item." })
            }

            const caminho = `${arquivo.filename}${path.extname(arquivo.originalname)}`

            categoria.imagem = getImage(caminho);

            const categoriaCreate = categoriasRepo.create(categoria)
            await categoriasRepo.save(categoriaCreate);

            return response.status(201).json({ message: "Criado com sucesso." });
        } catch (e) {
            throw new AppError("Error internal");
        }
    },

    async update(req: Request, res: Response) {
        try {
            const { id, nome } = req.body;

            const categoriasRepo = getMongoRepository(Categorias);
            await categoriasRepo.update(id, { name: nome });

            return res.json({ message: "Atualizado com sucesso." })
        } catch (e) {
            throw new AppError("Error internal");
        }
    }
}