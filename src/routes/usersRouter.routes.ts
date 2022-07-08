import { Router } from 'express';
import userController from '../controller/userController';

const usersRouter = Router();


usersRouter.post('/', userController.create);


usersRouter.get('/:id', userController.profile);




export default usersRouter;