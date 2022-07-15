import { hashSync } from "bcryptjs";
import Users from "../entity/Users";
import ItensReciclaveis from "../entity/ItensReciclaveis";
import { getMongoRepository } from "typeorm";
import { ObjectID } from "mongodb";
import fs from 'fs';
import path from "path";

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
function getImage(caminho: string): string | null {
    try {
        const filePath = path.join(__dirname, '..', '..', 'uploads', caminho)
        console.log(__dirname);
        const f = fs.readFileSync(filePath, { encoding: 'base64' });
        return f ?? null;
    } catch {
        return null
    }
}
const formatmoney = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

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

        itens.map(x => {
            x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
        })

        return result;
    }


}