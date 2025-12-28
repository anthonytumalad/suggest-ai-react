import type { ReactNode } from "react"
import React, { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { IconX } from "@tabler/icons-react"

type ModalSize = "sm" | "md" | "lg" | "xl" | "doublexl"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    footer?: ReactNode
    size?: ModalSize
    "aria-label"?: string
}

const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    doublexl: "max-w-2xl"
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = "md",
    "aria-label": ariaLabel
}) => {
    
    const overlayRef = useRef<HTMLDivElement>(null)
    const scrollY = useRef(0)
    
    useEffect(() => {
        if (!isOpen) return

        scrollY.current = window.scrollY

        document.body.style.position = "fixed"
        document.body.style.top = `-${scrollY.current}px`
        document.body.style.width = "100%"
        document.body.style.overflowY = "scroll"

        return () => {
            document.body.style.position = ""
            document.body.style.top = ""
            document.body.style.width = ""
            document.body.style.overflowY = ""
            window.scrollTo(0, scrollY.current)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === overlayRef.current) {
            onClose()
        }
    }

    if (!isOpen) return null

    return createPortal(
        <div
            ref={overlayRef}
            onClick={handleOverlayClick}
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                px-4 py-6
                bg-black/50
                animate-in fade-in duration-200
            "
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
        >
            <div
                className={`
                    ${sizeClasses[size]}
                    w-full
                    max-h-full
                    bg-white
                    rounded-xl
                    shadow-xl
                    flex flex-col
                    animate-in zoom-in-95 duration-200
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {(title || true) && (
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#222831]/10">
                        {title ? (
                            <h3 className="text-base font-semibold text-[#222831] tracking-normal">
                                {title}
                            </h3>
                        ) : (
                            <span />
                        )}
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="
                                p-1.5 rounded-full
                                text-[#545454]
                                hover:bg-gray-100 hover:text-[#222831]
                                transition cursor-pointer
                            "
                        >
                            <IconX size={20} />
                        </button>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="flex justify-end gap-3 px-5 py-4 border-t border-[#222831]/10 bg-[#F7f7f7]/50 rounded-b-xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    )
}

export { Modal }