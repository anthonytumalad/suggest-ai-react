import axios from "axios"
import type { AxiosInstance, AxiosError } from 'axios'


const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://suggest-ai.on-forge.com',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
})

axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (axios.isAxiosError(error)) {
            const message = (error.response?.data as { message?: string })?.message;
            if (error.response?.status === 404) {
                return Promise.reject(new Error('Resource not found'));
            }
            return Promise.reject(new Error(message || 'An API error occurred'));
        }
        return Promise.reject(new Error('An unexpected error occurred'));
    }
)

export { axiosInstance }