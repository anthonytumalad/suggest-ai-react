import type { ReactNode } from "react"

interface Tab {
    key: string;
    label: string;
    content: ReactNode;
}

interface UnderlinedTabProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (key: string) => void;
}

function UnderlinedTab({
    tabs,
    activeTab,
    onTabChange
}: UnderlinedTabProps) {
    return (
        <div className="w-full">

            <div className="flex border-b border-[#222831]/10">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTabChange(tab.key)}
                        className={`
                            relative 
                            px-6 py-3 
                            text-sm font-medium tracking-normal 
                            transition-all duration-300
                            cursor-pointer
                            ${activeTab === tab.key
                                ? "text-[#222831] font-semibold"
                                : "text-[#545454] hover:text-[#222831]"
                            }
                        `}
                    >
                        {tab.label}
                        {activeTab === tab.key && (
                            <span
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-400 rounded-full"
                                style={{ animation: "slideIn 0.3s ease-out" }}
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-8">
                {tabs.find((tab) => tab.key === activeTab)?.content || null}
            </div>

        </div>
    )
}

export { UnderlinedTab }