// hooks/useStudentSearch.js
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getStudentList } from '../services/studentService';
import { useDebounceCallback } from './useDebounce';

export const useStudentSearch = (initialFilters = {}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState('');
  
  const debouncedSearch = useDebounceCallback(searchInput, 2000);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['students', page, pageSize, filters, debouncedSearch],
    queryFn: () => getStudentList({
      page,
      per_page: pageSize,
      ...filters,
      search: debouncedSearch || undefined,
    }),
    placeholderData: (prev) => prev,
    staleTime: 30000,
  });

  const handleSearch = useCallback((value) => {
    setSearchInput(value);
    setPage(1); // Reset to first page
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage, newSize) => {
    setPage(newSize !== pageSize ? 1 : newPage);
    setPageSize(newSize);
  }, [pageSize]);

  return {
    // Data
    students: data?.data || [],
    total: data?.total || 0,
    
    // Loading states
    isLoading,
    isFetching,
    isSearching: searchInput !== debouncedSearch,
    
    // Search
    searchInput,
    debouncedSearch,
    handleSearch,
    
    // Filters
    filters,
    handleFilterChange,
    
    // Pagination
    page,
    pageSize,
    handlePageChange,
    
    // Error
    error,
  };
};