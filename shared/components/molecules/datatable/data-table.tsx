'use client';

import React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  SortDirection,
  useReactTable,
  Row, // Ajout de Row
} from '@tanstack/react-table';

import { DataTablePagination } from '@/shared/components/molecules/datatable/data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTableToolbar } from './data-table-toolbar';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: {
    total: number;
    totalPages: number;
  };
  search: string | null;
  sortBy: string | null;
  sortDir: SortDirection | null;
  page: number | null;
  pageSize: number | null;
  filter?: ColumnFiltersState | null;
  onSearchChange: (search: string | null) => void;
  onSortByChange: (sort: string | null) => void;
  onSortDirChange: (sort: SortDirection | null) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (page: number) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
  isLoading: boolean;
  isError: boolean;
  renderRowActions?: (row: Row<TData>) => React.ReactNode;
  // Ajout pour bulk selection
  rowSelection?: Record<string, boolean>;
  onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  search,
  sortBy,
  sortDir,
  page,
  pageSize,
  filter,
  onSearchChange,
  onSortByChange,
  onSortDirChange,
  onPageChange,
  onPageSizeChange,
  onFilterChange,
  isLoading,
  renderRowActions,
  rowSelection,
  onRowSelectionChange,
}: DataTableProps<TData, TValue>) {
  const sort: ColumnSort[] = sortBy && sortDir ? [{ id: sortBy, desc: sortDir === 'desc' }] : [];

  // Patch: prevent infinite rerender with nuqs by only calling setters if value changes
  const safeOnSearchChange = React.useCallback(
    (value: string | null) => {
      if (search !== value) onSearchChange(value);
    },
    [search, onSearchChange]
  );

  const safeOnSortByChange = React.useCallback(
    (value: string | null) => {
      if (sortBy !== value) onSortByChange(value);
    },
    [sortBy, onSortByChange]
  );

  const safeOnSortDirChange = React.useCallback(
    (value: SortDirection | null) => {
      if (sortDir !== value) onSortDirChange(value);
    },
    [sortDir, onSortDirChange]
  );

  const safeOnPageChange = React.useCallback(
    (newPage: number) => {
      if (page !== newPage) onPageChange(newPage);
    },
    [page, onPageChange]
  );

  const safeOnPageSizeChange = React.useCallback(
    (newSize: number) => {
      if (pageSize !== newSize) onPageSizeChange(newSize);
    },
    [pageSize, onPageSizeChange]
  );

  const table = useReactTable({
    data,
    columns,
    getRowId: (row) => String((row as { id?: string | number }).id ?? ''),
    state: {
      globalFilter: search ?? '',
      columnFilters: filter ?? [],
      pagination: {
        pageIndex: (page ?? 1) - 1,
        pageSize: pageSize ?? 10,
      },
      rowSelection: rowSelection ?? {},
    },
    onRowSelectionChange,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    pageCount: meta.totalPages,
    rowCount: meta.total,
    onGlobalFilterChange: (updater) => {
      const value = typeof updater === 'function' ? updater(search || '') : updater;
      safeOnSearchChange(value);
    },
    onSortingChange: (updater) => {
      const value = typeof updater === 'function' ? updater(sort || []) : updater;
      safeOnSortByChange(value.length ? value[0].id : null);
      safeOnSortDirChange(value.length ? (value[0].desc ? 'desc' : 'asc') : null);
    },
    onColumnFiltersChange: (updater) => {
      const value = typeof updater === 'function' ? updater(filter || []) : updater;
      onFilterChange?.(value);
    },
    onPaginationChange: (updater) => {
      const safePage = page ?? 1;
      const safePageSize = pageSize ?? 10;
      const value =
        typeof updater === 'function' ? updater({ pageIndex: safePage - 1, pageSize: safePageSize }) : updater;
      safeOnPageChange(value.pageIndex + 1);
      safeOnPageSizeChange(value.pageSize);
    },
    debugAll: false,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // On insère la colonne d'action enfant juste avant la colonne Actions (si présente)
                  const isBeforeActions = renderRowActions && header.id === 'actions';
                  return (
                    <React.Fragment key={header.id}>
                      {isBeforeActions && <TableHead className='w-[250px]'> </TableHead>}
                      <TableHead
                        colSpan={header.colSpan}
                        style={{ width: header.getSize(),  textTransform: 'uppercase' }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    </React.Fragment>
                  );
                })}
                {/* Si pas de colonne Actions, on ajoute la colonne enfant à la fin */}
                {renderRowActions && !table.getHeaderGroups()[0].headers.some(h => h.id === 'actions') && <TableHead> </TableHead>}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (renderRowActions ? 1 : 0)}
                  className="h-24 text-center"
                >
                  No result.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                // On insère la cellule d'action enfant juste avant la cellule Actions (si présente)
                const cells = row.getVisibleCells();
                const actionsIdx = cells.findIndex(cell => cell.column.id === 'actions');
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {cells.map((cell, idx) => (
                      <React.Fragment key={cell.id}>
                        {renderRowActions && idx === actionsIdx && <TableCell>{renderRowActions(row)}</TableCell>}
                        <TableCell>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      </React.Fragment>
                    ))}
                    {/* Si pas de colonne Actions, on ajoute la colonne enfant à la fin */}
                    {renderRowActions && actionsIdx === -1 && <TableCell>{renderRowActions(row)}</TableCell>}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
