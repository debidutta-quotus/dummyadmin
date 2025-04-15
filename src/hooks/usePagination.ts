// usePagination.ts (or usePagination.tsx)

import { useState } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
}: UsePaginationProps): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
    setCurrentPage,
  };
};
