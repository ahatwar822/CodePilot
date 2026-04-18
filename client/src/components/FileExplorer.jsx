import React from 'react'
import { useEditor } from "../context/EditorContext";
import { getLanguageFromFile } from "../utils/getLanguage";

const FileExplorer = () => {
    const openFile = (file) => {
        setCode(file.content || "");

        const lang = getLanguageFromFile(file.name);
        setLanguage(lang);
    };
    return (
        <div className="h-full p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">File Explorer</h2>
            <div className="text-gray-400 text-sm">No files open</div>
        </div>
    )
}

export default FileExplorer