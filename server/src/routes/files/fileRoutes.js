import express from 'express'
import { createFileController, deleteFileController, getAllFilesController, readFileController, updateFileController } from '../../controllers/fileControllers/fileController.js';

const fileRouter = express.Router();

fileRouter.post('/', createFileController);
fileRouter.get('/',getAllFilesController);
fileRouter.get('/:fileId',readFileController);
fileRouter.put('/:fileId', updateFileController);
fileRouter.delete('/:fileId',deleteFileController);

export default fileRouter;