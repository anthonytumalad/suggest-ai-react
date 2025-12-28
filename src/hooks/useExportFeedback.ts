import { useMutation } from "@tanstack/react-query"
import { feedbackService } from "../services/feedback-service"
import { showToast } from "../lib/toast"

type ExportFormat = 'csv' | 'excel' | 'pdf' | 'clipboard'

interface UseExportFeedbackParams {
    slug: string
    onSuccess?: (data: string | undefined) => void
    onError?: (error: string) => void
}

export const useExportFeedback = (params: UseExportFeedbackParams) => {
    const { slug, onSuccess, onError } = params
    
    if (!slug) {
        throw new Error("slug is required for useExportFeedback")
    }

    return useMutation({
        mutationFn: (format: ExportFormat) =>
            feedbackService.exportFeedback(slug, format),

        onSuccess: (response) => {
            if (response.success) {
                if (response.data) {
                    navigator.clipboard.writeText(response.data)
                    showToast.success('Copied to clipboard!')
                } else {
                    showToast.success(response.message || 'Download started!')
                }
                onSuccess?.(response.data)
            }
        },

        onError: (error: any) => {
            const message = error?.error || 'Export failed'
            showToast.error(message)
            onError?.(message)
        },
    })
}

