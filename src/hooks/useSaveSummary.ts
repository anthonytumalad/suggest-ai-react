import { useMutation, useQueryClient } from '@tanstack/react-query'
import { feedbackService } from '../services/feedback-service'

interface SaveSummaryVariables {
    slug: string;
    summaryData: any;
    feedbackCount: number;
    model: string;
}

export function useSaveSummary() {
    const queryClient = useQueryClient()

    return useMutation<
        { success: boolean; message: string },
        Error,
        SaveSummaryVariables
    >({
        mutationFn: ({ slug, summaryData, feedbackCount, model }) =>
            feedbackService.saveSummary(slug, summaryData, feedbackCount, model),

        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['summary', variables.slug] });
            queryClient.invalidateQueries({ queryKey: ['form', variables.slug] });

            console.log('Summary saved:', data.message);
        },

        onError: (error) => {
            console.error('Failed to save summary:', error);
        },
    })
}