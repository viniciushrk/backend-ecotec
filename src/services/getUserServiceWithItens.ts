import { hashSync } from "bcryptjs";
import Users from "../entity/Users";
import ItensReciclaveis from "../entity/ItensReciclaveis";
import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";

interface Iuser {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
}

interface userWithItensReciclaveis {
    user: Users | undefined;
    itens: ItensReciclaveis[];
}

export default class getUserServiceWithItens {

    public static async execute(id: string): Promise<userWithItensReciclaveis> {

        const UserRepo = getMongoRepository(Users);
        const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);
        const user: Users | undefined = await UserRepo.findOne({ _id: new ObjectID(id) });
        let itens = await ItensReciclaveisRepo.find({ where: { user_id: id } });


        const result: userWithItensReciclaveis = {
            user: user,
            itens: itens
        }

        return result;
    }
}