import FileExplorer from '../components/FileExplorer'
import CodeEditor from '../components/CodeEditor'
import CopilotPanel from '../components/CopilotPanel'

const Editor = () => {
  return (
    <div className="h-screen flex bg-[#1e1e1e] text-white">
      
      <div className="w-1/5 border-r border-gray-700">
        <FileExplorer />
      </div>

      <div className="w-3/5">
        <CodeEditor />
      </div>

      <div className="w-1/5 border-l border-gray-700">
        <CopilotPanel />
      </div>

    </div>
  )
}

export default Editor