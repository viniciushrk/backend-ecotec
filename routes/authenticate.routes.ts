import {Router} from 'express';
import {getMongoRepository} from 'typeorm';
import ItensReciclaveis from '../src/entity/ItensReciclaveis';
import multer from "multer";
import fs from 'fs';
import * as path from 'path';
import Anexos from 'src/entity/Anexos';
import { hashSync, compareSync,compare } from 'bcryptjs';
import Users from 'src/entity/Users';

import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

const authenticateRouter = Router();


// usersRouter.post('/', async (request, response)=>{
    
//     const { nome, email, senha} = request.body;

//     if(nome === undefined && senha === undefined && email === undefined){
//         return response.status(402).json({message: "Insira todos os dados necessários."});
//     }

//     const UsersRepo = getMongoRepository(Users);
    
//     const passwordHashed = hashSync(senha,8)

//     const userCreate = UsersRepo.create({nome: nome, email: email,senha: passwordHashed});

//     await UsersRepo.save(userCreate);

//     return response.json({message: "Usuário criado com sucesso."});
// });

authenticateRouter.post('/', async (request, response)=>{
    
    const { nome, email, senha} = request.body;
    const UsersRepo = getMongoRepository(Users);

    const user = await UsersRepo.findOne({where:{email: email}})
   
    if(user == undefined){
        return response.status(402).json({message: "Usuário não encontrado."});
    }

    const passwordMatched = await compare(
            senha,
            user.senha,
        );

    if(!passwordMatched) {
        return response.status(402).json({message: "Usuário não encontrado."});
    }

    const { secret, expiresIn } = authConfig.jwt;

        // lshflshfksksjfhksdhfskjhlskjfhslakjh
    const token = sign({}, secret, {
        subject: user?.id.toString(),
        expiresIn,
    });


    return response.json([user,token]);
});






export default authenticateRouter;