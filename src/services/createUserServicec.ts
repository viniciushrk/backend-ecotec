import { hashSync } from "bcryptjs";
import Users from "../entity/Users";
import { getMongoRepository } from "typeorm";

interface Iuser {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    latitude: number;
    longitude: number;
}

export default class createUserService {

    public static async execute(user: Iuser) {

        const { nome, email, senha, telefone, longitude, latitude } = user;

        if (nome === undefined && senha === undefined && email === undefined && telefone === undefined) {
            return ({ message: "Insira todos os dados necessários." });
        }

        const UsersRepo = getMongoRepository(Users);

        const passwordHashed = hashSync(senha, 8)

        const userCreate = UsersRepo.create({
            nome: nome,
            email: email,
            telefone: telefone,
            senha: passwordHashed,
            latitude: latitude,
            longitude: longitude
        });

        await UsersRepo.save(userCreate);

        return true;
    }
}