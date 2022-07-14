import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import userController from '../controller/userController';

const usersRouter = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage });

usersRouter.post('/', userController.create);

usersRouter.get('/', userController.helpPeoples);

usersRouter.get('/:id', userController.profile);

usersRouter.post('/:id', upload.single("imagem"), userController.picture_profile);




export default usersRouter;