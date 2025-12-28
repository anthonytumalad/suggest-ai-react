import type { ReactNode } from 'react'
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { IconX } from '@tabler/icons-react'

interface DialogProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    'aria-label'?: string
    width?: string
}

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    children,
    'aria-label': ariaLabel,
    width = 'max-w-md'
}) => {

    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY

            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.width = '100%'
            document.body.style.overflowY = 'scroll' 

            return () => {
                document.body.style.position = ''
                document.body.style.top = ''
                document.body.style.width = ''
                document.body.style.overflowY = ''
                window.scrollTo(0, scrollY)
            }
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
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
                flex flex-col justify-start items-center
                pt-20 px-4
                bg-black/50
                animate-in fade-in duration-200
            "
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
        >
            <div 
                className={`
                    ${width} 
                    w-full
                    bg-white
                    rounded-xl
                    overflow-hidden
                    animate-in zoom-in-95 duration-200
                    relative
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="
                        absolute top-3 right-3
                        p-1.5 rounded-full
                        text-[#545454]
                        hover:bg-gray-100 hover:text-[#222831]
                        transition cursor-pointer
                    "
                >
                    <IconX size={18} />
                </button>
                {children}
            </div>
        </div>,
        document.body
    )
}

export { Dialog }