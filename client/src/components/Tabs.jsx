import { useFile } from "../context/FileContext";
import { useEditor } from "../context/EditorContext";
import { getLanguageFromFile } from "../utils/getLanguage";

const Tabs = () => {
    const { openTabs, setOpenTabs, activeFile, setActiveFile } = useFile();
    const { setCode, setLanguage } = useEditor();

    const switchTab = (file) => {
        setActiveFile(file);
        setCode(file.content || "");
        setLanguage(getLanguageFromFile(file.name));
    };

    const closeTab = (fileId) => {
        const updated = openTabs.filter((f) => f._id !== fileId);
        setOpenTabs(updated);

        if (activeFile?._id === fileId) {
            setActiveFile(updated[0] || null);
            setCode(updated[0]?.content || "");
        }
    };

    return (
        <div className="flex bg-gray-800 text-sm">
            {openTabs.map((file) => (
                <div
                    key={file._id}
                    className={`px-3 py-1 flex items-center gap-2 cursor-pointer ${activeFile?._id === file._id ? "bg-gray-700" : ""
                        }`}
                    onClick={() => switchTab(file)}
                >
                    {file.name}

                    <span
                        className="text-red-300 hover:text-red-500"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeTab(file._id);
                        }}
                    >
                        X
                    </span>
                </div>
            ))}
        </div>
    );
};

export default Tabs;