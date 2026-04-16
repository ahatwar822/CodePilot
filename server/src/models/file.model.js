import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        default: "",
    },
    language: {
        type: String,
        default: "javascript",
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folders",
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
}, { timestamps: true });

const File = mongoose.model("files", fileSchema);

export default File;