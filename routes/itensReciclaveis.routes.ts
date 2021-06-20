import {Router} from 'express';
import {getMongoRepository} from 'typeorm';
import ItensReciclaveis from '../src/entity/ItensReciclaveis';
import multer from "multer";
import fs from 'fs';
import * as path from 'path';
import Anexos from 'src/entity/Anexos';


const itensReciclaveisRouter = Router();
const upload = multer({dest:'uploads/'});



itensReciclaveisRouter.post('/', upload.single("imagem"),async (request, response)=>{
    
    const {nome, descricao,imagem} = request.body;
    const ItensReciclaveisRepo = getMongoRepository(ItensReciclaveis);
    const AnexoRepo = getMongoRepository(Anexos);

    const anexoCreate = AnexoRepo.create({tipo:"profile",caminho:request.file.filename})
    await AnexoRepo.save(anexoCreate);

    const ItensReciclaveisCreate = ItensReciclaveisRepo.create(
        {nome: nome,descricao:descricao,itens:["2 copos","3 garrafas pets"],imagem:anexoCreate.id.toString()}
    );

    await  ItensReciclaveisRepo.save(ItensReciclaveisCreate);

    return response.json({message:"Cadastrado",ItensReciclaveisCreate});
})

itensReciclaveisRouter.get('/:path',async (request, response)=>{
    const paths = request.params;
    const filePath = path.join(__dirname,'..','uploads', paths.path)
    const file =  await fs.readFile(filePath,'utf-8',(() => null));
    const f = fs.createReadStream(filePath)
    console.log(file)
    f.pipe(response)
})




export default itensReciclaveisRouter;