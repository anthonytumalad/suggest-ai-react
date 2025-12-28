import { axiosInstance } from "../lib/axios"
import { API_ENDPOINTS } from "./api"
import type { SummarizeResponse, ExportResponse } from "../utilities/interfaces/feedback-interface"

class FeedbackService {
    async summarizeFeedback(feedbacks: string[]): Promise<SummarizeResponse> {

        if (feedbacks.length === 0) {
            return {
                success: false,
                data: null,
                error: "No feedbacks provided",
                model: null,
                message: null,
                job_id: null,
                status_url: null,
            }
        }

        try {
            const response = await axiosInstance.post<SummarizeResponse>(
                API_ENDPOINTS.grok.analyze, { feedbacks }
            )

            return {
                success: response.data.success ?? false,
                data: response.data.data ?? null,
                error: response.data.error ?? null,
                model: response.data.model ?? null,
                message: response.data.message ?? null,
                job_id: response.data.job_id ?? null,
                status_url: response.data.status_url ?? null,
            }
        } catch (error: any) {
            console.error('Summarization failed:', error)

            return {
                success: false,
                data: null,
                error: error.response?.data?.error || error.message || 'Failed to summarize feedbacks',
                model: null,
                message: null,
                job_id: null,
                status_url: null,
            }
        }
    }

    async exportFeedback(
        slug: string,
        format: 'csv' | 'excel' | 'pdf' | 'clipboard'
    ): Promise<ExportResponse> {
        try {
            const apiUrl = API_ENDPOINTS.forms.export(slug, format);

            if (format === 'clipboard') {
                const response = await axiosInstance.get<{ data: string; message: string }>(apiUrl);
                return {
                    success: true,
                    message: response.data.message,
                    data: response.data.data,
                };
            }

            const response = await axiosInstance.get(apiUrl, {
                responseType: 'blob',
            });

            const disposition = response.headers['content-disposition'];
            let filename = `feedback-export.${format === 'excel' ? 'xlsx' : format}`;
            if (disposition) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match?.[1]) filename = match[1];
            }

            const blob = new Blob([response.data], {
                type: response.headers['content-type'] || 'application/octet-stream',
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            return {
                success: true,
                message: 'Download started'
            };
        } catch (error: any) {
            console.error('Export failed:', error);

            const message = error.response?.data?.error || error.message || 'Export failed';
            return {
                success: false,
                error: message,
            };
        }
    }

    async saveSummary(
        slug: string,
        summaryData: any,
        feedbackCount: number,
        model: string
    ): Promise<{ success: boolean; message: string; error?: string }> {
        try {
            const response = await axiosInstance.post(
                API_ENDPOINTS.forms.saveSummary(slug),
                {
                    summary_data: summaryData,
                    feedback_count: feedbackCount,
                    model: model,
                }
            );

            return {
                success: true,
                message: response.data.message || 'Summary saved successfully',
            };
        } catch (error: any) {
            console.error('Save summary failed:', error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                error.message ||
                'Failed to save summary';

            return {
                success: false,
                message,
                error: message,
            };
        }
    }
}

export const feedbackService = new FeedbackService()