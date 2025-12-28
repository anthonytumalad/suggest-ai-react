import { axiosInstance } from '../lib/axios'
import { API_ENDPOINTS } from './api'
import type { User } from "../utilities/interfaces/auth-interface"

export class AuthService {

    async login( email: string, password: string ): Promise<User> {
        const response = await axiosInstance.post<{ 
            message: string
            user: User
            token: string
        }>(
            API_ENDPOINTS.auth.login, 
            { email, password },
        )

        const { user, token } = response.data

        localStorage.setItem('auth_token', token)

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return user
    }

    async logout(): Promise<void> {
        try {
            await axiosInstance.post(API_ENDPOINTS.auth.logout)
        } finally {
            localStorage.removeItem('auth_token')
            delete axiosInstance.defaults.headers.common['Authorization']
        }
    }

    async getCurrentUser(): Promise<User | null> {
        try {
            const response = await axiosInstance.get<{ user: User }>(
                API_ENDPOINTS.auth.me
            )
            return response.data.user
        } catch (error: any) {
            if (error.response?.status === 401) {
                localStorage.removeItem('auth_token')
                return null
            }
            throw error
        }
    }

}

export const authService = new AuthService()