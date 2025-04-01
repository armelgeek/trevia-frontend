'use client';

import { ColumnDef } from '@tanstack/react-table';

import type { Category } from '@/features/category/config/category.type';

import { DataTableRowActions } from './data-table-row-actions';
import { DataTableColumnHeader } from '@/shared/components/molecules/datatable/data-table-column-header';

export const columns: ColumnDef<Category>[] = [
  {
    id: 'name',
    meta: 'Name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
      />
    ),
    cell: ({ row }) => {
      return <div className="flex w-full">{row.getValue('name')}</div>;
    },
  },
  {
    id: 'actions',
    maxSize: 75,
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
