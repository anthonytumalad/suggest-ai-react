import { Dialog } from "./dialog"
import {
    IconFileSpreadsheet,
    IconFileTypeCsv,
    IconFileTypePdf,
    IconCopy,
} from '@tabler/icons-react'
import { useExportFeedback } from "../../../hooks/useExportFeedback"

interface ExportDialogProps {
    isOpen: boolean
    onClose: () => void
    formTitle: string
    responseCount: number, 
    formSlug: string 
}

const ExportDialog: React.FC<ExportDialogProps> = ({
    isOpen,
    onClose,
    formTitle,
    responseCount,
    formSlug
}) => {

    const exportMutation = useExportFeedback({
        slug: formSlug ?? '',
        onSuccess: () => onClose(),
    })

    const formatMap: Record<string, 'csv' | 'excel' | 'pdf' | 'clipboard'> = {
        "CSV File": "csv",
        "Excel (XLSX)": "excel",
        "PDF Report": "pdf",
        "Copy to Clipboard": "clipboard",
    }

    const handleExport = (label: string) => {
        const format = formatMap[label]
        if (format) {
            exportMutation.mutate(format)
        }
    }

    const options = [
        {
            icon: IconFileTypeCsv,
            label: "CSV File",
            description: "Open in Excel, Google Sheets, or any spreadsheet app"
        },
        {
            icon: IconFileSpreadsheet,
            label: "Excel (XLSX)",
            description: "Rich formatting and formulas support"
        },
        {
            icon: IconFileTypePdf,
            label: "PDF Report",
            description: "Professional printable document"
        },
        {
            icon: IconCopy,
            label: "Copy to Clipboard",
            description: "Quick paste into Sheets or Excel"
        }
    ]

    return (
        <Dialog
            isOpen={isOpen}
            onClose={onClose}
            aria-label="Export feedback"
            width="max-w-md"
        >
            <div className="p-6 tracking-normal text-[#222831]">
                {/* Header */}
                <div className="text-center p-6">
                    <h3 className="text-base font-semibold text-[#222831]">
                        Export Feedback
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                        {formTitle}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        {responseCount} {responseCount === 1 ? 'response' : 'responses'}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {options.map(({ icon: Icon, label, description }) => (
                        <button
                            key={label}
                            disabled={exportMutation.isPending}
                            onClick={() => handleExport(label)}
                            className="
                                group flex flex-col items-center p-4
                                text-sm text-[#222831]
                                border border-[#222831]/10 rounded-xl bg-[#F7f7f7]/50
                                focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                                transition-all duration-300 appearance-none
                                cursor-pointer
                            "
                        >
                            <div className="
                                p-4 rounded-xl mb-4 bg-
                            ">
                                <Icon size={30} stroke={1.5} className="text-[#222831]" />
                            </div>
                            <span className="font-medium text-[#222831] text-sm">
                                {label}
                            </span>
                            <span className="text-xs text-[#545454] text-center px-2">
                                {description}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 text-center mt-8">
                    Exports include all submitted data • Date: {new Date().toLocaleDateString()}
                </p>
            </div>
        </Dialog>
    )
}

export { ExportDialog }