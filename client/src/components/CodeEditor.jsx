import React from 'react'
import { useEditor } from '../context/EditorContext';

const CodeEditor = () => {
    const { code, setCode } = useEditor();
    return (
        <div className="h-full p-4 overflow-y-auto">
            <h2 className="text-lg font-bold mb-3">Code Editor</h2>
            <div className="text-gray-400 text-sm">Select a file to edit</div>
            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full bg-[#1e1e1e] p-4 outline-none font-mono"
                placeholder="Start coding..."
            />
        </div>
    )
}

export default CodeEditor