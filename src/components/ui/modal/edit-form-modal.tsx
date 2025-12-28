import type React from "react"
import { useState, useEffect } from "react"
import { Modal } from "./modal"
import { Button } from "../button/button"

interface EditFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: {
        title: string
        description?: string | null
        submission_preference_enabled: boolean
        role_selection_enabled: boolean
        rating_enabled: boolean
        suggestions_enabled: boolean
    }) => void
    initialData: {
        title: string
        description: string | null
        submission_preference_enabled: boolean
        role_selection_enabled: boolean
        rating_enabled: boolean
        suggestions_enabled: boolean
    } | null
    isSubmitting?: boolean
}

const EditFormModal: React.FC<EditFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    isSubmitting
}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [submissionPreferenceEnabled, setSubmissionPreferenceEnabled] = useState(true)
    const [roleSelectionEnabled, setRoleSelectionEnabled] = useState(true)
    const [ratingEnabled, setRatingEnabled] = useState(true)
    const [suggestionsEnabled, setSuggestionsEnabled] = useState(true)

    // Pre-fill form when modal opens or data changes
    useEffect(() => {
        if (initialData && isOpen) {
            setTitle(initialData.title)
            setDescription(initialData.description || "")
            setSubmissionPreferenceEnabled(initialData.submission_preference_enabled)
            setRoleSelectionEnabled(initialData.role_selection_enabled)
            setRatingEnabled(initialData.rating_enabled)
            setSuggestionsEnabled(initialData.suggestions_enabled)
        }
    }, [initialData, isOpen])

    // Reset when closing (optional but clean)
    const handleClose = () => {
        setTitle("")
        setDescription("")
        setSubmissionPreferenceEnabled(true)
        setRoleSelectionEnabled(true)
        setRatingEnabled(true)
        setSuggestionsEnabled(true)
        onClose()
    }

    const handleSubmit = () => {
        if (!title.trim()) return

        onSubmit({
            title: title.trim(),
            description: description.trim() || null,
            submission_preference_enabled: submissionPreferenceEnabled,
            role_selection_enabled: roleSelectionEnabled,
            rating_enabled: ratingEnabled,
            suggestions_enabled: suggestionsEnabled
        })

        handleClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Edit Feedback Form"
            size="xl"
            footer={
                <>
                    <Button
                        label="Cancel"
                        variant="ghost"
                        size="sm"
                        onClick={handleClose}
                    />
                    <Button
                        label="Update Form"
                        variant="amber"
                        size="md"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title.trim()}
                        loading={isSubmitting}
                    />
                </>
            }
        >
            <div className="space-y-6">
                {/* Title & Description */}
                <div className="bg-white border border-[#222831]/15 rounded-2xl overflow-hidden">
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="title" className="text-base text-[#222831] font-medium">
                                Form Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="text-base font-semibold py-2.5 w-full border-b border-[#222831]/10 bg-transparent focus:outline-none"
                                placeholder="e.g., End of Semester Faculty Feedback"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label htmlFor="description" className="text-base text-[#222831] font-medium">
                                Description <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="text-base text-[#545454] w-full border-b border-[#222831]/10 bg-transparent focus:outline-none resize-none"
                                placeholder="Provide context or instructions for respondents..."
                            />
                        </div>
                    </div>
                </div>

                {/* Form Fields Configuration */}
                <div className="bg-white border border-[#222831]/15 rounded-2xl overflow-hidden">
                    <div className="p-6 space-y-6">
                        <h3 className="text-base font-semibold text-[#222831]">
                            Form Fields Configuration
                        </h3>
                        <p className="text-sm text-[#545454]">
                            Choose which fields will be available to respondents
                        </p>

                        <div className="space-y-4">
                            {/* 1. Submission Preference */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831]">Submission Preference</h4>
                                    <p className="text-sm text-[#545454] mt-1">
                                        Allow respondents to choose anonymous or identified submission
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSubmissionPreferenceEnabled(!submissionPreferenceEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${submissionPreferenceEnabled ? "bg-amber-600" : "bg-gray-300"
                                        }`}
                                    aria-pressed={submissionPreferenceEnabled}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${submissionPreferenceEnabled ? "translate-x-6" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* 2. Role Selection */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831]">Role Selection</h4>
                                    <p className="text-sm text-[#545454] mt-1">
                                        Require respondents to specify their role (Student/Teacher/Staff)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setRoleSelectionEnabled(!roleSelectionEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${roleSelectionEnabled ? "bg-amber-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${roleSelectionEnabled ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                            </div>

                            {/* 3. Overall Rating */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831]">Overall Experience Rating</h4>
                                    <p className="text-sm text-[#545454] mt-1">
                                        Include 5-star rating system (Very Positive to Very Negative)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setRatingEnabled(!ratingEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${ratingEnabled ? "bg-amber-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${ratingEnabled ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                            </div>

                            {/* 4. Suggestions Field */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831]">Suggestions Field</h4>
                                    <p className="text-sm text-[#545454] mt-1">
                                        Add optional textarea for improvement suggestions
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSuggestionsEnabled(!suggestionsEnabled)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${suggestionsEnabled ? "bg-amber-600" : "bg-gray-300"
                                        }`}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${suggestionsEnabled ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                    <ul className="list-disc pl-5 text-sm text-[#222831] space-y-2">
                        <li>Changing the <strong>title</strong> will automatically update the form URL (slug)</li>
                        <li>All forms require the <strong>Overall Feedback</strong> text field</li>
                        <li>You can toggle any feature on or off at any time</li>
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

export { EditFormModal }