import { DataTable } from "../data-table"
import { FeedbackColumns } from "./feedback.columns"
import type { Feedback } from "../../../utilities/interfaces/feedback-interface"

interface FeedbackTableProps {
    data: Feedback[]
    loading?: boolean
    onSelectionChange?: (selectedRows: Feedback[]) => void
    onReply: (feedbackId: number | string) => void
    onDelete: (feedbackId: number | string) => void
    isDeleting?: boolean
    selectedRows?: Feedback[]
}

function FeedbackTable({
    data,
    loading = false,
    onSelectionChange,
    onReply,
    onDelete,
    isDeleting = false,
    selectedRows
}: FeedbackTableProps) {
    return (
        <DataTable
            data={data}
            loading={loading}
            columns={FeedbackColumns({
                onReply,
                onDelete,
                isDeleting,
            })}
            onSelectionChange={onSelectionChange}
            pageSizeOptions={[10, 20, 50]}
            selectedRows={selectedRows}
        />
    )
}

export { FeedbackTable }