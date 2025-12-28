import axios from "axios"
import type { AxiosInstance } from 'axios'


const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://suggest-ai.on-forge.com',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

export { axiosInstance }