import { Router } from 'express';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import itensReciclaveisController from '../controller/itensReciclaveisController';
import upload from '../config/storage';

const itensReciclaveisRouter = Router();

itensReciclaveisRouter.get('/', itensReciclaveisController.all)

itensReciclaveisRouter.get('/:id', itensReciclaveisController.get)

itensReciclaveisRouter.patch('/:path', itensReciclaveisController.patchImage)

itensReciclaveisRouter.use(ensureAuthenticated);

itensReciclaveisRouter.post('/:id', upload.single("imagem"), itensReciclaveisController.uploadImage);

itensReciclaveisRouter.post('/', itensReciclaveisController.store);

itensReciclaveisRouter.delete('/:id', itensReciclaveisController.delete);

export default itensReciclaveisRouter;