import { useState, useEffect } from "react"
import { Button } from "../../components/ui/button/button"
import { SearchInput } from "../../components/ui/search-input/search-input"
import { DeleteDialog } from "../../components/ui/dialog/delete-dialog"
import { AddFormModal } from "../../components/ui/modal/add-form-modal"
import { EditFormModal } from "../../components/ui/modal/edit-form-modal"
import { useForms } from "../../hooks/use-form"
import { useSummarizeFeedback } from "../../hooks/use-summarize-feedback"
import type { Form } from "../../utilities/interfaces/form-interface"
import { FormsTable } from "../../components/table/forms/form-table"
import { FeedbackTable } from "../../components/table/feedbacks/feedback-table"
import { SummaryTab } from "../../components/ui/tab/summary/summary-tab"
import { ShareFormDialog } from "../../components/ui/dialog/share-form-dialog"
import { ExportDialog } from "../../components/ui/dialog/export-dialog"
import { getPublicFormUrl, getQrCodeUrl } from "../../utilities/helper/url-helpers"
import {
    IconPlus,
    IconPencil,
    IconTrash,
    IconLoader2,
    IconX,
    IconDownload,
    IconShare3
}
    from '@tabler/icons-react'
import { showToast } from "../../lib/toast"

const SELECTED_FORM_STORAGE_KEY = "selectedFeedbackFormSlug"

