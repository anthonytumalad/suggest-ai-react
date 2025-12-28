import axios from "axios"
import type { AxiosInstance } from 'axios'

const API = "https://suggest-ai.on-forge.com"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
})

export { axiosInstance }