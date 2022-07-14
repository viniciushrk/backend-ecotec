import Anexos from "src/entity/Anexos";
import Users from "src/entity/Users";
import { Request, Response, request } from "express";
import { getMongoRepository } from "typeorm";
import createUserService from "../services/createUserServicec";
import getUserServiceWithItens from "../services/getUserServiceWithItens";

export default {
    async create(request: Request, response: Response) {
        const { nome, email, senha, telefone } = request.body;

        await createUserService.execute({ nome: nome, email: email, senha: senha, telefone: telefone });

        return response.json({ message: "Usuário criado com sucesso." });
    },

    async profile(request: Request, response: Response) {
        const { id } = request.params;

        const result = await getUserServiceWithItens.execute(id);

        return response.json(result);
    },

    async picture_profile(request: Request, response: Response) {
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
    }
}