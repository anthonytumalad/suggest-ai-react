import { axiosInstance } from '../lib/axios'
import { API_ENDPOINTS } from './api'
import type { User } from "../utilities/interfaces/auth-interface"

export class AuthService {

    private csrfInitialized = false

    async init(): Promise<void> {
        if (!this.csrfInitialized) {
            try {
                await axiosInstance.get(API_ENDPOINTS.auth.csrf, { withCredentials: true })
                this.csrfInitialized = true
            } catch (error: any) {
                console.error('CSRF init failed:', error?.message ?? error)
                throw error
            }
        }
    }

    async login( email: string, password: string ): Promise<User> {
        try {
            await this.init()

            const response = await axiosInstance.post<{ message: string; user: User; }>(
                API_ENDPOINTS.auth.login, 
                { email, password },
                { withCredentials: true }
            )

            return response.data.user
        } catch (error: any) {
            console.error('Login failed:', error)
            throw error
        }
    }

    async logout(): Promise<void> {
        try {
            await axiosInstance.post(API_ENDPOINTS.auth.logout)
        } 
        finally {
            this.csrfInitialized = false
        }
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await axiosInstance.get<{ user: User }>(API_ENDPOINTS.auth.me);
            return response.data.user
        } catch (error: any) {
            if (error.response?.status === 401) {
                return null
            }
            throw error;
        }
    }

}

export const authService = new AuthService()