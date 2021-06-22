import {Router} from 'express';
import {getMongoRepository} from 'typeorm';
import ItensReciclaveis from '../src/entity/ItensReciclaveis';
import multer from "multer";
import fs from 'fs';
import * as path from 'path';
import Anexos from 'src/entity/Anexos';
import { hashSync, compareSync } from 'bcryptjs';
import Users from 'src/entity/Users';

const usersRouter = Router();


usersRouter.post('/', async (request, response)=>{
    
    const { nome, email, senha} = request.body;

    if(nome === undefined && senha === undefined && email === undefined){
        return response.status(402).json({message: "Insira todos os dados necessários."});
    }

    const UsersRepo = getMongoRepository(Users);
    
    const passwordHashed = hashSync(senha,8)

    const userCreate = UsersRepo.create({nome: nome, email: email,senha: passwordHashed});

    await UsersRepo.save(userCreate);

    return response.json({message: "Usuário criado com sucesso."});
});




export default usersRouter;