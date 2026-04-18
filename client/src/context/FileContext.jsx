import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
    const [files, setFiles] = useState([]);
    const [folders, setFolders] = useState([]);

    const [openTabs, setOpenTabs] = useState([]);
    const [activeFile, setActiveFile] = useState(null);

    return (
        <FileContext.Provider
            value={{
                files,
                setFiles,
                folders,
                setFolders,
                openTabs,
                setOpenTabs,
                activeFile,
                setActiveFile,
            }}
        >
            {children}
        </FileContext.Provider>
    );
};

export const useFile = () => useContext(FileContext);