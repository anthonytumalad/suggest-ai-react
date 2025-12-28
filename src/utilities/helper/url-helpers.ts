export const buildPublicFormUrl = (slug: string, path: 'form' | 'qrcode'): string => {
    if (!slug) {
        throw new Error('Slug is required to build public URL')
    }

    const baseUrl = import.meta.env.VITE_API_URL

    if (!baseUrl) {
        console.warn('VITE_API_URL is not defined. Falling back to relative URL.')
        return `/tlc/${path}/${slug}`
    }

    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    return `${cleanBase}/tlc/${path}/${slug}`
}

export const getPublicFormUrl = (slug: string): string =>
    buildPublicFormUrl(slug, 'form')

export const getQrCodeUrl = (slug: string): string =>
    buildPublicFormUrl(slug, 'qrcode')