import { useState, useEffect, useMemo } from 'react'
import {
    IconTriangleInverted,
    IconTriangleFilled,
    IconLoader2,
    IconFileOff
}
    from '@tabler/icons-react'
import type { DataTableProps } from '../../utilities/interfaces/table-interface'
import { Pagination } from '../pagination/pagination'

function DataTable<T extends { id: number | string }>({
    data,
    columns,
    search = '',
    loading = false,
    error = '', onSelectionChange,
    pageSizeOptions = [15, 30, 40],
    selectedRows,                         
}: DataTableProps<T>) {
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState(pageSizeOptions[0])
    const [sortField, setSortField] = useState<keyof T | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const controlledSelectedIds = useMemo(() => {
        return selectedRows ? selectedRows.map(row => row.id) : undefined
    }, [selectedRows])

    const [internalSelectedIds, setInternalSelectedIds] = useState<(number | string)[]>([])

    const selectedIds = controlledSelectedIds ?? internalSelectedIds

    const handleSort = (field: keyof T) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('asc')
        }
    }

    const handleSelect = (id: number | string) => {
        let newSelectedIds: (number | string)[];

        if (selectedIds.includes(id)) {
            newSelectedIds = selectedIds.filter(selectedId => selectedId !== id)
        } else {
            newSelectedIds = [...selectedIds, id]
        }

        if (!controlledSelectedIds) {
            setInternalSelectedIds(newSelectedIds)
        }

        if (onSelectionChange) {
            const selectedRowsData = data.filter(entry => newSelectedIds.includes(entry.id));
            onSelectionChange(selectedRowsData)
        }
    }

    const handleSelectAll = () => {
        let newSelectedIds: (number | string)[]
        if (selectedIds.length === data.length && data.length > 0) {
            newSelectedIds = []
        } else {
            newSelectedIds = data.map(entry => entry.id)
        }

        if (!controlledSelectedIds) {
            setInternalSelectedIds(newSelectedIds)
        }

        if (onSelectionChange) {
            const selectedRowsData = newSelectedIds.length > 0 ? data : []
            onSelectionChange(selectedRowsData)
        }
    }

    const filteredData = useMemo(() => {
        return data.filter((entry) =>
            columns.some((col) => {
                if (col.key in entry) {
                    const value = entry[col.key as keyof T]
                    return value?.toString().toLowerCase().includes(search.toLowerCase())
                }
                return false
            })
        )
    }, [data, columns, search])

    const sortedData = useMemo(() => {
        if (!sortField) return filteredData;
        return [...filteredData].sort((a, b) => {
            const aValue = a[sortField] ?? ''
            const bValue = b[sortField] ?? ''
            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
            return 0
        });
    }, [filteredData, sortField, sortOrder])

    useEffect(() => {
        setPage(1);
    }, [search, pageSize])

    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize)

    const totalPages = Math.ceil(filteredData.length / pageSize)


    const renderSortIcon = (field: keyof T) => {
        if (sortField === field) {
            return sortOrder === 'asc' ? (
                <IconTriangleFilled size={10} className="inline-block ml-1" />
            ) : (
                <IconTriangleInverted size={10} className="inline-block ml-1" />
            )
        }
        return <IconTriangleInverted size={10} className="inline-block ml-1 opacity-50" />
    }

    if (error) {
        return (
            <div className="text-center py-4 text-red-500">
                Error: {error}
            </div>
        )
    }

    return (
        <>
            <div className='overflow-hidden rounded-2xl shadow-sm bg-white'>

                <table className='table-auto w-full border-collapse'>

                    <thead className='border-b border-[#222831]/10'>
                        <tr className='w-full'>
                            <th className='relative th-split-border pl-4 py-3 pr-6 text-start w-[2%]'>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.length === data.length && data.length > 0}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            {columns.map((col) => (
                                <th
                                    key={col.key as string}
                                    className={`
                                    relative th-split-border text-sm px-3 py-3 text-[#222831] tracking-normal text-start cursor-pointer ${col.width || ''}
                                `}
                                    onClick={() => {
                                        if (col.key in (data[0] || {})) {
                                            handleSort(col.key as keyof T)
                                        }
                                    }}
                                >
                                    <div className='flex justify-between items-center w-full'>
                                        <span>{col.label}</span>
                                        {col.key in (data[0] || {}) && renderSortIcon(col.key as keyof T)}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className='py-8'
                                >
                                    <div className='flex items-center justify-center'>
                                        <IconLoader2 size={22} stroke={2} className='animate-spin text-blue-400' />
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                >
                                    <div className='flex items-center justify-center py-8 text-[#545454] gap-2.5 border-b border-[#222831]/10'>
                                        <IconFileOff stroke={2} size={20} />
                                        <span className='text-sm tracking-normal font-medium'>
                                            No data available.
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, i) => {
                                const isSelected = selectedIds.includes(row.id)

                                return (
                                    <tr
                                        key={row.id}
                                        className={`
                                        ${isSelected ? 'bg-amber-50' : i % 2 === 0 ? '' : ''} hover:bg-amber-50 transition-colors duration-150 border-b border-[#222831]/10
                                    `}
                                    >
                                        <td className='px-4 py-4 tracking-normal text-sm text-[#222831]'>
                                            <input
                                                type="checkbox"
                                                name=""
                                                id=""
                                                checked={selectedIds.includes(row.id)}
                                                onChange={() => handleSelect(row.id)}
                                            />
                                        </td>
                                        {columns.map((col) => (
                                            <td
                                                className={`
                                                pr-4 pl-3 py-4 tracking-normal text-sm text-[#222831] 
                                                ${col.key === 'feedback' ? 'wrap-break-words max-w-[220px] pr-10' : ''}
                                            `}
                                                key={col.key as string}
                                            >
                                                {col.render
                                                    ? col.render(row[col.key as keyof T], row)
                                                    : (row[col.key as keyof T] as React.ReactNode)
                                                }
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })
                        )}
                    </tbody>

                </table>

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    pageSizeOptions={pageSizeOptions}
                    onPageChange={(newPage) => setPage(newPage)}
                    onPageSizeChange={(newSize) => setPageSize(newSize)}

                />

            </div>
        </>
    )
}

export { DataTable }