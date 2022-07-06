import { hashSync } from "bcryptjs";
import Users from "src/entity/Users";
import { getMongoRepository } from "typeorm";

interface Iuser {
    nome:string;
    email:string;
    senha:string;
    telefone:string;
}

export default class createUserService{

    public static async execute(user:Iuser){

        const { nome, email, senha, telefone} = user;
   
        if(nome === undefined && senha === undefined && email === undefined && telefone === undefined){
            return ({message: "Insira todos os dados necessários."});
        }

        const UsersRepo = getMongoRepository(Users);
        
        const passwordHashed = hashSync(senha,8)

        const userCreate = UsersRepo.create({nome: nome, email: email, telefone: telefone,senha: passwordHashed});

        await UsersRepo.save(userCreate);

        return true;
    }
}