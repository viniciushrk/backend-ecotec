import {Router, Request, Response} from 'express';
import {getMongoRepository} from 'typeorm';
import { compare } from 'bcryptjs';
import Users from 'src/entity/Users';

import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

const authenticateRouter = Router();

authenticateRouter.post('/', async (request: Request, response: Response)=>{
    
    const { email, senha} = request.body;
    
    if (!email || !senha) {
        return response.status(400).json({message: "Informe o email e a senha."});	
    }

    const UsersRepo = getMongoRepository(Users);

    const user = await UsersRepo.findOne({
        where:{email: email}
    })
   
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

    const result = {
        user: {
            id: user.id,
            nome: user.nome,
            email: user.email,
        },
        token: token
    };

    return response.json(result);
});

export default authenticateRouter;