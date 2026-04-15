import File from '../../models/file.model.js'
import { badRequest, customError, deleted,  success, updated } from '../../utils/response.utils.js'


const createFileController = async (req, res, next) => {
    try {
        const { name, folder, language } = req.body;

        if (!name) return badRequest(res, "File name required");

        const file = await File.create({
            name,
            folder: folder || null,
            language,
            user: req.userId,
        });

        return success(res, file, "File created");
    } catch (err) {
        next(err);
    }

}

const readFileController = async (req, res, next) => {
    try {
        const { fileName } = req.params;

        const file = await File.findOne({ name: fileName, user: req.userId });

        if (!file) return customError(res, "File not found");

        return success(res, file, "File read");
    } catch (err) {
        next(err);
    }

}

const getAllFilesController = async (req, res,next) => {
    try {
        const files = await File.find({ user: req.userId });

        return success(res, files, "Files fetched");
    } catch (err) {
        next(err);
    }
}

const updateFileController = async (req, res, next) => {
    try {
        const { fileId, content } = req.body;

        const file = await File.findOneAndUpdate(
            { _id: fileId, user: req.userId },
            { content },
            { new: true }
        );

        return updated(res, file, "File updated");
    } catch (err) {
        next(err);
    }

}

const deleteFileController = async (req, res, next) => {
    try {
        const { fileId } = req.params;

        await File.findOneAndDelete({
            _id: fileId,
            user: req.userId,
        });

        return deleted(res, {}, "File deleted");
    } catch (err) {
        next(err);
    }
}

export {
    createFileController,
    readFileController,
    getAllFilesController,
    updateFileController,
    deleteFileController
}