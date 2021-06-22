import {Router} from 'express';
import categoryRouter from './categoryRouter.routes';
import itensReciclaveis from './itensReciclaveis.routes';
import usersRouter from './usersRouter.routes';


const routes = Router();

routes.get('/', (req,res)=>{
    return res.send('Tá funfando');
})

routes.use('/categorias', categoryRouter)
routes.use('/itensReciclaveis', itensReciclaveis)
routes.use('/user', usersRouter)



export default routes;