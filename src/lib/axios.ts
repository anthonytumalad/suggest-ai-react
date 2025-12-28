import axios from "axios"
import type { AxiosInstance } from 'axios'

const getToken = (): string | null => {
    return localStorage.getItem('auth_token')
}

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token')
            delete axiosInstance.defaults.headers.common['Authorization']

            if (window.location.pathname !== '/login') {
                window.location.href = '/login'
            }
        }
        return Promise.reject(error)
    }
)

export { axiosInstance }