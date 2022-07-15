import { Router } from 'express';
import upload from '../config/storage';
import userController from '../controller/userController';

const usersRouter = Router();

usersRouter.post('/', userController.create);

usersRouter.get('/', userController.helpPeoples);

usersRouter.get('/:id', userController.profile);

usersRouter.post('/:id', upload.single("imagem"), userController.picture_profile);

export default usersRouter;