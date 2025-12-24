import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Show max 7 pages at a time
  let displayPages = pages;
  if (totalPages > 7) {
    if (currentPage <= 4) {
      displayPages = [...pages.slice(0, 5), -1, totalPages];
    } else if (currentPage >= totalPages - 3) {
      displayPages = [1, -1, ...pages.slice(totalPages - 5)];
    } else {
      displayPages = [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded border border-[#00ff9c]/30 text-[#00ff9c] hover:bg-[#00ff9c]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {displayPages.map((page, index) => (
        page === -1 ? (
          <span key={`ellipsis-${index}`} className="text-gray-600 px-2">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-[40px] rounded border font-mono transition-all ${
              currentPage === page
                ? "bg-[#00ff9c] text-black border-[#00ff9c] shadow-[0_0_15px_rgba(0,255,156,0.3)]"
                : "border-[#00ff9c]/30 text-[#00ff9c] hover:bg-[#00ff9c]/10"
            }`}
          >
            {page}
          </button>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded border border-[#00ff9c]/30 text-[#00ff9c] hover:bg-[#00ff9c]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
