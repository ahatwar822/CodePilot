import express from 'express'
import { createFolderController, deleteFolderController, getAllFoldersController, openFolderController, renameFolderController } from '../../controllers/foldersControllers/folderController.js';

const folderRouter = express.Router();

folderRouter.post('/', createFolderController);
folderRouter.get('/', getAllFoldersController);
folderRouter.get('/:folderId', openFolderController);
folderRouter.put('/:folderId', renameFolderController);
folderRouter.delete('/:folderId', deleteFolderController);


export default folderRouter;