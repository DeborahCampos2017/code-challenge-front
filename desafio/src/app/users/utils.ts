import { PaginationInfo } from "./types";

export const generatePageNumbers = (pagination: PaginationInfo): number[] => {
  const pages: number[] = [];
  const { totalPages, currentPage } = pagination;
  
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(-1, totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, -1);
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, -1);
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push(-1, totalPages);
    }
  }
  
  return pages;
};

export const getCurrentPageItems = <T,>(items: T[], pagination: PaginationInfo): T[] => {
  const { currentPage, itemsPerPage } = pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return items.slice(startIndex, endIndex);
};

export const THEME_COLOR = '#ff4d4d';
export const THEME_COLOR_HOVER = '#e60000';
export const THEME_COLOR_ACTIVE = '#cc0000';

export const ITEMS_PER_PAGE_OPTIONS = [
  { value: '5', label: '5 por página' },
  { value: '10', label: '10 por página' },
  { value: '25', label: '25 por página' },
  { value: '50', label: '50 por página' },
];
