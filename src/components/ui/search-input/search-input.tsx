import { IconSearch, IconX } from "@tabler/icons-react"

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

function SearchInput({ value, onChange, placeholder = "Search...", className = "" }: SearchInputProps) {
    return (
        <div className={`relative w-70 ${className}`}>
            <IconSearch
                size={17}
                stroke={2}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#222831]/50"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="text-sm text-[#222831] tracking-normal py-2 pl-12 pr-10 w-full 
                           border border-[#222831]/10 rounded-full bg-white
                           focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                           transition-all duration-300 appearance-none"
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 
                               text-[#222831]/50 hover:text-[#222831] cursor-pointer"
                >
                    <IconX size={17} stroke={2} />
                </button>
            )}
        </div>
    )

}   

export { SearchInput }