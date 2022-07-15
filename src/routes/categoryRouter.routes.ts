import { Router, Request, Response } from 'express';
import upload from '../config/storage';
import categoryController from '../controller/categoryController';
import { getMongoRepository, createConnection } from 'typeorm';
import Categorias from '../entity/Categorias';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const categoryRouter = Router();

categoryRouter.use(ensureAuthenticated);

categoryRouter.get('/', categoryController.get);

categoryRouter.post('/', upload.single("imagem"), categoryController.store);

categoryRouter.put('/update', categoryController.update);

export default categoryRouter;