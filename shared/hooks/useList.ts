import { useState, useCallback, useEffect, useMemo } from 'react';

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface FilterConfig {
  [key: string]: unknown;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}

export interface ListConfig<T> {
  data: T[];
  initialSort?: SortConfig;
  initialFilters?: FilterConfig;
  initialPageSize?: number;
  searchFields?: (keyof T)[];
  sortableFields?: (keyof T)[];
  filterableFields?: (keyof T)[];
}

export interface UseListReturn<T> {
  // Data
  items: T[];
  filteredItems: T[];
  paginatedItems: T[];
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Sort
  sortConfig: SortConfig | null;
  sortBy: (key: string) => void;
  
  // Filters
  filters: FilterConfig;
  setFilter: (key: string, value: unknown) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  
  // Pagination
  pagination: PaginationConfig;
  goToPage: (page: number) => void;
  setPageSize: (size: number) => void;
  
  // Selection
  selectedItems: T[];
  selectItem: (item: T) => void;
  deselectItem: (item: T) => void;
  selectAll: () => void;
  deselectAll: () => void;
  isSelected: (item: T) => boolean;
  
  // State
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export function useList<T extends Record<string, unknown>>(config: ListConfig<T>): UseListReturn<T> {
  const [items, setItems] = useState<T[]>(config.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(config.initialSort || null);
  const [filters, setFilters] = useState<FilterConfig>(config.initialFilters || {});
  const [pagination, setPagination] = useState<PaginationConfig>({
    page: 1,
    pageSize: config.initialPageSize || 10,
    total: config.data.length,
  });
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  // Update items when config.data changes
  useEffect(() => {
    setItems(config.data);
    setPagination(prev => ({ ...prev, total: config.data.length }));
  }, [config.data]);

  // Search functionality
  const searchedItems = useMemo(() => {
    if (!searchQuery || !config.searchFields?.length) return items;
    
    const query = searchQuery.toLowerCase();
    return items.filter(item =>
      config.searchFields!.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(query);
      })
    );
  }, [items, searchQuery, config.searchFields]);

  // Filter functionality
  const filteredItems = useMemo(() => {
    if (Object.keys(filters).length === 0) return searchedItems;
    
    return searchedItems.filter(item => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (filterValue === undefined || filterValue === null || filterValue === '') return true;
        
        const itemValue = item[key];
        
        // Handle different filter types
        if (Array.isArray(filterValue)) {
          return filterValue.includes(itemValue);
        }
        
        if (typeof filterValue === 'string') {
          return String(itemValue).toLowerCase().includes(filterValue.toLowerCase());
        }
        
        return itemValue === filterValue;
      });
    });
  }, [searchedItems, filters]);

  // Sort functionality
  const sortedItems = useMemo(() => {
    if (!sortConfig) return filteredItems;
    
    return [...filteredItems].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === bValue) return 0;
      
      // Handle different types for comparison
      let result = 0;
      
      // Convert to strings for comparison if needed
      const aStr = String(aValue || '');
      const bStr = String(bValue || '');
      
      // Try numeric comparison first
      const aNum = Number(aValue);
      const bNum = Number(bValue);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        result = aNum < bNum ? -1 : aNum > bNum ? 1 : 0;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        result = aValue.getTime() < bValue.getTime() ? -1 : aValue.getTime() > bValue.getTime() ? 1 : 0;
      } else {
        result = aStr.localeCompare(bStr);
      }
      
      return sortConfig.direction === 'desc' ? result * -1 : result;
    });
  }, [filteredItems, sortConfig]);

  // Pagination functionality
  const paginatedItems = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, pagination.page, pagination.pageSize]);

  // Update pagination total when filtered items change
  useEffect(() => {
    setPagination(prev => ({
      ...prev,
      total: sortedItems.length,
      page: Math.min(prev.page, Math.ceil(sortedItems.length / prev.pageSize) || 1),
    }));
  }, [sortedItems.length, pagination.pageSize]);

  // Sorting functions
  const sortBy = useCallback((key: string) => {
    if (!config.sortableFields?.includes(key as keyof T)) return;
    
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null; // Remove sort
    });
  }, [config.sortableFields]);

  // Filter functions
  const setFilter = useCallback((key: string, value: unknown) => {
    if (!config.filterableFields?.includes(key as keyof T)) return;
    
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  }, [config.filterableFields]);

  const removeFilter = useCallback((key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Pagination functions
  const goToPage = useCallback((page: number) => {
    const maxPage = Math.ceil(sortedItems.length / pagination.pageSize) || 1;
    setPagination(prev => ({
      ...prev,
      page: Math.max(1, Math.min(page, maxPage)),
    }));
  }, [sortedItems.length, pagination.pageSize]);

  const setPageSize = useCallback((size: number) => {
    setPagination(prev => ({
      ...prev,
      pageSize: size,
      page: 1, // Reset to first page
    }));
  }, []);

  // Selection functions
  const selectItem = useCallback((item: T) => {
    setSelectedItems(prev => {
      if (prev.find(selected => selected === item)) return prev;
      return [...prev, item];
    });
  }, []);

  const deselectItem = useCallback((item: T) => {
    setSelectedItems(prev => prev.filter(selected => selected !== item));
  }, []);

  const selectAll = useCallback(() => {
    setSelectedItems([...paginatedItems]);
  }, [paginatedItems]);

  const deselectAll = useCallback(() => {
    setSelectedItems([]);
  }, []);

  const isSelected = useCallback((item: T) => {
    return selectedItems.includes(item);
  }, [selectedItems]);

  return {
    // Data
    items,
    filteredItems: sortedItems,
    paginatedItems,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Sort
    sortConfig,
    sortBy,
    
    // Filters
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    
    // Pagination
    pagination: {
      ...pagination,
      total: sortedItems.length,
    },
    goToPage,
    setPageSize,
    
    // Selection
    selectedItems,
    selectItem,
    deselectItem,
    selectAll,
    deselectAll,
    isSelected,
    
    // State
    loading,
    setLoading,
  };
}
