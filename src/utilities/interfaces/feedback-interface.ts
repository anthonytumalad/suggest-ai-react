export interface Feedback {
    id: number;
    feedback: string;
    role: string;
    rating: number;
    suggestions?: string | null;
    is_anonymous: boolean;
    is_read: boolean;
    created_at: string;
    sender_email: string | null;
    sender_avatar: string | null;
}

export interface ExportResponse {
    success: boolean
    message?: string
    data?: string  
    error?: string
}

export interface TopicModelingItem {
    topic_name: string;
    keyphrases: string[];
    sentiment: "positive" | "negative" | "neutral" | "mixed";
    average_rating: number;
    summary: string;
    frequency: number;
}

export interface OverallSentiment {
    overall_sentiment: "Positive" | "Mostly Positive" | "Mixed" | "Mostly Negative" | "Negative";
    sentiment_score: number;
    average_rating: number;
    rating_distribution: {
        1: number;
        2: number;
        3: number;
        4: number;
        5: number;
    };
    positive_aspects: string[];
    negative_aspects: string[];
    suggestions_summary: string;
}

export interface KeyphraseItem {
    phrase: string;
    frequency: number;
    sentiment: "positive" | "negative" | "neutral";
    sources: "feedback" | "suggestions" | "both";
}

export interface FeedbackSummary {
    topic_modeling: TopicModelingItem[];
    overall_sentiment: OverallSentiment;
    keyphrase_extraction: KeyphraseItem[];
    role_insights: string;
    language_notes: string;
    comprehensive_summary: string;

    summary?: string; 
    model: string;
    feedback_count: number;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface SummarizeResponse {
    success: boolean;
    data: FeedbackSummary | null;
    error: string | null;
    model?: string | null;
    message?: string | null;
    job_id?: string | null        
    status_url?: string | null     
    status?: 'processing' | 'completed'  
}

export interface UseSummarizeFeedbackResult {
    summarize: (feedbacks: string[]) => void
    summary: FeedbackSummary | null
    isLoading: boolean
    isError: boolean
    error: string | null
    isPolling: boolean
    jobId: string | null
    reset: () => void
}