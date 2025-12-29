export const API_ENDPOINTS = {
    auth: {
        login: '/api/login',
        register: '/api/register',
        me: '/api/me',
        logout: '/api/logout'
    },
    forms: {
        list: '/api/forms',
        show: (slug: string) => `/api/forms/${slug}`,
        store: '/api/forms/store',
        update: (slug: string) => `/api/forms/update/${slug}`,
        destroy: (slug: string) => `/api/forms/delete/${slug}`,
        feedbacks: (slug: string) => `/api/forms/${slug}/feedbacks`,
        export: (slug: string, format: 'csv' | 'excel' | 'pdf' | 'clipboard') => 
            `/api/forms/${slug}/export/${format}`,
        saveSummary: (slug: string) => `/api/forms/${slug}/summary`,
        charts: (slug: string) => `/api/feedback-summary/${slug}/chart`
    },
    grok: {
        analyze: '/api/summarize-feedback',
    }
} as const