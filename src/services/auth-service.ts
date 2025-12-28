import { axiosInstance } from '../lib/axios'
import { API_ENDPOINTS } from './api'
import type { User } from "../utilities/interfaces/auth-interface"

export class AuthService {

    async login( email: string, password: string ): Promise<User> {
        const response = await axiosInstance.post<{ 
            message: string
            user: User
        }>(
            API_ENDPOINTS.auth.login, 
            { email, password },
            { withCredentials: true }
        )

        return response.data.user
    }

    async logout(): Promise<void> {
        await axiosInstance.post(
            API_ENDPOINTS.auth.logout,
            {},
            { withCredentials: true }
        )
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await axiosInstance.get<{ user: User }>(
                API_ENDPOINTS.auth.me,
                { withCredentials: true }
            )
            return response.data.user
        } catch (error: any) {
            if (error.response?.status === 401) {
                return null
            }
            throw error
        }
    }

}

export const authService = new AuthService()