import React from 'react'
import { useEditor } from '../context/EditorContext';
import { Editor } from '@monaco-editor/react';

const CodeEditor = () => {
    const { code, setCode } = useEditor();
    return (
        <div className="h-full p-4 overflow-y-auto">
            <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                    fontSize: 14,
                    minimap: { enabled: false },
                    automaticLayout: true,
                }}
            />
        </div>
    )
}

export default CodeEditor