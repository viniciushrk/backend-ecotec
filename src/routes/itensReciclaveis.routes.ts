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
    item.preco_format = item.preco.toLocaleString('pt-BR', formatmoney);
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
  const paths = request.params;
  const filePath = path.join(__dirname, '..', '..', 'uploads', paths.path)
  console.log(__dirname);
  const f = fs.createReadStream(filePath, { encoding: 'base64' })
  f.pipe(response)
})

itensReciclaveisRouter.use(ensureAuthenticated);
itensReciclaveisRouter.post('/', upload.single("imagem"), async (request: Request, response: Response) => {
  console.log(request.body);
  const itemReciclavel: ItensReciclaveisRequest = request.body;
  const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);
  const AnexoRepo = getMongoRepository(Anexos);
  const arquivo = request.file;
  const user_id = request.user.id;
  console.log(user_id);
  if (arquivo == undefined) {
    return response.status(400).json({ message: "Arquivo não encontrado, informe a imagem do item." })
  }

  const caminho = `${arquivo.filename}`
  // const caminho = `${arquivo.filename}${path.extname(arquivo.originalname)}`
  const anexoCreate = AnexoRepo.create({ tipo: "profile", caminho: caminho })
  await AnexoRepo.save(anexoCreate);

  const ItensReciclaveisCreate = ItensReciclaveisRepo.create(
    {
      nome: itemReciclavel.nome,
      descricao: itemReciclavel.descricao,
      itens: JSON.parse(itemReciclavel.itens),
      imagem: anexoCreate.caminho.toString(),
      user_id: user_id,
      categoria_id: itemReciclavel.categoria_id,
      preco: parseFloat(itemReciclavel.preco.toString())
    }
  );

  await ItensReciclaveisRepo.save(ItensReciclaveisCreate);

  return response.json({ message: "Cadastrado", ItensReciclaveisCreate });
})




export default itensReciclaveisRouter;