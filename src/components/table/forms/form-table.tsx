import { DataTable } from "../data-table"
import { FormColumns } from "./form.columns"
import type { FormTableProps } from "../../../utilities/interfaces/table-interface"

function FormsTable({
    data,
    loading = false,
    onSelectionChange,
    onFormClick,
    onEdit,
    onDelete,
    isUpdating = false,
    isDeleting = false,
}: FormTableProps) {
    return (
        <DataTable
            data={data}
            loading={loading}
            columns={FormColumns({
                onFormClick,
                onEdit,
                onDelete,
                isUpdating,
                isDeleting
            })}
            onSelectionChange={onSelectionChange}
            pageSizeOptions={[5, 10, 15]}
        />
    )
}

export { FormsTable }