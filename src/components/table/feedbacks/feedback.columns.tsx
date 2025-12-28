import type { Column } from "../../../utilities/interfaces/table-interface"
import { Button } from "../../ui/button/button"
import { IconSend, IconTrash } from "@tabler/icons-react"
import type { Feedback } from "../../../utilities/interfaces/feedback-interface"

interface FeedbackColumnActions {
    onReply: (feedbackId: number | string) => void
    onDelete: (feedbackId: number | string) => void
    isDeleting?: boolean
}

export const FeedbackColumns = ({
    onReply,
    onDelete,
    isDeleting = false,
}: FeedbackColumnActions): Column<Feedback>[] => [
        {
            key: "id",
            label: "ID",
            render: (value) => <span className="text-xs text-gray-500">#{value}</span>,
        },
        {
            key: "sender",
            label: "Sender",
            render: (_, row) => (
                <div className="flex items-center gap-3">
                    {row.is_anonymous ? (
                        <>
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-600 font-medium text-lg">?</span>
                            </div>
                            <span className="text-gray-500 italic">Anonymous</span>
                        </>
                    ) : (
                        <>
                            <img
                                src={row.sender_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(row.sender_email || 'User')}&background=6366f1&color=fff`}
                                className="w-8 h-8 rounded-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.sender_email || 'User')}&background=6366f1&color=fff`
                                }}
                            />
                            <div>
                                <p className="text-sm tracking-normal text-[#222831]">
                                    {row.sender_email
                                        ? row.sender_email.split('@')[0]
                                        : 'User'}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            ),
        },
        {
            key: "role",
            label: "Role"
        },
        {
            key: "rating",
            label: "Rating",
        },
        {
            key: "feedback",
            label: "Feedback",
            render: (value) => (
                <p className="max-w-md tracking-normal text-sm text-[#222831] line-clamp-3">
                    {value?.trim() ? value : <span className="text-gray-500 italic">No feedback provided</span>}
                </p>
            ),
        },
        {
            key: "suggestion",
            label: "Suggestion",
            render: (value) => (
                <p className="max-w-md tracking-normal text-sm text-[#222831] line-clamp-3">
                    {value?.trim() ? value : <span className="text-gray-500 italic">No suggestions provided</span>}
                </p>
            ),
        },
        {
            key: "created_at",
            label: "Created At",
            render: (value) => {
                const date = new Date(value)

                return (
                    <div className="flex flex-col text-sm text-[#545454]">
                        <span>{date.toLocaleDateString()}</span>
                        <span className="text-xs text-[#545454]">
                            {date.toLocaleTimeString()}
                        </span>
                    </div>
                )
            },

        },
        {
            key: "actions",
            label: "Actions",
            render: (_, row) => (
                <div className="flex gap-2">
                    <Button
                        label="Reply"
                        variant="blue"
                        size="sm"
                        icon={<IconSend size={15} />}
                        onClick={() => onReply(row.id)}
                    />
                    <Button
                        label="Delete"
                        variant="red"
                        size="sm"
                        icon={<IconTrash size={15} />}
                        onClick={() => onDelete(row.id)}
                        disabled={isDeleting}
                    />
                </div>
            ),
        },
    ]