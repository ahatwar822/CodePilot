import { createContext, useContext, useState } from "react";

const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
    const [code, setCode] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [language, setLanguage] = useState("javascript");

    return (
        <EditorContext.Provider
            value={{ code, setCode, suggestion, setSuggestion, loading, setLoading, language, setLanguage }}
        >
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => useContext(EditorContext);