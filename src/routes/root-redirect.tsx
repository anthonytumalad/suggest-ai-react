import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import { ToastProvider } from '../components/toast/toast-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoute from './app-route'
import '../styles/index.css'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <QueryClientProvider client={queryClient}>
                <ToastProvider />
                <AppRoute />
            </QueryClientProvider>
        </HashRouter>
    </StrictMode>
)