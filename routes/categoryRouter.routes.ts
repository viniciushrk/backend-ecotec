import {Router} from 'express';

const categoryRouter = Router();

categoryRouter.post('/',(req, res)=>{

    return res.json({message:"Cadastrado com sucesso."});
})

export default categoryRouter;