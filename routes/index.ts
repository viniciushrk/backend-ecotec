import {Router} from 'express';
import categoryRouter from './categoryRouter.routes';
const routes = Router();

routes.get('/', (req,res)=>{
    return res.send('Tá funfando');
})
routes.use('/categorias', categoryRouter)


export default routes;