export default function ViewFormList() {
    const {
        forms,
        isFormsLoading,
        createFormMutation,
        updateFormMutation,
        deleteFormMutation,
        useFormWithFeedbacks
    } = useForms()

    const {
        summarize,
        summary, isLoading: isSummarizing,
        isError: summarizeError,
        error: summarizeErrorMsg,
        isPolling, 
        // reset: resetSummary
    } = useSummarizeFeedback()

    const [selectedRows, setSelectedRows] = useState<Form[]>([])
    const [selectedFeedbacks, setSelectedFeedbacks] = useState<any[]>([])

    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingForm, setEditingForm] = useState<Form | null>(null)

    const [deleteTarget, setDeleteTarget] = useState<{
        type: "forms" | "single-form" | "feedbacks"
        slugs?: string[]
        titles?: string
        count?: number
    }>({ type: "forms" })

    const [searchForm, setSearchForm] = useState('')
    const [searchFeedback, setSearchFeedback] = useState('')
    const [isFeedbackSectionLoading, setIsFeedbackSectionLoading] = useState(false)

    const [filterRole, setFilterRole] = useState<string>("all")
    const [filterRating, setFilterRating] = useState<string>("all")
    const [filterDate, setFilterDate] = useState<string>("")

    const [isShareOpen, setIsShareOpen] = useState(false)
    const [isExportOpen, setIsExportOpen] = useState(false)


    const [selectedFormSlug, setSelectedFormSlug] = useState<string | null>(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem(SELECTED_FORM_STORAGE_KEY)
        }
        return null
    })

    const filteredForms = (forms ?? []).filter(form =>
        form.title.toLowerCase().includes(searchForm.toLowerCase())
    )

    const {
        data: selectedFormWithFeedbacks,
        isLoading: isFeedbackLoading,
        error: feedbackError
    } = useFormWithFeedbacks(selectedFormSlug || "")


    const handleConfirmDelete = async () => {
        if (!deleteTarget.slugs || deleteTarget.slugs.length === 0) return

        const count = deleteTarget.slugs.length
        const isSingle = count === 1
        const itemName = deleteTarget.titles || "form"

        const deletePromises = deleteTarget.slugs.map(
            slug =>
                new Promise((resolve, reject) => {
                    deleteFormMutation.mutate(slug, {
                        onSuccess: () => resolve(slug),
                        onError: (err) => reject(err)
                    })
                })
        )

        showToast.promise(
            Promise.all(deletePromises), {
            loading: `Deleting ${count} ${count > 1 ? 'forms' : 'form'}...`,
            success: `${count} ${count > 1 ? 'forms' : 'form'} deleted successfully!`,
            error: (err) => {
                console.error("Delete error:", err)
                return isSingle
                    ? `Failed to delete "${itemName}"`
                    : `Failed to delete ${count} forms. Some may have been deleted.`
            }
        }
        )

        setIsDeleteOpen(false)

        if (deleteTarget.slugs.includes(selectedFormSlug || "")) {
            handleCloseFeedback()
        }
    }

    const handleSummarize = () => {
        if (selectedFeedbacks.length === 0) {
            alert("Please select at least one feedback to summarize.")
            return
        }

        const feedbackTexts = selectedFeedbacks.map(
            f => f.message || f.content || JSON.stringify(f)
        )

        summarize(feedbackTexts)
    }


    const filteredFeedbacks = (selectedFormWithFeedbacks?.feedbacks || []).filter(
        feedback => {
            const search = searchFeedback.toLowerCase()

            const emailMatch =
                feedback.sender_email?.toLowerCase().includes(search) ?? false

            const dateText = new Date(feedback.created_at)
                .toLocaleDateString()
                .toLowerCase()

            const dateSearchMatch = dateText.includes(search)

            const roleMatch =
                filterRole === "all" || feedback.role === filterRole

            const ratingMatch =
                filterRating === "all" || String(feedback.rating) === filterRating

            const dateMatch =
                !filterDate ||
                feedback.created_at.startsWith(filterDate)

            return (
                (emailMatch || dateSearchMatch) &&
                roleMatch &&
                ratingMatch &&
                dateMatch
            )
        }
    )

    useEffect(() => {
        if (selectedFormSlug) {
            localStorage.setItem(SELECTED_FORM_STORAGE_KEY, selectedFormSlug)
        } else {
            localStorage.removeItem(SELECTED_FORM_STORAGE_KEY)
        }
    }, [selectedFormSlug])

    useEffect(() => {
        if (selectedFormSlug) {
            setIsFeedbackSectionLoading(true)

            const timer = setTimeout(() => {
                setIsFeedbackSectionLoading(false)
            }, 3000)

            return () => clearTimeout(timer)
        } else {
            setIsFeedbackSectionLoading(false)
        }
    }, [selectedFormSlug])

    const showLoader = selectedFormSlug && (isFeedbackSectionLoading || isFeedbackLoading)

    const handleCloseFeedback = () => {
        setSelectedFormSlug(null)
    }

    const handleFormClick = (slug: string) => {
        setSelectedFormSlug(slug)
    }

    return (
        <>
            <div className="flex flex-col gap-6">

                <div className="flex justify-between items-center">
                    <div>
                        <SearchInput
                            value={searchForm}
                            onChange={setSearchForm}
                            placeholder="Search something..."
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            label="Add"
                            variant="amber"
                            size="md"
                            icon={<IconPlus size={17} />}
                            onClick={() => setIsAddOpen(true)}
                            disabled={createFormMutation.isPending}
                        />
                        <Button
                            label="Delete"
                            variant="red"
                            size="md"
                            icon={<IconTrash size={17} />}
                            onClick={() => {
                                setDeleteTarget({
                                    type: "forms",
                                    slugs: selectedRows.map(row => row.slug),
                                    count: selectedRows.length
                                })
                                setIsDeleteOpen(true)
                            }}
                            disabled={selectedRows.length === 0 || deleteFormMutation.isPending}
                        />
                    </div>
                </div>

                <FormsTable
                    data={filteredForms}
                    loading={isFormsLoading}
                    onSelectionChange={setSelectedRows}
                    onFormClick={handleFormClick}
                    isUpdating={updateFormMutation.isPending}
                    isDeleting={deleteFormMutation.isPending}
                    onEdit={(form) => {
                        setEditingForm(form)
                        setIsEditOpen(true)
                    }}
                    onDelete={(slug, title) => {
                        const deletePromise = new Promise((resolve, reject) => {
                            deleteFormMutation.mutate(slug, {
                                onSuccess: () => resolve(slug),
                                onError: reject
                            })
                        })

                        showToast.promise(deletePromise, {
                            loading: 'Deleting form...',
                            success: `"${title}" deleted successfully!`,
                            error: `Failed to delete "${title}"`
                        })

                        if (slug === selectedFormSlug) {
                            handleCloseFeedback()
                        }
                    }}
                />
            </div>

            {selectedFormWithFeedbacks && (
                <div className="mt-10">
                    {showLoader ? (
                        <div className="flex items-center justify-center py-24">
                            <IconLoader2
                                size={30}
                                stroke={2}
                                className="animate-spin text-blue-500 mb-4"
                            />
                        </div>
                    ) : feedbackError ? (
                        <div className="flex items-center justify-center py-8">
                            <span className="text-[#222831] text-base tracking-normal">Something went wrong.</span>
                        </div>
                    ) : selectedFormWithFeedbacks ? (
                        <div className="flex flex-col gap-6">

                            <div className="flex justify-end mb-2">
                                <button
                                    className="p-2 bg-white border 
                                    border-[#222831]/10 text-[#222831] rounded-xl 
                                    hover:bg-gray-50 cursor-pointer"
                                    onClick={handleCloseFeedback}
                                >
                                    <IconX stroke={2} size={16} />
                                </button>
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-medium text-[#222831] tracking-normal">
                                    {selectedFormWithFeedbacks.title}
                                    <span className="ml-3 text-sm font-normal text-gray-500">
                                        ({selectedFormWithFeedbacks.slug})
                                    </span>
                                </h2>
                                <div className="flex gap-2">

                                    <button
                                        className="
                                            bg-white border border-[#222831]/10 rounded-xl 
                                            p-2
                                            text-sm text-[#222831] tracking-normal
                                            focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                                            transition-all duration-300
                                            cursor-pointer
                                        "
                                        onClick={() => setIsShareOpen(true)}
                                        disabled={!selectedFormSlug}
                                        title="Open public feedback form and qr code"
                                    >
                                        <IconShare3 size={18} stroke={2} />
                                    </button>

                                    <button
                                        className="
                                            bg-white border border-[#222831]/10 rounded-xl 
                                            p-2
                                            text-sm text-[#222831] tracking-normal
                                            focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                                            transition-all duration-300
                                            cursor-pointer
                                        "
                                        onClick={() => setIsExportOpen(true)}
                                        disabled={!selectedFormSlug}
                                        title="Export feedback data"
                                    >
                                        <IconDownload size={18} stroke={2} />
                                    </button>

                                </div>
                            </div>

                            <div className="flex items-center justify-between">

                                <div className="flex gap-2 flex-wrap">
                                    <SearchInput
                                        value={searchFeedback}
                                        onChange={setSearchFeedback}
                                        placeholder="Search something..."
                                    />

                                    <select
                                        value={filterRole}
                                        onChange={(e) => setFilterRole(e.target.value)}
                                        className="
                                            bg-white border border-[#222831]/10 rounded-full 
                                            px-4 py-2 
                                            text-sm text-[#222831] tracking-normal
                                            focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                                            transition-all duration-300
                                            cursor-pointer
                                        "
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="staff">Staff</option>
                                        <option value="student">Student</option>
                                        <option value="guest">Teacher</option>
                                    </select>

                                    <select
                                        value={filterRating}
                                        onChange={(e) => setFilterRating(e.target.value)}
                                        className="
                                            bg-white border border-[#222831]/10 rounded-full 
                                            px-4 py-2 
                                            text-sm text-[#222831] tracking-normal
                                            focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                                            transition-all duration-300
                                            cursor-pointer
                                        "
                                    >
                                        <option value="all">All Ratings</option>
                                        {[5, 4, 3, 2, 1].map(r => (
                                            <option key={r} value={r}>{r} ★</option>
                                        ))}
                                    </select>

                                    <input
                                        type="date"
                                        value={filterDate}
                                        onChange={(e) => setFilterDate(e.target.value)}
                                        className="
                                            bg-white border border-[#222831]/10 rounded-full 
                                            px-4 py-2 
                                            text-sm text-[#222831] tracking-normal
                                            focus:bg-amber-100 focus:outline-none focus:border-amber-100 
                                            transition-all duration-300
                                            cursor-pointer
                                        "
                                    />

                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        label="Summarize"
                                        variant="amber"
                                        size="md"
                                        icon={isSummarizing || isPolling ? <IconLoader2 className="animate-spin" size={17} /> : <IconPencil size={17} />}
                                        onClick={handleSummarize}
                                        disabled={
                                            selectedFeedbacks.length === 0 ||
                                            isSummarizing ||
                                            isPolling
                                        }
                                    />
                                    <Button
                                        label="Delete"
                                        variant="red"
                                        icon={<IconTrash size={17} />}
                                        size="md"
                                        onClick={() => {
                                            // showToast("Feature coming soon!", "info")
                                        }}
                                        disabled={selectedFeedbacks.length === 0}
                                    />
                                </div>
                            </div>

                            <FeedbackTable
                                data={filteredFeedbacks}
                                loading={isFeedbackLoading || isFeedbackSectionLoading}
                                onSelectionChange={setSelectedFeedbacks}
                                selectedRows={selectedFeedbacks}
                                onReply={(id) => {
                                    alert(`Reply to feedback #${id} – implement modal/email here`)
                                    // TODO: open reply modal, send email, etc.
                                }}
                                onDelete={(id) => {
                                    if (confirm("Delete this feedback?")) {
                                        // TODO: call your deleteFeedbackMutation.mutate(id)
                                        alert(`Delete feedback #${id}`)
                                    }
                                }}

                            />
                        </div>
                    ) : null}
                </div>
            )}

            {summarizeError && (
                <div className="mt-12 p-6 bg-red-50 border border-red-200 rounded-2xl text-red-800">
                    Failed to generate summary: {summarizeErrorMsg || "Unknown error"}
                </div>
            )}

            {summary && selectedFormSlug && (
                <SummaryTab
                    summary={summary}
                    slug={selectedFormSlug}  
                    isLoading={isSummarizing}
                    isPolling={isPolling}
                />
            )}

            {selectedFormSlug && selectedFormWithFeedbacks && (
                <ShareFormDialog
                    isOpen={isShareOpen}
                    onClose={() => setIsShareOpen(false)}
                    title={selectedFormWithFeedbacks.title}
                    publicUrl={getPublicFormUrl(selectedFormSlug)}
                    qrCodeUrl={getQrCodeUrl(selectedFormSlug)}
                />
            )}

            {selectedFormWithFeedbacks && selectedFormSlug && (
                <ExportDialog
                    isOpen={isExportOpen}
                    onClose={() => setIsExportOpen(false)}
                    formTitle={selectedFormWithFeedbacks.title}
                    responseCount={selectedFormWithFeedbacks.feedbacks?.length || 0}
                    formSlug={selectedFormSlug} 
                />
            )}

            <DeleteDialog
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={deleteTarget.titles ?? (selectedRows[0]?.title || "this form")}
                count={deleteTarget.count}
                isDeleting={deleteFormMutation.isPending}
            />

            <AddFormModal
                isOpen={isAddOpen}
                onClose={() => setIsAddOpen(false)}
                isSubmitting={createFormMutation.isPending}
                onSubmit={(data) => {
                    const createPromise = new Promise<void>((resolve, reject) => {
                        createFormMutation.mutate(data, {
                            onSuccess: () => {
                                resolve()
                            },
                            onError: (error) => {
                                reject(error)
                            },
                        })
                    })

                    showToast.promise(createPromise, {
                        loading: "Creating form...",
                        success: "Form created successfully!",
                        error: (err) => {
                            console.error("Create form error:", err)
                            return "Failed to create form. Please try again."
                        },
                    })
                }}
            />

            <EditFormModal
                isOpen={isEditOpen}
                onClose={() => {
                    setIsEditOpen(false)
                    setEditingForm(null)
                }}
                initialData={editingForm ? {
                    title: editingForm.title,
                    description: editingForm.description,
                    submission_preference_enabled: editingForm.submission_preference_enabled,
                    role_selection_enabled: editingForm.role_selection_enabled,
                    rating_enabled: editingForm.rating_enabled,
                    suggestions_enabled: editingForm.suggestions_enabled,
                } : null}
                isSubmitting={updateFormMutation.isPending}
                onSubmit={(data) => {
                    if (!editingForm) return
                    updateFormMutation.mutate({
                        slug: editingForm.slug,
                        data
                    })
                }}
            />
        </>

    )
}

