import { Request, Response, request } from "express";
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
    }
}