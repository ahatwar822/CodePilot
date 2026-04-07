import express from 'express'
import { createFolderController, deleteFolderController, openFolderController, renameFolderController } from '../../controllers/foldersControllers/folderController.js';

const folderRouter = express.Router();

folderRouter.post('/create', createFolderController);
folderRouter.get('/open', openFolderController);
folderRouter.put('/rename', renameFolderController);
folderRouter.delete('/delete', deleteFolderController);


export default folderRouter;