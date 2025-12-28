import { Toaster } from "react-hot-toast"

function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                duration: 4000,
                style: {
                    background: 'white',
                    color: '#222831',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                },
                className: '',
                success: {
                    duration: 4000,
                    icon: '✅',
                },
                error: {
                    duration: 4000,
                    icon: '❌',

                },
                loading: {
                    duration: Number.POSITIVE_INFINITY,
                },
            }}
        />   
    )
}

export { ToastProvider }