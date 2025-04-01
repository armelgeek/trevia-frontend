"use client";
import { useQueryState } from 'nuqs';
import { parseAsArrayOf, parseAsString } from 'nuqs/server';
import { useEffect, useState } from 'react';

type FilterField<T> = {
    name: string;
    field: keyof T;
    multiple?: boolean;
};

type SortConfig = {
    field: string;
    defaultValue?: string;
    options?: { label: string; value: string }[];
};

type FilterConfig<T> = {
    searchFields?: (keyof T)[];
    showSearch?: boolean;
    filterFields?: FilterField<T>[];
    sortConfig?: SortConfig;
    data: T[];
};

export const useFilter = <T extends Record<string, any>>(config: FilterConfig<T>) => {
    const {
        searchFields = [],
        showSearch = true,
        filterFields = [],
        sortConfig,
        data
    } = config;

    const [search, setSearch] = useQueryState('q', { defaultValue: '' });
    const [sortType, setSortType] = useQueryState('sort', {
        defaultValue: sortConfig?.defaultValue || 'relevant'
    });
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [isFiltering, setIsFiltering] = useState(false);

    const filterStates = filterFields.reduce((acc, field) => {
        const [value, setValue] = useQueryState(
            field.name,
            field.multiple ? parseAsArrayOf(parseAsString) : { defaultValue: '' }
        );
        acc[field.name] = {
            value,
            setValue
        };
        return acc;
    }, {} as Record<string, {
        value: string | string[] | null,
        setValue: (value: string | string[] | null) => void
    }>);

    const applyFilter = async () => {
        if (!data || data.length === 0) return;

        setIsFiltering(true);

        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating async operation

        let dataCopy = data.slice();

        // Apply search filter across multiple fields
        if (showSearch && search && searchFields.length > 0) {
            const searchTerm = search.toLowerCase().trim();
            dataCopy = dataCopy.filter((item: T) =>
                searchFields.some(field =>
                    String(item[field])?.toLowerCase().includes(searchTerm)
                )
            );
        }

        // Apply all configured filters
        for (const filterField of filterFields) {
            const filterState = filterStates[filterField.name];
            if (filterState?.value) {
                if (Array.isArray(filterState.value)) {
                    // Handle multiple selection filters
                    dataCopy = dataCopy.filter((item) =>
                        filterState.value?.includes(String(item[filterField.field]))
                    );
                } else {
                    // Handle single selection filters
                    dataCopy = dataCopy.filter((item) =>
                        String(item[filterField.field]) === filterState.value
                    );
                }
            }
        }

        setFilteredData(dataCopy);
        setIsFiltering(false);
    };

    const sortData = async () => {
        if (filteredData.length === 0 || !sortConfig?.field) return;

        setIsFiltering(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        const sortedData = [...filteredData];

        switch (sortType) {
            case 'low-high':
                sortedData.sort((a, b) => {
                    const aValue = a[sortConfig.field];
                    const bValue = b[sortConfig.field];
                    return typeof aValue === 'number' && typeof bValue === 'number'
                        ? aValue - bValue
                        : String(aValue).localeCompare(String(bValue));
                });
                break;
            case 'high-low':
                sortedData.sort((a, b) => {
                    const aValue = a[sortConfig.field];
                    const bValue = b[sortConfig.field];
                    return typeof aValue === 'number' && typeof bValue === 'number'
                        ? bValue - aValue
                        : String(bValue).localeCompare(String(aValue));
                });
                break;
            default:
                await applyFilter();
                return;
        }

        setFilteredData(sortedData);
        setIsFiltering(false);
    };

    useEffect(() => {
        applyFilter();
    }, [search, showSearch, data, ...Object.values(filterStates).map(state => state.value)]);

    useEffect(() => {
        sortData();
    }, [sortType]);

    return {
        filteredData,
        sortType,
        search,
        setSearch,
        setSortType,
        isFiltering,
        filters: filterStates
    };
};