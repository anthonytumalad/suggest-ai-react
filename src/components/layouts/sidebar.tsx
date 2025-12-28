import type React from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../hooks/auth/use-auth"
import {
    IconLogout,
    IconHome,
    IconHomeFilled,
    IconUser,
    IconMail,
    IconMailFilled,
    IconTrash,
    IconTrashFilled,
    IconFileDescription,
    IconFileDescriptionFilled,
} from '@tabler/icons-react'

interface SideBarProps {
    onSelect: (index: number) => void;
    activeIndex: number | null;
}

const sidebarItems = [
    { name: 'Dashboard', path: '/dashboard', icon: IconHome, filledIcon: IconHomeFilled },
    { name: 'Forms', path: '/forms', icon: IconFileDescription, filledIcon: IconFileDescriptionFilled },
    { name: 'Email', path: '/email', icon: IconMail, filledIcon: IconMailFilled },
    { name: 'Trash', path: '/trash', icon: IconTrash, filledIcon: IconTrashFilled },
]

const Sidebar: React.FC<SideBarProps> = ({ onSelect, activeIndex }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, loading, logout } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const profileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const currentPath = location.pathname;
        const newActiveIndex = sidebarItems.findIndex(item => item.path === currentPath);

        if (newActiveIndex !== -1 && newActiveIndex !== activeIndex) {
            onSelect(newActiveIndex);
        }
    }, [location.pathname, activeIndex, onSelect])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    function handleSelect(index: number) {
        onSelect(index);
        const path = sidebarItems[index].path;
        if (path) navigate(path);
    }

    const handleLogout = async () => {
        await logout()
        setIsProfileOpen(false)
        navigate('/login')
    }

    return (
        <aside className="fixed z-10 left-0 top-0 min-h-screen w-64 bg-[#FBFBFB] overflow-auto flex flex-col">
            <div className="flex px-2.5 pb-12 pt-2">
                <img src="logo.png" alt="" className="h-12" />
            </div>
            <nav className="flex-1 px-2">
                <ul>
                    {sidebarItems.map(({ name, icon: Icon, filledIcon: FilledIcon }, index) => {
                        const isActive = activeIndex === index
                        const ItemsIcon = isActive ? FilledIcon : Icon

                        return (
                            <li
                                key={name}
                            >
                                <div className="mb-1">
                                    <button
                                        className={`w-full cursor-pointer flex items-center gap-4 p-2.5 rounded-full transition-all duration-200 text-[#545454] group ${isActive
                                                ? 'bg-amber-100 text-[#222831]'
                                                : 'text-[#545454] hover:bg-amber-100 hover:text-[#222831]'
                                            }`}
                                        onClick={() => handleSelect(index)}
                                    >
                                        <ItemsIcon
                                            size={18}
                                            stroke={2}
                                            className={`transition-colors duration-200 ${isActive
                                                    ? "text-[#222831]"
                                                    : "text-[#545454] group-hover:text-[#222831]"
                                                }`}
                                        />
                                        <span
                                            className={`text-sm font-medium tracking-normal transition-colors duration-200 ${isActive
                                                    ? "text-[#222831]"
                                                    : "text-[#545454] group-hover:text-[#222831]"
                                                }`}
                                        >
                                            {name}
                                        </span>
                                    </button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <div className="mt-auto p-2.5 relative" ref={profileRef}>
                <button
                    className="group w-full py-2 px-4 cursor-pointer flex items-center justify-between  transition-colors border border-[#222831]/10 rounded-full bg-[#FBFBFB] hover:bg-gray-100 duration-300"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <div className="flex items-center gap-4">
                        <div className="text-[#545454] p-2 rounded-full border border-[#222831]/10 bg-[#FBFBFB] group-hover:bg-gray-100 transition-colors duration-300">
                            <IconUser size={24} stroke={2} />
                        </div>
                        <span className="text-sm font-medium">
                            {loading ? 'Loading...' : (user?.name || 'Guest')}
                        </span>
                    </div>
                </button>
            </div>

            {isProfileOpen && (
                <div 
                    className="absolute bottom-20 left-2.5 right-2.5 bg-white rounded-xl border 
                    border-[#222831]/15 overflow-hidden"
                >
                    <div 
                        className="flex flex-col items-start tracking-normal px-4 py-3 border-b border-[#222831]/15"
                    >
                        <span className="text-sm font-medium text-[#222831]">
                            {user?.name || 'No name available'}
                        </span>
                        <span className="text-sm text-[#545454]">
                            {user?.email || 'No email available'}
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={handleLogout}
                            className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-red-50 text-[#222831] transition-colors cursor-pointer"
                        >
                            <IconLogout size={18} stroke={2} />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </aside>
    )
}

export { Sidebar }
