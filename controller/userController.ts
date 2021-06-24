import {Request, Response, request } from "express";
import createUserService from "services/createUserServicec";


export default {
     async create(request:Request, response:Response){
        const { nome, email, senha} = request.body;
        
        await createUserService.execute({nome:nome, email:email, senha:senha});
        
        return response.json({message: "Usuário criado com sucesso."});
    }
}