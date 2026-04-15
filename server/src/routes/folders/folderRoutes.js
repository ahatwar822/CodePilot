import express from 'express'
import { createFolderController, deleteFolderController, getAllFoldersController, openFolderController, renameFolderController } from '../../controllers/foldersControllers/folderController.js';

const folderRouter = express.Router();

folderRouter.post('/create', createFolderController);
folderRouter.get('/open/:folderName', openFolderController);
folderRouter.get('/', getAllFoldersController);
folderRouter.put('/rename', renameFolderController);
folderRouter.delete('/delete/:folderId', deleteFolderController);


export default folderRouter;