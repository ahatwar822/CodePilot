import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const UserProfileCard = () => {
    
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    if (!user) return null;
     const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#020617]
                    border-b border-white/10 p-4 backdrop-blur-md">

            <div className="flex flex-col gap-3">

                {/* Top Section */}
                <div className="flex items-center justify-between">

                    {/* Left Section */}
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div className="relative w-11 h-11 rounded-full
                            bg-linear-to-br from-blue-500 to-indigo-600
                            flex items-center justify-center
                            text-white font-bold text-lg
                            shadow-md ring-2 ring-white/10">
                            {user.username?.charAt(0).toUpperCase() || "U"}

                            {/* Online Dot */}
                            <span className="absolute bottom-0 right-0 w-3 h-3 
                               bg-green-500 rounded-full 
                               ring-2 ring-[#020617]" />
                        </div>

                        {/* User Info */}
                        <div>
                            <p className="text-sm font-semibold text-white tracking-wide">
                                {user.username}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-40">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="group flex items-center gap-2 px-3 py-2 cursor-pointer
                       text-red-400 hover:text-red-300
                       hover:bg-red-500/10
                       rounded-md
                       transition-all duration-200
                       hover:shadow-md hover:shadow-red-500/10
                       active:scale-95"
                    >
                        <svg
                            viewBox="0 0 512 512"
                            className="w-4 h-4 fill-current
                         transition-transform duration-200
                         group-hover:translate-x-1"
                        >
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                        </svg>

                        <span className="text-sm font-mono tracking-wide">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileCard;