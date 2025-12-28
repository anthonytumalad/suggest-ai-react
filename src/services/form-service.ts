import { axiosInstance } from "../lib/axios"
import { API_ENDPOINTS } from "./api"
import type { Form, CreateFormData, UpdateFormData } from "../utilities/interfaces/form-interface"

export class FormService {

    async getAll(): Promise<Form[]> {
        const response = await axiosInstance.get<Form[]>(API_ENDPOINTS.forms.list)
        return response.data
    }

    async getBySlug(slug: string): Promise<Form> {
        const response = await axiosInstance.get<Form>(API_ENDPOINTS.forms.show(slug))
        return response.data
    }

    async getBySlugWithFeedbacks(slug: string): Promise<Form> {
        const response = await axiosInstance.get<Form>(API_ENDPOINTS.forms.feedbacks(slug))
        return response.data
    }
    
    async create(data: CreateFormData): Promise<Form> {
        const response = await axiosInstance.post<{ message: string; form: Form }>(
            API_ENDPOINTS.forms.store,
            data
        )
        return response.data.form
    }

    async update(slug: string, data: UpdateFormData): Promise<Form> {
        const response = await axiosInstance.put<{ message: string; form: Form }>(
            API_ENDPOINTS.forms.update(slug),
            data
        )
        return response.data.form
    }

    async delete(slug: string): Promise<void> {
        await axiosInstance.delete(API_ENDPOINTS.forms.destroy(slug))
    }
}

export const formService = new FormService()