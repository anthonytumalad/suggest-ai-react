import { useState, useEffect } from "react"
import { IconBell } from '@tabler/icons-react'

function Navbar() {
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        updateDate();
        
        const interval = setInterval(updateDate, 60000);
        
        return () => clearInterval(interval);
    }, [])

    const updateDate = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        setCurrentDate(now.toLocaleDateString('en-US', options));
    }

    return (
        <nav className="fixed w-[calc(100%-16rem)] left-64 top-0 z-10 bg-[#FBFBFB] h-12">
            <div className="flex items-center justify-between px-6 py-4">
                <span className="text-sm font-medium text-[#222831]">
                    {currentDate}
                </span>
                <div>
                    <button 
                        
                        className="p-2 rounded-full border border-[#222831]/10 text-[#222831] hover:bg-gray-100 transition-colors duration-200"
                    >
                        <IconBell size={18} stroke={2} />
                    </button>
                </div>
            </div>
        </nav>
    )
}

export { Navbar }