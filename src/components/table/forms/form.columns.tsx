import type { Column } from "../../../utilities/interfaces/table-interface"
import { Button } from "../../ui/button/button"
import { IconEye, IconTrash, IconPencil } from "@tabler/icons-react"
import type { Form } from "../../../utilities/interfaces/form-interface"

interface FormColumnActions {
    onFormClick: (slug: string) => void
    onEdit: (form: Form) => void
    onDelete: (slug: string, title: string) => void
    isUpdating?: boolean
    isDeleting?: boolean
}

export const FormColumns = ({
    onFormClick,
    onEdit,
    onDelete,
    isUpdating = false,
    isDeleting = false,
}: FormColumnActions): Column<Form>[] => [
    {
        key: "title",
        label: "Title",
        render: (_value, row: Form) => (
            <button
                onClick={() => onFormClick(row.slug)}
                className="text-left font-medium text-[#222831] hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-2"
            >
                {row.title}
                {row.new_feedbacks > 0 && (
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                        {row.new_feedbacks}
                    </span>
                )}
            </button>
        ),
    },
    {
        key: "new_feedbacks", 
        label: "New Feedback",
        render: (_value, row: Form) => (
            <span className={row.new_feedbacks > 0 ? "text-red-600 font-semibold" : "text-[#545454]"}>
                {row.new_feedbacks}
            </span>
        ),
    },
    {
        key: "total_feedbacks", 
        label: "Total Feedback",
        render: (_value, row: Form) => (
            <span className="text-[#545454]">{row.total_feedbacks}</span>
        ),
    },
    {
        key: "actions",
        label: "Actions",
        render: (_value, row: Form) => (
            <div className="flex gap-2">
                <Button
                    label="Edit"
                    variant="green"
                    icon={<IconPencil size={15} />}
                    size="sm"
                    disabled={isUpdating}
                    onClick={() => onEdit(row)}
                />
                <Button
                    label="View"
                    variant="blue"
                    icon={<IconEye size={15} />}
                    size="sm"
                    onClick={() => onFormClick(row.slug)}
                />
                <Button
                    label="Delete"
                    variant="red"
                    icon={<IconTrash size={15} />}
                    size="sm"
                    disabled={isDeleting}
                    onClick={() => onDelete(row.slug, row.title)}
                />
            </div>
        ),
    },
]