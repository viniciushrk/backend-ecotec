import {Router, Request, Response} from 'express';
import { getMongoRepository } from 'typeorm';
import ItensReciclaveis from '../src/entity/ItensReciclaveis';
import multer from "multer";
import fs from 'fs';
import * as path from 'path';
import Anexos from 'src/entity/Anexos';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix )
      cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
  })

const itensReciclaveisRouter = Router();
// const upload = multer({dest:'uploads/'});
const upload = multer({storage});

itensReciclaveisRouter.use(ensureAuthenticated);

itensReciclaveisRouter.get('/',async (request: Request, response: Response)=>{
    const itensRepo = getMongoRepository(ItensReciclaveis);
    const itens  = await itensRepo.find();
  
    return response.json(itens);
})

interface ItensReciclaveisRequest {
    nome: string;
    descricao: string;
    itens: string[];
    categoria_id: string;
    preco: number;
}

itensReciclaveisRouter.post('/', upload.single("imagem"),async (request: Request, response: Response)=>{
    
    const itemReciclavel:ItensReciclaveisRequest = request.body;
    const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);
    const AnexoRepo = getMongoRepository(Anexos);
    const arquivo = request.file;
    const user_id = request.user.id;
    console.log(user_id);
    if(arquivo == undefined){
        return response.status(400).json({message: "Arquivo não encontrado, informe a imagem do item."})
    }
    
    const caminho = `${arquivo.filename}`
    // const caminho = `${arquivo.filename}${path.extname(arquivo.originalname)}`
    const anexoCreate = AnexoRepo.create({tipo:"profile",caminho:caminho})
    await AnexoRepo.save(anexoCreate);

    const ItensReciclaveisCreate = ItensReciclaveisRepo.create(
        {
          nome: itemReciclavel.nome,
          descricao: itemReciclavel.descricao,
          itens: itemReciclavel.itens,
          imagem:anexoCreate.caminho.toString(),
          user_id: user_id,
          categoria_id: itemReciclavel.categoria_id,
          preco: parseFloat(itemReciclavel.preco.toString())
        }
    );

    await  ItensReciclaveisRepo.save(ItensReciclaveisCreate);

    return response.json({message:"Cadastrado",ItensReciclaveisCreate});
})

itensReciclaveisRouter.patch('/:path', async (request: Request, response: Response)=>{
    const paths = request.params;
    const filePath = path.join(__dirname,'..','uploads', paths.path)
    console.log(__dirname);
    const f = fs.createReadStream(filePath)
    f.pipe(response)
})




export default itensReciclaveisRouter;