import { Request, Response } from "express";







import { getMongoRepository, Like } from "typeorm";
import AppError from "../errors/AppError";

import getImage from '../config/getImage';
import ItensReciclaveis from '../entity/ItensReciclaveis';
import User from "../entity/Users";
import { ObjectID } from 'mongodb';
import Anexos from '../entity/Anexos';
import fs from 'fs';
import * as path from 'path';

interface ItensReciclaveisRequest {
    nome: string;
    descricao: string;
    itens: string[];
    categoria_id: string;
    preco: number | string;
}

const formatmoney = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

export default {

    async all(request: Request, response: Response) {
        const { filter } = request.query;

        if (filter != undefined) {
            const itensRepo = getMongoRepository(ItensReciclaveis);

            const itens = await itensRepo.find({
                where: {
                    nome: { $eq: filter }
                    // { user: Like(`${filter}`) }
                }
            });

            itens.map((item) => {
                if (item != undefined) {
                    item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
                }
            });

            return response.json(itens);
        }

        const itensRepo = getMongoRepository(ItensReciclaveis);

        const itens = await itensRepo.find();

        itens.map(async x => {
            x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
        });

        return response.json(itens);
    },

    async get(request: Request, response: Response) {
        try {
            const params = request.params;

            const itensRepo = getMongoRepository(ItensReciclaveis);
            const UserRepo = getMongoRepository(User);

            const item = await itensRepo.findOne({ _id: new ObjectID(params.id) });

            if (item != undefined) {
                item.imagem = '';
                item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
                item.user = await UserRepo.findOne({ _id: new ObjectID(item.user_id) });
            }

            return response.json(item);
        } catch (e) {
            throw new AppError("Error internal");
        }
    },

    async getByDescriptionOrUser(filter: string) {
        try {
            const itensRepo = getMongoRepository(ItensReciclaveis);

            const itens = await itensRepo.find({
                where: [
                    { nome: Like(`${filter}`) },
                    { user: Like(`${filter}`) }
                ]
            });

            itens.map((item) => {
                if (item != undefined) {
                    item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
                }
            });

            return itens;
        } catch (e) {
            console.error(e);
            throw new AppError("Error internal");
        }
    },

    async store(request: Request, response: Response) {
        try {
            const itemReciclavel = request.body;
            const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);
            const UserRepo = getMongoRepository(User);

            const user_id = request.user.id;

            const user = await UserRepo.findOne({ _id: new ObjectID(user_id) });
            console.log("user: ", user)
            const data = {
                nome: itemReciclavel.nome,
                descricao: itemReciclavel.descricao,
                itens: itemReciclavel.itens,
                imagem: '',
                user_id: user_id,
                user: `${user?.nome} - ${user?.telefone}`,
                categoria_id: itemReciclavel.categoria_id,
                preco: parseFloat(itemReciclavel.preco)
            };

            const ItensReciclaveisCreate = ItensReciclaveisRepo.create(data);

            await ItensReciclaveisRepo.save(ItensReciclaveisCreate);

            return response.json({ message: "Cadastrado", ItensReciclaveisCreate });
        } catch (e) {
            return response.status(500).json(e);
        }
    },

    async uploadImage(request: Request, response: Response) {
        const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);
        const AnexoRepo = getMongoRepository(Anexos);
        const arquivo = request.file;

        if (arquivo == undefined) {
            return response.status(400).json({ message: "Arquivo não encontrado, informe a imagem do item." })
        }

        const caminho = `${arquivo.filename}`
        const anexoCreate = AnexoRepo.create({ tipo: "itens", caminho: caminho })
        await AnexoRepo.save(anexoCreate);

        const id = request.params.id;

        await ItensReciclaveisRepo.update(id, { imagem: getImage(anexoCreate.caminho) })
        return response.status(201).json({ message: "Imagem cadastrada" })
    },

    async patchImage(request: Request, response: Response) {
        try {
            const paths = request.params;
            const filePath = path.join(__dirname, '..', '..', 'uploads', paths.path)
            console.log(__dirname);
            const f = fs.readFileSync(filePath, { encoding: 'base64' })
            return response.status(200).json({ imagem: `data:image/png;base64, ${f}` })
        } catch (e) {
            return response.status(500).json({ mensage: `Error internal ${e}` })
        }
    },

    async delete(request: Request, response: Response) {
        try {
            const { id } = request.params;

            const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);

            await ItensReciclaveisRepo.delete(id);

            return response.json({ message: "Deletado com sucesso" });
        } catch (e) {
            throw new AppError("Error internal");
        }
    }
}