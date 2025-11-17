interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxMiddle = 6;

    if (totalPages <= maxMiddle + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const start = Math.max(currentPage - Math.floor(maxMiddle / 2), 2);
    const end = Math.min(start + maxMiddle - 1, totalPages - 1);
    const adjustedStart = Math.max(end - maxMiddle + 1, 2);
    pages.push(1);
    if (adjustedStart > 2) pages.push("...");
    for (let i = adjustedStart; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination flex justify-center gap-2 mt-8 flex-wrap items-center">
      {/* previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md shadow-sm ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 hover:border-gray-500"
        }`}
      >
        Previous
      </button>
      {/* Page numbers */}
      {pageNumbers.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-3 py-2">
            ...
          </span>
        ) : (
          <button
            key={`page-${p}`}
            onClick={() => onPageChange(p as number)}
            className={`px-4 py-2 rounded-md shadow-sm ${
              p === currentPage
                ? "bg-blue-600 text-gray-400"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md shadow-sm ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300 hover:border-gray-500"
        }`}
      >
        Next
      </button>
    </div>
  );
};
