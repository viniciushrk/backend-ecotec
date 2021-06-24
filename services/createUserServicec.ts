import { hashSync } from "bcryptjs";
import Users from "src/entity/Users";
import { getMongoRepository } from "typeorm";

interface Iuser {
    nome:string;
    email:string;
    senha:string;
}

export default class createUserService{

    public static async execute(user:Iuser){

        const { nome, email, senha} = user;
   
        if(nome === undefined && senha === undefined && email === undefined){
            return ({message: "Insira todos os dados necessários."});
        }

        const UsersRepo = getMongoRepository(Users);
        
        const passwordHashed = hashSync(senha,8)

        const userCreate = UsersRepo.create({nome: nome, email: email,senha: passwordHashed});

        await UsersRepo.save(userCreate);

        return true;
    }
}