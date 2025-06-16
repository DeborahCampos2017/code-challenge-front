"use client";

import { useEffect, useState } from "react";
import { PaginationInfo } from "../types";

export const usePagination = (totalItems: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagination: PaginationInfo = {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return {
    pagination,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
