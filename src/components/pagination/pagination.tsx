import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

interface PaginationProps {
    page: number;
    totalPages: number;
    pageSize: number;
    pageSizeOptions: number[];
    onPageChange: (page: number) => void;
    onPageSizeChange: (pageSize: number) => void;
}

function Pagination({
    page,
    totalPages,
    pageSize,
    pageSizeOptions,
    onPageChange,
    onPageSizeChange
}: PaginationProps) {

    const getPaginationRange = () => {
        const maxPagesToShow = 5;
        const half = Math.floor(maxPagesToShow / 2);

        let start = Math.max(1, page - half);
        let end = Math.min(totalPages, page + half);

        if (end - start + 1 < maxPagesToShow) {
            if (start === 1) {
                end = Math.min(totalPages, start + maxPagesToShow - 1);
            } else if (end === totalPages) {
                start = Math.max(1, totalPages - maxPagesToShow + 1);
            }
        }

        const range = [];
        for (let i = start; i <= end; i++) range.push(i);
        return { start, end, range };
    }

    const { start, end, range } = getPaginationRange()

    return (
        <div className="flex items-center justify-between px-3 py-6">
            <div className="flex items-center gap-2.5">
                <label className="text-sm text-[#222831] tracking-normal">
                    Rows per page:
                </label>
                <select
                    className="px-4 py-1 cursor-pointer text-sm rounded border border-[#222831]/15"
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                >
                    {pageSizeOptions.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                    className="px-3 py-1 rounded disabled:opacity-80 cursor-pointer"
                >
                    <IconChevronLeft stroke={2} size={18} color="#222831" />
                </button>
                {start > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-3 py-1 rounded text-sm hover:bg-amber-50"
                        >
                            1
                        </button>
                        {start > 2 && (
                            <span className="px-3 py-1 text-[14px]">…</span>
                        )}
                    </>
                )}
                {range.map((num) => (
                    <button
                        key={num}
                        onClick={() => onPageChange(num)}
                        className={`px-3 py-1 rounded text-sm text-[#222831] cursor-pointer ${num === page
                            ? "bg-amber-100 font-medium"
                            : "hover:bg-amber-100"
                            }`}
                    >
                        {num}
                    </button>
                ))}
                {end < totalPages && (
                    <>
                        {end < totalPages - 1 && (
                            <span className="px-3 py-1 text-[14px]">…</span>
                        )}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="px-3 py-1 rounded text-[14px] hover:bg-amber-100"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded disabled:opacity-80"
                >
                    <IconChevronRight stroke={2} size={18} color="#222831" />
                </button>
            </div>
        </div>
    )
}

export { Pagination }