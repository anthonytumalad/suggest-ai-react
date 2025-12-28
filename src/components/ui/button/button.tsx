import type { ReactNode } from "react"
import { IconLoader2 } from "@tabler/icons-react"

interface ButtonProps {
    onClick?: () => void
    disabled?: boolean
    icon?: ReactNode
    label: string
    variant?: "amber" | "blue" | "red" | "green" | "ghost"
    size?: "sm" | "md"
    className?: string
    type?: "button" | "submit" | "reset"
    loading?: boolean 
}

function Button ({
    onClick,
    disabled = false,
    icon,
    label,
    type = "button",
    className = "",
    variant = "amber",
    size = "md",
    loading = false
}: ButtonProps) {

    const baseStyles = `
        flex items-center justify-center gap-2 rounded-full font-medium 
        transition-all duration-300 focus:outline-none h-8 text-sm tracking-normal
        ${size === "md" ? "w-30" : "w-22"}
        ${loading || disabled ? "cursor-not-allowed" : "cursor-pointer"}
    `

    const variantStyles: Record<string, { enabled: string; hover: string; disabled: string }> = {
        ghost: {
            enabled: "bg-white border border-[#222831]/15 text-[#222831]",
            hover: "none",
            disabled: "bg-gray-300 text-gray-500"
        },
        amber: {
            enabled: "bg-amber-400 text-white",
            hover: "hover:bg-amber-500",
            disabled: "bg-gray-300 text-gray-500",
        },
        blue: {
            enabled: "bg-blue-400 text-white ",
            hover: "hover:bg-blue-500",
            disabled: "bg-gray-300 text-gray-500",
        },
        red: {
            enabled: "bg-red-400 text-white ",
            hover: "hover:bg-red-500",
            disabled: "bg-gray-300 text-gray-500",
        },
        green: {
            enabled: "bg-green-400 text-white ",
            hover: "hover:bg-green-500",
            disabled: "bg-gray-300 text-gray-500",
        },
    }

    const isDisabled = disabled || loading
    const variantClass = variantStyles[variant][isDisabled ? "disabled" : "enabled"]
    const hoverClass = isDisabled ? "" : variantStyles[variant].hover

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantClass} ${hoverClass} ${className}`}
            aria-label={label}
        >
            {loading ? (
                <IconLoader2 className="animate-spin" size={size === "md" ? 18 : 15} />
            ) : (
                <>
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span className={icon ? "" : ""}>{label}</span>
                </>
            )}
        </button>
    )

}

export { Button }