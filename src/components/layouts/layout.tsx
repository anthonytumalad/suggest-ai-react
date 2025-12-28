import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Navbar } from "./navbar"
import { Sidebar } from "./sidebar"
import { useLoading } from "../../context/loading-context"

const Layout: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const { isLoading } = useLoading()

    return (
        <div className="flex min-h-screen">
            <Sidebar
                onSelect={setActiveIndex}
                activeIndex={activeIndex} 
            />
            <div className="flex-1 flex flex-col ml-64">
                <Navbar />
                <main className="flex-1 mt-22 p-6 overflow-y-auto">
                    <Outlet />

                    {isLoading && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-3">
                                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
                                <span className="text-[#222831] tracking-normal">Loading...</span>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

export { Layout }