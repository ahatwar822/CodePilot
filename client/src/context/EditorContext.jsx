import { createContext, useContext, useEffect, useState } from "react";
import { useFile } from "./FileContext";
import { saveFileAPI } from "../services/file.service";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
    const [code, setCode] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("javascript");
     const [saving, setSaving] = useState(false);


    const { activeFile, setActiveFile, openTabs, setOpenTabs } = useFile();

    // file active then load content
    useEffect(() => {
        if (activeFile) {
            setCode(activeFile.content || "");
        }
    }, [activeFile]);



    //save file function
    const saveFile = async () => {
        if (!activeFile) return;

        try {
            await saveFileAPI(activeFile._id, code);

            setActiveFile((prev) => ({
                ...prev,
                content: code
            }))

            const updateTabs = openTabs.map((tab) =>
                tab._id === activeFile._id ? { ...tab, content: code } : tab
            );

            setOpenTabs(updateTabs);
            console.log("file save");
        } catch (err) {
            console.log("file not save", err)
        }finally{
            setSaving(false)
        }
    };

    useEffect(() => {
        const handleKey = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                saveFile();
            }
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey)
    }, [code, activeFile]);

    // auto save

    useEffect(() => {
        if (!activeFile) return;

        const timer = setTimeout(() => {
            saveFile();
        }, 3000);

        return clearTimeout(timer);
    }, [code])

    return (
        <EditorContext.Provider
            value={{
                code,
                setCode,
                suggestion,
                setSuggestion,
                loading,
                setLoading,
                language,
                setLanguage,
                saveFile,
                saving
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => useContext(EditorContext);