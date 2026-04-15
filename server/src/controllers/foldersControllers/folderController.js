import { badRequest, success } from '../../utils/response.utils.js';
import Folder from '../../models/folder.model.js';


const createFolderController = async (req, res, next) => {
    try {
        const { name, parentFolder } = req.body;

        if (!name) return badRequest(res, "Folder name required");

        const folder = await Folder.create({
            name,
            parentFolder: parentFolder || null,
            user: req.userId,
        });

        return success(res, folder, "Folder created");
    } catch (err) {
        next(err);
    }
}

const getAllFoldersController = async (req, res, next) => {
    try {
        const folders = await Folder.find({ user: req.userId });

        return success(res, folders, "Folders fetched");
    } catch (err) {
        next(err);
    }
}

const openFolderController = async (req, res, next) => {
    try {
        const { folderId } = req.params;

        const folder = await Folder.findOne({
            _id: folderId,
            user: req.userId,
        });

        if (!folder) return customError(res, 404, "Folder not found");

        return success(res, folder, "Folder opened");
    } catch (err) {
        next(err);
    }
}

const renameFolderController = async (req, res, next) => {
    try {
        const { folderId } = req.params;
        const { newName } = req.body;

        if (!newName) return badRequest(res, "Folder name required");

        await Folder.findOneAndUpdate({
            _id: folderId,
            user: req.userId,
        }, {
            name: newName,
        });

        return success(res, {}, "Folder renamed");
    } catch (err) {
        next(err);
    }
}
const deleteFolderController = async (req, res, next) => {
    try {
        const { folderId } = req.params;

        const folder = await Folder.findOneAndDelete({
            _id: folderId,
            user: req.userId,
        });

        if (!folder) return customError(res, "Folder not found");

        return success(res, {}, "Folder deleted");
    } catch (err) {
        next(err);
    }
}

export {
    createFolderController,
    openFolderController,
    getAllFoldersController,
    renameFolderController,
    deleteFolderController
}