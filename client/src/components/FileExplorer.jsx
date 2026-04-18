import { useEffect, useState } from "react";
import api from "../services/api";
import { useFile } from "../context/FileContext";
import { useEditor } from "../context/EditorContext";
import { getLanguageFromFile } from "../utils/getLanguage";

const FileExplorer = () => {
    const { files, setFiles, folders, setFolders, openTabs, setOpenTabs, setActiveFile } = useFile();
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
        setCode(file.content || "");
        setLanguage(getLanguageFromFile(file.name));
        setActiveFile(file);

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

            {/* Files */}
            {files.map((file) => (
                <div
                    key={file._id}
                    onClick={() => openFile(file)}
                    className="cursor-pointer hover:bg-gray-700 p-1"
                >
                    📄 {file.name}
                </div>
            ))}

            {/* Folders */}
            {folders.map((folder) => (
                <div key={folder._id} className="text-yellow-400">
                    📁 {folder.name}
                </div>
            ))}

        </div>
    );
};

export default FileExplorer;