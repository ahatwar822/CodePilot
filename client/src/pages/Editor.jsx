import FileExplorer from '../components/FileExplorer'
import CodeEditor from '../components/CodeEditor'
import CopilotPanel from '../components/CopilotPanel'
import { EditorProvider } from '../context/EditorContext'

const Editor = () => {
    return (
        <EditorProvider>
            <div className="h-screen w-screen flex bg-[#1e1e1e] text-white overflow-hidden">

                <div className="w-1/5 border-r border-gray-700 bg-[#252526] overflow-hidden">
                    <FileExplorer />
                </div>

                <div className="w-3/5 bg-[#1e1e1e] overflow-hidden">
                    <CodeEditor />
                </div>

                <div className="w-1/5 border-l border-gray-700 bg-[#252526] overflow-hidden">
                    <CopilotPanel />
                </div>

            </div>
        </EditorProvider>
    )
}

export default Editor