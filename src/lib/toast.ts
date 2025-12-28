import toast from 'react-hot-toast'

type ToastMessage = string | ((err: any) => string)

const showToast = {
    success: (message: string) => {
        return toast.success(message)
    },
    error: (message: string) => {
        return toast.error(message)
    },
    loading: (message: string) => {
        return toast.loading(message)
    },
    promise: <T>(promise: Promise<T>, messages: { loading: string; success: string; error: ToastMessage }) => {
        return toast.promise(promise, messages)
    },
    custom: (message: string) => {
        return toast(message)
    },
    dismiss: (toastId?: string) => {
        toast.dismiss(toastId)
    }
}

export { showToast }