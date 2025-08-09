"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const startEntry = (currentPage - 1) * itemsPerPage + 1;
  const endEntry = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
      <div className="text-sm text-gray-500">
        Menampilkan {startEntry} - {endEntry} dari {totalItems} data
      </div>

      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className="p-2 border rounded-md text-[#341B6E] border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 border rounded-md transition ${
              currentPage === page
                ? "bg-[#341B6E] text-white"
                : "text-[#341B6E] border-blue-300 bg-white hover:bg-blue-50"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-md text-[#341B6E] border-blue-300 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
