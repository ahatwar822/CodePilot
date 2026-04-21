import { useEffect, useState } from "react";
import api from "../services/api";
import { useFile } from "../context/FileContext";
import { useEditor } from "../context/EditorContext";
import { getLanguageFromFile } from "../utils/getLanguage";
import { buildTree } from "../utils/buildTree";


const FileExplorer = () => {
    const {
        files,
        setFiles,
        folders,
        setFolders,
        openTabs,
        setOpenTabs,
        setActiveFile
    } = useFile();

    const { setCode, setLanguage } = useEditor();

    const [newFile, setNewFile] = useState("");
    const [newFolder, setNewFolder] = useState("");

    //  Fetch all
    const fetchData = async () => {
        const fileRes = await api.get("/file");
        const folderRes = await api.get("/folder");

        setFiles(fileRes.data.data);
        setFolders(folderRes.data.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    //  Open file
    const openFile = (file) => {
        setActiveFile(file)
        setCode(file.content || "");
        setLanguage(getLanguageFromFile(file.name));

        // add tab if not exists
        const exists = openTabs.find((f) => f._id === file._id);
        if (!exists) {
            setOpenTabs([...openTabs, file]);
        }
    };

    //  Create file
    const createFile = async () => {
        if (!newFile) return;

        await api.post("/file", { name: newFile });
        setNewFile("");
        fetchData();
    };

    //  Create folder
    const createFolder = async () => {
        if (!newFolder) return;

        await api.post("/folder", { name: newFolder });
        setNewFolder("");
        fetchData();
    };

    // render tree
    const renderTree = (node) => {
        // FILE
        if (!node.children) {
            return (
                <div
                    key={node._id}
                    className="pl-4 cursor-pointer hover:bg-gray-700"
                    onClick={() => openFile(node)}
                >
                    📄 {node.name}
                </div>
            );
        }

        // FOLDER
        return (
            <div key={node._id}>
                <div className=" text-yellow-400 pl-1.5 cursor-pointer hover:bg-gray-700">
                    📁 {node.name}
                </div>
                {node.files?.map((file) => renderTree(file))}
                {node.children.map((child) => renderTree(child))}
            </div>
        );
    }

    const tree = buildTree(folders, files);
    return (
        <div className="p-2 text-sm">

            <h2 className="mb-2">Explorer</h2>

            {/* Create file */}
            <input
                value={newFile}
                onChange={(e) => setNewFile(e.target.value)}
                placeholder="New file"
                className="w-full p-1 mb-1 bg-gray-700"
            />
            <button onClick={createFile} className="w-full bg-blue-600 mb-2">
                Create File
            </button>

            {/* Create folder */}
            <input
                value={newFolder}
                onChange={(e) => setNewFolder(e.target.value)}
                placeholder="New folder"
                className="w-full p-1 mb-1 bg-gray-700"
            />
            <button onClick={createFolder} className="w-full bg-green-600 mb-2">
                Create Folder
            </button>

            {/* TREE */}
            <div>
                {tree.map((node) => renderTree(node))}
            </div>

        </div>
    );
};

export default FileExplorer;