import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    parentFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "folders",
        default: null,
    },
}, { timestamps: true });

const Folder = mongoose.model("folders", folderSchema);

export default Folder;