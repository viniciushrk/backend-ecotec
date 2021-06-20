import {Router} from 'express';
import categoryRouter from './categoryRouter.routes';
import itensReciclaveis from './itensReciclaveis.routes';
const routes = Router();

routes.get('/', (req,res)=>{
    return res.send('Tá funfando');
})
routes.use('/categorias', categoryRouter)
routes.use('/itensReciclaveis', itensReciclaveis)


export default routes;