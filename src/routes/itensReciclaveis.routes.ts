import { Router, Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import ItensReciclaveis from '../entity/ItensReciclaveis';
import multer from "multer";
import fs from 'fs';
import * as path from 'path';
import Anexos from '../entity/Anexos';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import User from "../entity/Users";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
  }
})

const itensReciclaveisRouter = Router();
const upload = multer({ storage });
const formatmoney = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' };

itensReciclaveisRouter.get('/', async (request: Request, response: Response) => {
  const itensRepo = getMongoRepository(ItensReciclaveis);
  const UserRepo = getMongoRepository(User);

  const itens = await itensRepo.find();

  itens.map(async (x) => {
    x.user = await UserRepo.findOne({ _id: new ObjectID(x.user_id) });
  })

  itens.map(x => {
    x.preco_format = x.preco.toLocaleString('pt-BR', formatmoney);
    x.imagem = `data:image/png;base64, ${getImage(x.imagem)}`;
  })
  return response.json(itens);
})

itensReciclaveisRouter.get('/:id', async (request: Request, response: Response) => {
  const params = request.params;

  const itensRepo = getMongoRepository(ItensReciclaveis);
  const UserRepo = getMongoRepository(User);

  const item = await itensRepo.findOne({ _id: new ObjectID(params.id) });

  if (item != undefined) {
    if (item.preco != null){
      item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
    }
    item.user = await UserRepo.findOne({ _id: new ObjectID(item.user_id) });
    item.imagem = `data:image/png;base64, ${getImage(item.imagem)}`;
  }

  return response.json(item);
})

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

interface ItensReciclaveisRequest {
  nome: string;
  descricao: string;
  itens: string[];
  categoria_id: string;
  preco: number;
}

itensReciclaveisRouter.patch('/:path', async (request: Request, response: Response) => {
  try {
    const paths = request.params;
    const filePath = path.join(__dirname, '..', '..', 'uploads', paths.path)
    console.log(__dirname);
    const f = fs.readFileSync(filePath, { encoding: 'base64' })
    return response.status(200).json({ imagem: `data:image/png;base64, ${f}` })
  } catch (e) {
    return response.status(500).json({ mensage: `Error internal ${e}` })
  }
})

itensReciclaveisRouter.use(ensureAuthenticated);

itensReciclaveisRouter.post('/:id', upload.single("imagem"), async (request: Request, response: Response) => {
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

  await ItensReciclaveisRepo.update(id, { imagem: anexoCreate.caminho.toString() })
  return response.status(201).json({ message: "Imagem cadastrada" })
});

itensReciclaveisRouter.post('/', async (request: Request, response: Response) => {
  try {
    const itemReciclavel: ItensReciclaveisRequest = request.body;
    const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);

    const user_id = request.user.id;

    const ItensReciclaveisCreate = ItensReciclaveisRepo.create(
      {
        nome: itemReciclavel.nome,
        descricao: itemReciclavel.descricao,
        itens: itemReciclavel.itens,
        imagem: '',
        user_id: user_id,
        categoria_id: itemReciclavel.categoria_id,
        preco: itemReciclavel.preco
      }
    );

    await ItensReciclaveisRepo.save(ItensReciclaveisCreate);

    return response.json({ message: "Cadastrado", ItensReciclaveisCreate });
  } catch (e) {
    return response.status(500).json(e);
  }
});


itensReciclaveisRouter.delete('/:id', async (request: Request, response: Response) => {
  const { id } = request.params;

  const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);

  await ItensReciclaveisRepo.delete(id);

  return response.json({ message: "Deletado com ssucesso" });
});




export default itensReciclaveisRouter;