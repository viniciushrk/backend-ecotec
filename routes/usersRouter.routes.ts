import {Router} from 'express';
import {getMongoRepository} from 'typeorm';
import ItensReciclaveis from '../src/entity/ItensReciclaveis';
import multer from "multer";
import fs from 'fs';
import * as path from 'path';
import Anexos from 'src/entity/Anexos';
import { hashSync, compareSync } from 'bcryptjs';
import Users from 'src/entity/Users';
import userController from 'controller/userController';

const usersRouter = Router();


usersRouter.post('/', userController.create);




export default usersRouter;