import React from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  goToPage,
}) => {
  return (
    <div className="pagination-container">
      <button onClick={prevPage} className="pagination-btn" disabled={currentPage === 1}>
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
        const pageNum = i + 1;

        return (
          <button
            key={pageNum}
            onClick={() => goToPage(pageNum)}
            className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
          >
            {pageNum}
          </button>
        );
      })}

      {totalPages > 5 && (
        <>
          <span className="pagination-dots">...</span>

          <button
            onClick={() => goToPage(totalPages)}
            className={`pagination-btn ${currentPage === totalPages ? 'active' : ''}`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button onClick={nextPage} className="pagination-btn" disabled={currentPage === totalPages}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
