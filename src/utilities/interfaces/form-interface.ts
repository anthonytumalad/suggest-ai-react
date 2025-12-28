import type { Feedback } from "./feedback-interface";

export interface Form {
    id: number;
    title: string;
    description: string | null;
    slug: string;
    is_active: boolean;
    is_read: boolean;
    submission_preference_enabled: boolean;
    role_selection_enabled: boolean;
    rating_enabled: boolean;
    suggestions_enabled: boolean;
    created_at: string;
    updated_at: string;
    total_feedbacks: number;
    new_feedbacks: number;
    feedbacks?: Feedback[];
}

export interface CreateFormData {
    title: string;
    description?: string | null;
    submission_preference_enabled?: boolean;
    role_selection_enabled?: boolean;
    rating_enabled?: boolean;
    suggestions_enabled?: boolean;

}

export interface UpdateFormData {
    title?: string;
    description?: string | null;
    is_active?: boolean;
    submission_preference_enabled?: boolean;
    role_selection_enabled?: boolean;
    rating_enabled?: boolean;
    suggestions_enabled?: boolean;
}