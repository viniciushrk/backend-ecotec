import {Router} from 'express';
import {getMongoRepository} from 'typeorm';
import Categorias from '../src/entity/Categorias';


// createConnection("mongo");


const categoryRouter = Router();

categoryRouter.post('/', async (req, res)=>{
    // const manager = getMongoManager();
    const categoriasRepo = getMongoRepository(Categorias,"mongo");
    const resutl = categoriasRepo.create({name:"olá"})
    await categoriasRepo.save(resutl);
    const result = await categoriasRepo.find();

    return res.json(result);
})

export default categoryRouter;