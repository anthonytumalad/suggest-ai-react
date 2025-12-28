import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { formService } from "../services/form-service"
import type { Form, CreateFormData, UpdateFormData } from "../utilities/interfaces/form-interface"


function useForms() {
    const queryClient = useQueryClient()

    const { data: forms, isLoading: isFormsLoading, error: formsError } = useQuery<Form[], Error>({
        queryKey: ['forms'],
        queryFn: () => formService.getAll(),
    })

    const useForm = (slug: string) => {
        return useQuery<Form, Error>({
            queryKey: ['form', slug],
            queryFn: () => formService.getBySlug(slug),
            enabled: !!slug,
        })
    }

    const useFormWithFeedbacks = (slug: string) => {
        return useQuery<Form, Error>({
            queryKey: ['form', slug, 'feedbacks'],
            queryFn: () => formService.getBySlugWithFeedbacks(slug),
            enabled: !!slug,
        })
    }

    const createFormMutation = useMutation<Form, Error, CreateFormData>({
        mutationFn: (data) => formService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forms'] })
        },
    })

    const updateFormMutation = useMutation<Form, Error, { slug: string; data: UpdateFormData }>({
        mutationFn: ({ slug, data }) => formService.update(slug, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forms'] })
        },
    })

    const deleteFormMutation = useMutation<void, Error, string>({
        mutationFn: (slug) => formService.delete(slug),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forms'] })
        },
    })

    return {
        forms,
        isFormsLoading,
        formsError,
        useForm,
        useFormWithFeedbacks,
        createFormMutation,
        updateFormMutation,
        deleteFormMutation,
    }
}

export { useForms }