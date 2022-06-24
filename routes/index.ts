import {Router} from 'express';
import authenticateRouter from './authenticate.routes';
import categoryRouter from './categoryRouter.routes';
import itensReciclaveis from './itensReciclaveis.routes';
import usersRouter from './usersRouter.routes';


const routes = Router();

routes.get('/', (req: Request,res: Response) => {
    return res.json({message:'Tá funfando'});
})

routes.use('/categorias', categoryRouter)
routes.use('/itensReciclaveis', itensReciclaveis)
routes.use('/user', usersRouter)
routes.use('/login', authenticateRouter)



export default routes;