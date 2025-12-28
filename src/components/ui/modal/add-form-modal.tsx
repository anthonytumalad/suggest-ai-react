import type React from "react"
import { useState } from "react"
import { Modal } from "./modal"
import { Button } from "../button/button"
import type { CreateFormData } from "../../../utilities/interfaces/form-interface"

interface AddFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: CreateFormData) => void;
    isSubmitting?: boolean
}

const AddFormModal: React.FC<AddFormModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting
}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [submissionPreferenceEnabled, setSubmissionPreferenceEnabled] = useState(true)
    const [roleSelectionEnabled, setRoleSelectionEnabled] = useState(true)
    const [ratingEnabled, setRatingEnabled] = useState(true)
    const [suggestionsEnabled, setSuggestionsEnabled] = useState(true)

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

        setTitle("")
        setDescription("")
        setSubmissionPreferenceEnabled(true)
        setRoleSelectionEnabled(true)
        setRatingEnabled(true)
        setSuggestionsEnabled(true)
        onClose()

        console.log({
            title: title.trim(),
            description: description.trim() || null,
            submission_preference_enabled: submissionPreferenceEnabled,
            role_selection_enabled: roleSelectionEnabled,
            rating_enabled: ratingEnabled,
            suggestions_enabled: suggestionsEnabled
        });
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Feedback Form"
            size="xl"
            footer={
                <>
                    <Button
                        label="Cancel"
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                    />
                    <Button
                        label="Create Form"
                        variant="amber"
                        size="md"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title.trim()}
                        loading={isSubmitting}
                    />
                </>
            }
        >
            <div className="space-y-2">
                {/* Title & Description Section */}
                <div className="bg-white border border-[#222831]/15 rounded-2xl overflow-hidden">
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col gap-3">
                            <label htmlFor="title" className="text-base text-[#222831] font-medium tracking-normal">
                                Form Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                id="title"
                                name="title"
                                className="
                                text-base text-[#222831] tracking-normal font-semibold 
                                py-2.5 w-full 
                                border-b border-[#222831]/10 bg-white
                                focus:bg-none focus:outline-none
                                transition-all duration-300 appearance-none 
                                "
                                placeholder="e.g., End of Semester Faculty Feedback"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label htmlFor="description" className="text-base text-[#222831] font-medium tracking-normal">
                                Description <span className="text-gray-500 text-sm font-normal">(Optional)</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={4}
                                name="description"
                                id="description"
                                className="
                                text-base text-[#545454]  tracking-normal 
                                w-full 
                                border-b border-[#222831]/10 bg-white
                                focus:bg-none focus:outline-none
                                transition-all duration-300 appearance-none 
                            "
                                placeholder="Provide context or instructions for respondents..."
                            />
                        </div>
                    </div>
                </div>

                {/* Form Fields Configuration */}
                <div className="bg-white border border-[#222831]/15 rounded-2xl overflow-hidden">
                    <div className="p-6 space-y-6">
                        <h3 className="text-base font-semibold text-[#222831] tracking-normal">
                            Form Fields Configuration
                        </h3>
                        <p className="text-sm text-[#545454] tracking-normal">
                            Choose which fields will be available to respondents
                        </p>

                        {/* Toggle Sections */}
                        <div className="space-y-4">
                            {/* Submission Preference Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831] tracking-normal">
                                        Submission Preference
                                    </h4>
                                    <p className="text-sm text-[#545454] tracking-normal mt-1">
                                        Allow respondents to choose anonymous or identified submission
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSubmissionPreferenceEnabled(!submissionPreferenceEnabled)}
                                    className={`
                                        relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors
                                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
                                        ${submissionPreferenceEnabled
                                            ? 'bg-amber-400'
                                            : 'bg-gray-200'
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            shadow-sm ${submissionPreferenceEnabled ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>

                            {/* Role Selection Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831] tracking-normal">
                                        Role Selection
                                    </h4>
                                    <p className="text-sm text-[#545454] tracking-normal mt-1">
                                        Require respondents to specify their role (Student/Teacher/Staff)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setRoleSelectionEnabled(!roleSelectionEnabled)}
                                    className={`
                                        relative inline-flex h-6 w-11 items-center cursor-pointer rounded-full transition-colors
                                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
                                        ${roleSelectionEnabled
                                            ? 'bg-amber-400'
                                            : 'bg-gray-200'
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            shadow-sm ${roleSelectionEnabled ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>

                            {/* Rating Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831] tracking-normal">
                                        Overall Experience Rating
                                    </h4>
                                    <p className="text-sm text-[#545454] tracking-normal mt-1">
                                        Include 5-star rating system (Very Positive to Very Negative)
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setRatingEnabled(!ratingEnabled)}
                                    className={`
                                        relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors
                                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2
                                        ${ratingEnabled
                                            ? 'bg-amber-400'
                                            : 'bg-gray-200'
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            shadow-sm ${ratingEnabled ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>

                            {/* Suggestions Toggle */}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-[#222831]/10">
                                <div>
                                    <h4 className="text-base font-medium text-[#222831] tracking-normal">
                                        Suggestions Field
                                    </h4>
                                    <p className="text-sm text-[#545454] tracking-normal mt-1">
                                        Add optional suggestions textarea for improvement ideas
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSuggestionsEnabled(!suggestionsEnabled)}
                                    className={`
                                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                                        focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer
                                        ${suggestionsEnabled
                                            ? 'bg-amber-400'
                                            : 'bg-gray-200'
                                        }
                                    `}
                                >
                                    <span
                                        className={`
                                            inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                                            shadow-sm ${suggestionsEnabled ? 'translate-x-6' : 'translate-x-1'}
                                        `}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-white p-6 border border-[#222831]/15 rounded-lg shadow-sm">
                    <ul className="list-disc pl-5 text-[#222831] text-sm font-normal space-y-2 tracking-normal">
                        <li>All forms require <span className="font-medium">Overall Feedback</span> field</li>
                        <li>Fields marked as <span className="text-red-500 font-medium">*</span> are required for respondents</li>
                        <li>You can edit these settings later from the form dashboard</li>
                    </ul>
                </div>
            </div>
        </Modal>
    )
}

export { AddFormModal }