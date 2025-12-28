import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { feedbackService } from "../services/feedback-service"
import type { 
    SummarizeResponse, 
    FeedbackSummary, 
    UseSummarizeFeedbackResult 
} from "../utilities/interfaces/feedback-interface"

function useSummarizeFeedback(): UseSummarizeFeedbackResult {
    const queryClient = useQueryClient()

    const mutation = useMutation<
        SummarizeResponse,
        Error,
        string[]
    >({
        mutationFn: feedbackService.summarizeFeedback,
        onSuccess: (data) => {
            if (data.success && data.data) {
                queryClient.setQueryData<FeedbackSummary>(['summary', 'latest'], data.data)
            }
        },
    })

    const pollQuery = useQuery<SummarizeResponse, Error>({
        queryKey: ['summary', 'status', mutation.data?.job_id],
        queryFn: async (): Promise<SummarizeResponse> => {
            const statusUrl = mutation.data?.status_url
            const jobId = mutation.data?.job_id

            if (!jobId || !statusUrl) {
                throw new Error("Missing job ID or status URL")
            }

            const response = await fetch(statusUrl)
            if (!response.ok) {
                throw new Error(`Status check failed: ${response.status}`)
            }
            return response.json() as Promise<SummarizeResponse>
        },
        enabled: !!mutation.data?.job_id && mutation.data?.message?.includes("background"),
        refetchInterval: (query) => {
            const data = query.state.data
            if (data?.status === 'completed' || data?.success === false) {
                return false 
            }
            return 3000 
        },
        
    })

    useEffect(() => {
        if (pollQuery.data?.success && pollQuery.data?.data) {
            queryClient.setQueryData<FeedbackSummary>(['summary', 'latest'], pollQuery.data.data)
        }
    }, [pollQuery.data, queryClient])

    const summary = queryClient.getQueryData<FeedbackSummary | null>(['summary', 'latest']) ?? null

    const isPolling = pollQuery.isFetching
    const jobId = mutation.data?.job_id ?? null

    const isLoading = mutation.isPending || pollQuery.isFetching
    const isError = mutation.isError || pollQuery.isError
    const error = 
        mutation.error?.message ??
        pollQuery.error?.message ??
        mutation.data?.error ??
        pollQuery.data?.error ??
        null

    const summarize = (feedbacks: string[]) => {
        mutation.mutate(feedbacks)
    }

    const reset = () => {
        queryClient.removeQueries({ queryKey: ['summary'] })
        mutation.reset()
        queryClient.removeQueries({ queryKey: ['summary', 'status'] })
    }

    return {
        summarize,
        summary,
        isLoading,
        isError,
        error,
        isPolling,
        jobId,
        reset,
    }   
}

export { useSummarizeFeedback }