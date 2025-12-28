import type React from "react"
import { Dialog } from "./dialog"
import { Button } from "../button/button"
import { IconAlertTriangle } from "@tabler/icons-react"

interface DeleteDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    itemName?: string
    count?: number
    isDeleting?: boolean
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    itemName,
    count,
    isDeleting = false,
}) => {

    const message = count && count > 1
        ? `Do you really want to remove ${count} items? What you've done cannot be undone.`
        : itemName
        ? `Do you really want to remove "${itemName}"? What you've done cannot be undone.`
        : `Do you really want to remove this item? What you've done cannot be undone.`


    return (
        <Dialog isOpen={isOpen} onClose={onClose} width="max-w-md">
            {/* Body */}
            <div className="px-6 py-8 text-center">
                <IconAlertTriangle
                    size={50}
                    className="mx-auto mb-4 text-red-500"
                />

                <h2 className="text-base font-semibold text-[#222831] tracking-normal mb-3">
                    Are you sure?
                </h2>

                <p className="text-[#545454] text-sm max-w-md mx-auto tracking-normal">
                    {message}
                </p>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-4 py-4 border-t border-[#222831]/10 bg-[#F7f7f7]/50">
                <Button
                    label="Cancel"
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    disabled={isDeleting}
                />
                <Button
                    label="Delete"
                    variant="red"
                    size="sm"
                    onClick={onConfirm}
                    disabled={isDeleting}
                />
            </div>
        </Dialog>
    )
}

export { DeleteDialog }
