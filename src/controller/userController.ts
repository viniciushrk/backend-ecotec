import Anexos from "../entity/Anexos";
import Users from "../entity/Users";
import { Request, Response, request } from "express";
import { getMongoRepository } from "typeorm";
import createUserService from "../services/createUserServicec";
import getUserServiceWithItens from "../services/getUserServiceWithItens";
import AppError from "../errors/AppError";

export default {
    async create(request: Request, response: Response) {
        try {
            const { nome, email, senha, telefone, latitude, longitude } = request.body;

            await createUserService.execute({
                nome: nome,
                email: email,
                senha: senha,
                telefone: telefone,
                latitude: latitude,
                longitude: longitude
            });

            return response.json({ message: "Usuário criado com sucesso." });
        } catch (e) {
            throw new AppError("Error internal");
        }
    },

    async profile(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const result = await getUserServiceWithItens.execute(id);

            return response.json(result);
        } catch (e) {
            throw new AppError("Error internal");
        }
    },

    async picture_profile(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const UserRepo = getMongoRepository(Users);
            const AnexoRepo = getMongoRepository(Anexos);
            const arquivo = request.file;

            if (arquivo == undefined) {
                return response.status(400).json({ message: "Arquivo não encontrado, informe a imagem do item." })
            }

            const caminho = `${arquivo.filename}`
            const anexoCreate = AnexoRepo.create({ tipo: "profile", caminho: caminho })
            await AnexoRepo.save(anexoCreate);

            await UserRepo.update(id, { foto_user: anexoCreate.caminho.toString() })
            return response.status(201).json({ message: "Imagem cadastrada" })
        } catch (e) {
            throw new AppError("Error internal");
        }
    },

    async helpPeoples(request: Request, response: Response) {
        try {
            const UserRepo = getMongoRepository(Users);
            const users = await UserRepo.find();
            return response.status(200).json(users);
        } catch (e) {
            throw new AppError("Error internal");
        }
    }
}