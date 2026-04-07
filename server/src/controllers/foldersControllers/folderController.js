import fs from 'fs'
import path from 'path';
import { customError, serverError, success } from '../../utils/response.utils.js';
// export const createFolderController = async(req, res) => {
//     try {
//         const { folderName } = req.body;
//         await fs.promises.mkdir(folderName);
//         res.status(201).json({ message: 'Folder created successfully' });
//     } catch (error) {
//         console.log("error in folder controller", error);
//     }
// }

const createFolderController = async (req, res) => {
    try {
        const { folderName } = req.body;
        const currentDir = path.resolve() + '/assets';
        const folderPath = path.join(currentDir, folderName);

        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating folder:', err);
                return res.status(500).json({ message: 'Error creating folder' });
            }
            return success(res, { message: 'Folder created successfully' });
        });
    } catch (error) {
        return serverError(res, 'Error creating folder', { error: error.message });
    }
}

const openFolderController = async (req, res) => {
    try {
        const { folderName } = req.query;
        if (!folderName) {
            return customError(res, {}, 400, "Folder name is required");
        }
        const currentDir = path.resolve() + '/assets';
        const folderPath = path.join(currentDir, folderName);

        if (!fs.existsSync(folderPath)) {
            return customError(res, {}, 404, "Folder not found");
        }
        fs.readdir(folderPath, (err, files) => {
            if(err){
                return customError(res, {}, 500, "Error opening folder");
            }
            if (files.length === 0) {
                return success(res, { message: 'Folder is empty' });
            } else {
                return success(res, { files });
            }
        })
        
    } catch (error) {
        return serverError(res, 'Error opening folder', { error: error.message });
    }
}

const renameFolderController = async (req, res ) => {
    try {
        
        const { oldFolderName, newFolderName } = req.body;
        if (!oldFolderName || !newFolderName) {
            return customError(res, {}, 400, "All fields are required");
        }
        const currentDir = path.resolve() + '/assets';
        const oldFolderPath = path.join(currentDir, oldFolderName);
        const newFolderPath = path.join(currentDir, newFolderName);

        if (!fs.existsSync(oldFolderPath)) {
            return customError(res, {}, 404, "Folder not found");
        }
        fs.rename(oldFolderPath, newFolderPath, (err) => {
            if(err){
                return customError(res, {}, 500, "Error renaming folder");
            }
            return success(res, { message: 'Folder renamed successfully' });
        })

    } catch (error) {
        return serverError(res, 'Internal SError while renaming folder', { error: error.message });
    }
}

const deleteFolderController = async (req, res) => {
    try {
        const { folderName } = req.body;
        if (!folderName) {
            return customError(res, {}, 400, "Folder name is required");
        }
        const currentDir = path.resolve() + '/assets';
        const folderPath = path.join(currentDir, folderName);
        if (!fs.existsSync(folderPath)) {
            return customError(res, {}, 404, "Folder not found");
        }
        fs.rmdir(folderPath, { recursive: true }, (err) => {
            if(err){
                return customError(res, {}, 500, "Error deleting folder");
            }
            return success(res, { message: 'Folder deleted successfully' });
        })
        
    } catch (error) {
        return serverError(res, 'Internal Server Error while deleting folder', { error: error.message });
    }
}

export {
    createFolderController,
    openFolderController,
    renameFolderController,
    deleteFolderController
}