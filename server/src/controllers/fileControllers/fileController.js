import fs from 'fs'
import { customError, deleted, serverError, success, updated } from '../../utils/response.utils.js'
import path from 'path';

const createFileController = async (req, res) => {
    try {
        const {fileName} = req.body;
        if (!fileName) {
            return customError(res, {}, 400, "File name is required");
        }
        const currentDir = path.resolve() + '/assets';
        const filePath = path.join(currentDir, fileName);

        await fs.writeFile(filePath, '', (err) => {
            if(err){
                return customError(res, {}, 500, "Error creating file");
            }

            return success(res, { message: 'File created successfully' });
        })
        
    } catch (error) {
        return serverError(res, "Internal SError while creating file", { error: error.message });
    }

}

const readFileController = async (req, res) => {
    try {
        const { fileName } = req.query;
        if (!fileName) {
            return customError(res, {}, 400, "file name is required");
        }
        const currentDir = path.resolve() + '/assets';
        const filePath = path.join(currentDir, fileName);
        if (!fs.existsSync(filePath)) {
            return customError(res, {}, 404, "File not found");
        }
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return customError(res, {}, 500, "Error reading file");
            }
            return success(res, { data });
        })
    } catch (error) {
        return serverError(res, "Internal Server Error while reading file", { error: error.message });
    }

}

const updateFileController = async (req, res) => {
    try {
        const { fileName, content } = req.body;
        if (!fileName || !content) {
            return customError(res, {}, 400, "File name and content are required");
        }
        const currentDir = path.resolve() + '/assets';
        const filePath = path.join(currentDir, fileName);
        if (!fs.existsSync(filePath)) {
            return customError(res, {}, 404, "File not found");
        }
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                return customError(res, {}, 500, "Error updating file");
            }
            return updated(res, { message: 'File updated successfully' });
        })
        
    } catch (error) {
        return serverError(res, "Internal Server Error while updating file", { error: error.message });
    }

}

const deleteFileController = async (req, res) => {
    try {
        const { fileName } = req.body;
        if (!fileName) {
            return customError(res, {}, 400, "File name is required");
        }
        const currentDir = path.resolve() + "/assets";
        const filePath = path.join(currentDir, fileName);
        if (!fs.existsSync(filePath)) {
            return customError(res, {}, 404, "File not found");
        }
        fs.unlink(filePath, (err) => {
            if(err){
                return customError(res, {}, 500, "Error deleting file");
            }
            return deleted(res, { message: 'File deleted successfully' });
        })
        
    } catch (error) {
        return serverError(res, "Internal Server Error while deleting file", { error: error.message });
    }
}

export {
    createFileController,
    readFileController,
    updateFileController,
    deleteFileController
}