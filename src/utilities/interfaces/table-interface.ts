import type { Form } from "./form-interface";

export interface Column<T> {
    key: keyof T | string;
    label: string;
    width?: string;
    render?: (value: any, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    search?: string;
    loading?: boolean;
    error?: string;
    onSelectionChange?: (selectedRows: T[]) => void; 
    pageSizeOptions?: number[];
    selectedRows?: T[];
}

export interface FormTableRow {
    id: number
    title: string
    slug: string
    newFeedback: number
    totalFeedback: number
}

export interface FormTableProps {
    data: Form[]
    loading: boolean
    onSelectionChange?: (selectedRows: any[]) => void
    onFormClick: (slug: string) => void
    onEdit: (form: Form) => void
    onDelete: (slug: string, name: string) => void
    isUpdating?: boolean
    isDeleting?: boolean
}
