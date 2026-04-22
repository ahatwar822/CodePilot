import FileExplorer from '../components/FileExplorer'
import CodeEditor from '../components/CodeEditor'
import CopilotPanel from '../components/CopilotPanel'
import { EditorProvider } from '../context/EditorContext'
import { FileProvider } from "../context/FileContext";
import Tabs from '../components/Tabs';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserProfileCard from '../components/UserProfileCard';

const Editor = () => {
    const { user, logout } = useAuth();
    return (
        <FileProvider>
            <EditorProvider>
                <div className="h-screen w-screen flex bg-[#1e1e1e] text-white overflow-hidden">

                    {/* Left Sidebar - File Explorer with User Profile */}
                    <div className="w-1/5 border-r border-gray-700 bg-[#252526] overflow-hidden flex flex-col">

                        {/* User Profile Card */}
                        {user && <UserProfileCard  />}

                        {/* File Explorer */}
                        <div className="flex-1 overflow-y-auto">
                            <FileExplorer />
                        </div>
                    </div>

                    {/* Center - Code Editor */}
                    <div className="w-3/5 bg-[#1e1e1e] overflow-hidden flex flex-col">
                        <Tabs />
                        <CodeEditor />
                    </div>

                    {/* Right Sidebar - Copilot Panel */}
                    <div className="w-1/5 border-l border-gray-700 bg-[#252526] overflow-hidden">
                        <CopilotPanel />
                    </div>
                </div>
            </EditorProvider>
        </FileProvider>
    )
}

export default Editor