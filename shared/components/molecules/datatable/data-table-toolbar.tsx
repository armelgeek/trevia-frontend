'use client';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const globalFilter = table.getState().globalFilter as string;
  const setGlobalFilter = (value: string) => table.setGlobalFilter(value);

  return (
    <div className="flex items-center gap-2 py-2">
      <div className="relative w-full max-w-xs">
        <Input
          type="text"
          placeholder="Rechercher..."
          value={globalFilter ?? ''}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-8"
          aria-label="Recherche globale"
        />
        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
          <Search className="w-4 h-4" />
        </span>
      </div>
      {table.getState().globalFilter && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setGlobalFilter('')}
          aria-label="Effacer la recherche"
        >
          Effacer
        </Button>
      )}
    </div>
  );
}
