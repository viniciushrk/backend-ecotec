import { Router, Request, Response } from 'express';
import { getMongoRepository, createConnection } from 'typeorm';
import Categorias from '../entity/Categorias';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const categoryRouter = Router();

categoryRouter.use(ensureAuthenticated);

categoryRouter.get('/', async (request: Request, response: Response) => {
    const categoriasRepo = getMongoRepository(Categorias);
    const categorias = await categoriasRepo.find();
    return response.json(categorias);
})

interface ICategoria {
    name: string
}

categoryRouter.post('/', async (req: Request, res: Response) => {
    const categoria: ICategoria = req.body;
    const categoriasRepo = getMongoRepository(Categorias);

    const categoriaCreate = categoriasRepo.create(categoria)
    await categoriasRepo.save(categoriaCreate);

    return res.status(202).json({ message: "Criado com sucesso." });
});

categoryRouter.put('/update', async (req: Request, res: Response) => {
    const { id, nome } = req.body;

    const categoriasRepo = getMongoRepository(Categorias);
    const categoria = await categoriasRepo.update(id, { name: nome });

    return res.json({ message: "Atualizado com sucesso." })
})

export default categoryRouter;