import {Router} from 'express';
import categoryRouter from './categoryRouter.routes';
const routes = Router();

routes.use('/categorias', categoryRouter)

export default routes;