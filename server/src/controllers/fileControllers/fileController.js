import File from '../../models/file.model.js'
import { badRequest, customError, deleted, success, updated } from '../../utils/response.utils.js'


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
        const { fileId } = req.params;

        const file = await File.findOne({ _id: fileId, user: req.userId });

        if (!file) return customError(res, 404, "File not found");

        return success(res, file, "File read");
    } catch (err) {
        next(err);
    }

}

const getAllFilesController = async (req, res, next) => {
    try {
        const files = await File.find({ user: req.userId });

        return success(res, files, "Files fetched");
    } catch (err) {
        next(err);
    }
}

const updateFileController = async (req, res, next) => {
    try {
        const { fileId } = req.params;
        const { content } = req.body;

        if (!fileId) return badRequest(res, "File id required");

        if (!content) return badRequest(res, "File content required");

        if (content === undefined) {
            return badRequest(res, "File content required");
        }

        const file = await File.findOneAndUpdate(
            { _id: fileId, user: req.userId },
            { content },
            { new: true }
        );

        if (!file) return customError(res, 404, "File not found");

        return updated(res, file, "File updated");
    } catch (err) {
        next(err);
    }

}

const deleteFileController = async (req, res, next) => {
    try {
        const { fileId } = req.params;

        if (!fileId) return badRequest(res, "File id required");

        const file = await File.findOneAndDelete({
            _id: fileId,
            user: req.userId,
        });

        if (!file) return customError(res, 404, "File not found");

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