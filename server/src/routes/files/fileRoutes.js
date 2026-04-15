import express from 'express'
import { createFileController, deleteFileController, getAllFilesController, readFileController, updateFileController } from '../../controllers/fileControllers/fileController.js';

const fileRouter = express.Router();

fileRouter.post('/create', createFileController);
fileRouter.get('/read/:fileName',readFileController);
fileRouter.get('/',getAllFilesController);
fileRouter.put('/update', updateFileController);
fileRouter.delete('/delete/:fileId',deleteFileController);

export default fileRouter;