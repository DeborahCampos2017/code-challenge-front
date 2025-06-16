"use client";

import { useMemo, useState } from "react";
import { SortField, SortOrder, User } from "../types";

export const useFiltersAndSort = (users: User[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('full_name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = users.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [users, searchTerm, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    sortField,
    sortOrder,
    filteredAndSortedUsers,
    handleSort,
  };
};
