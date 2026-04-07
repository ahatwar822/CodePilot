import express from 'express'
import { createFileController, deleteFileController, readFileController, updateFileController } from '../../controllers/fileControllers/fileController.js';

const fileRouter = express.Router();

fileRouter.post('/create', createFileController);
fileRouter.get('/get',readFileController);
fileRouter.delete('/delete',deleteFileController);
fileRouter.put('/update', updateFileController);

export default fileRouter;