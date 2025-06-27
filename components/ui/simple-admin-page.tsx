'use client';
import { useQueryState, parseAsInteger, parseAsStringEnum } from 'nuqs';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { DynamicForm } from '@/components/ui/dynamic-form';
import { createDynamicColumns } from '@/lib/admin-generator';
import { useAdminEntity } from '@/hooks/use-admin-entity';
import { Plus, EllipsisVertical } from 'lucide-react';
import type { AdminConfigWithServices } from '@/lib/admin-generator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ZodType } from 'zod';

type ChildConfig = {
  route: string;
  label?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
};

interface SimpleAdminPageProps<T extends Record<string, unknown>> {
  config: AdminConfigWithServices<T>;
  schema: ZodType<T>;
  className?: string;
  renderFilters?: () => React.ReactNode;
  filters?: Record<string, string | number | undefined>;
}

// Ajout d'un type pour la propriété optionnelle parseData (legacy)
interface AdminConfigWithLegacyParse<T extends Record<string, unknown>> extends AdminConfigWithServices<T> {
  parseData?: (item: Record<string, unknown>) => T;
}

// Type pour une bulk action personnalisée
interface BulkAction {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onClick: (ids: string[]) => Promise<void> | void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
}

// Extension de la config admin pour bulkActions personnalisées
interface AdminConfigWithBulkActions<T extends Record<string, unknown>> extends AdminConfigWithLegacyParse<T> {
  bulkActions?: BulkAction[];
}

interface SimpleAdminPageProps<T extends Record<string, unknown>> {
  config: AdminConfigWithServices<T>;
  schema: ZodType<T>;
  className?: string;
  renderFilters?: () => React.ReactNode;
  filters?: Record<string, string | number | undefined>;
}

export function SimpleAdminPage<T extends Record<string, unknown>>({
  config,
  schema,
  renderFilters,
  filters,
}: SimpleAdminPageProps<T>) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});


  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const [sortBy, setSortBy] = useQueryState('sortBy', { defaultValue: '' });
  const [sortDir, setSortDir] = useQueryState('sortDir',
    parseAsStringEnum(['asc', 'desc']).withDefault('asc')
  );
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(10));


  const params = useParams();
  let parentId: string | undefined = undefined;
  if ('parent' in config && config.parent && typeof config.parent === 'object' && 'routeParam' in config.parent) {
    const paramValue = params?.[config.parent.routeParam as string];
    parentId = Array.isArray(paramValue) ? paramValue[0] : paramValue;
  }

  if (!config.services) {
    throw new Error(`Services not configured for ${config.title}. Please add services to your config or use the regular AdminPage component.`);
  }

  if (!config.queryKey) {
    throw new Error(`QueryKey not configured for ${config.title}. Please add queryKey to your config.`);
  }

  const pickFields = (data: Record<string, unknown>, fields: (string | number)[]) =>
    Object.fromEntries(fields.map((key: string | number) => [key, data[key]]));


  const {
    data: items,
    meta,
    isLoading,
    error,
    create,
    update,
    delete: deleteItem,
    isCreating,
    isUpdating
  } = useAdminEntity({
    config,
    customServices: config.services,
    queryKey: config.queryKey,
    onSuccess: {
      create: () => setIsCreateOpen(false),
      update: () => setEditingItem(null),
      delete: () => setDeletingItem(null),
    },
    filters,
    parentId,
  });

  const handleCreate = async (data: Record<string, unknown>) => {
    const filtered = pickFields(data, config.formFields ?? []);
    try {
      await create(filtered as T);
    } catch (error) {
      console.error('Error in handleCreate:', error);
      throw error;
    }
  };

  const handleUpdate = async (data: Record<string, unknown>) => {
    if (!editingItem) {
      console.error('No editing item found');
      return;
    }
    const id = (editingItem as Record<string, unknown>).id as string;
    const filtered = pickFields(data, config.formFields ?? []);
    try {
      await update(id, filtered as T);
    } catch (error) {
      console.error('Error in handleUpdate:', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    const id = (deletingItem as Record<string, unknown>).id as string;
    await deleteItem(id);
  };

  // --- Fix: Handlers for DataTable search/sort to accept null ---
  const handleSearchChange = (v: string | null) => setSearch(v ?? '');
  const handleSortByChange = (v: string | null) => setSortBy(v ?? '');
  const handleSortDirChange = (v: 'asc' | 'desc' | null) => setSortDir(v ?? 'asc');

  // Widen the type to allow React.ReactNode for cell rendering
  type TableColumn = {
    accessorKey: string;
    header: string;
    cell?: ({ row }: { row: Row<T> }) => React.ReactNode;
    meta?: { className?: (...args: unknown[]) => string };
    size?: number;
    minSize?: number;
    maxSize?: number;
    enableSorting?: boolean;
    enableResizing?: boolean;
  };

  let columns: TableColumn[] = createDynamicColumns(
    config.fields,
    config.accessor
  ) as TableColumn[];

  const selectedRows = Object.keys(rowSelection).filter((id) => rowSelection[id]);

  const handleRowSelectionChange = (selection: Record<string, boolean>) => {
    setRowSelection(selection);
  };

  const handleBulkDelete = async () => {
    if (!selectedRows.length) return;
    for (const id of selectedRows) {
      await deleteItem(id);
    }
    setRowSelection({});
  };

  const hasBulkActions = !!config.actions?.bulk;
  if (hasBulkActions) {
    columns = [
      {
        accessorKey: '__select__',
        header: '',
        cell: ({ row }: { row: Row<T> }) => (
          <input
            type="checkbox"
            aria-label="Sélectionner la ligne"
            checked={row.getIsSelected?.()}
            onChange={() => row.toggleSelected?.()}
            className="accent-red-500 w-4 h-4 cursor-pointer"
          />
        ),
        meta: {
          className: () => 'text-center',
        },
        size: 32,
        minSize: 32,
        maxSize: 32,
        enableSorting: false,
        enableResizing: false,
      },
      ...columns,
    ];
  }

  const hasRowActions = !!(config.actions?.update || config.actions?.delete);
  if (hasRowActions) {
    columns = [
      ...columns,
      {
        accessorKey: '__actions__',
        header: 'Actions',
        cell: ({ row }: { row: Row<T> }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" aria-label="Actions">
                <EllipsisVertical className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {config.actions?.update && (
                <DropdownMenuItem onClick={() => {
                  let parsed: T | undefined;
                  const configTyped = config as AdminConfigWithLegacyParse<T>;
                  const parseFn = config.parseEditItem || configTyped.parseData;
                  if (parseFn) {
                    try {
                      const result = parseFn(row.original);
                      parsed = { ...row.original, ...result } as T;
                    } catch (e) {
                      console.error('parseEditItem/parseData error:', e, row.original);
                      return;
                    }
                  } else {
                    parsed = row.original as T;
                  }
                  setEditingItem(parsed!);
                }}>
                  Modifier
                </DropdownMenuItem>
              )}
              {config.actions?.delete && (
                <DropdownMenuItem onClick={() => setDeletingItem(row.original as T)}>
                  Supprimer
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        meta: {
          className: () => 'text-center',
        },
      },
    ];
  }


  const childrenArray: ChildConfig[] = Array.isArray(config.children)
    ? config.children
    : [];

  const hasChildren = childrenArray.length > 0;
  const renderChildrenActions = hasChildren
    ? (row: Row<T>) => {
      if (!row || !row.original) return null;
      const paramRegex = /:([a-zA-Z0-9_]+)/g;
      return React.createElement(
        'div',
        {
          className: 'flex flex-wrap gap-1',
          'aria-label': 'Actions enfants',
        },
        ...childrenArray.map((child: ChildConfig) => {
          let route = child.route;
          route = route.replace(paramRegex, (_: string, param: string) => {
            const value = row.original ? (row.original as Record<string, unknown>)[param] : undefined;
            return value ? String(value) : param;
          });
          const href = route.startsWith('/') ? `/admin${route}` : `/admin/${route}`;
          return React.createElement(
            'a',
            {
              key: child.route,
              href,
              className:
                'text-red-500 hover:underline font-medium whitespace-nowrap px-1 py-0.5 text-xs flex items-center rounded border border-red-100 bg-red-50 hover:bg-red-100 transition',
              style: { display: 'inline-block', minWidth: 0 },
              'aria-label': child.label || 'Gérer',
              tabIndex: 0,
            },
            child.icon &&
            React.createElement(
              'span',
              { className: 'text-base align-middle mr-1' },
              child.icon
            ),
            React.createElement(
              'span',
              { className: 'align-middle truncate max-w-[80px]' },
              child.label || 'Action'
            )
          );
        })
      );
    }
    : undefined;

  const showRowActions = !!(config.actions?.update || config.actions?.delete || hasChildren);


  const configWithBulk = config as AdminConfigWithBulkActions<T>;

  const itemsTyped = items as T[];
  const selectedIds = itemsTyped
    .filter((item) => rowSelection[(item as Record<string, unknown>).id as string])
    .map((item) => String((item as Record<string, unknown>).id));

  const renderBulkActionsBar = hasBulkActions && selectedIds.length > 0 ? (
    <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded px-4 py-2 mb-2 animate-in fade-in slide-in-from-top-2">
      <span className="text-sm text-red-700 font-medium">{selectedIds.length} sélectionné(s)</span>
      {config.actions?.bulk && config.actions?.delete && (
        <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
          Supprimer la sélection
        </Button>
      )}
      {configWithBulk.bulkActions?.map((action) => (
        <Button
          key={action.key}
          variant={action.variant || 'default'}
          size="sm"
          onClick={async () => {
            await action.onClick(selectedIds);
            setRowSelection({});
          }}
        >
          {action.icon && <span className="mr-1">{action.icon}</span>}
          {action.label}
        </Button>
      ))}
      <Button variant="ghost" size="sm" onClick={() => setRowSelection({})}>
        Annuler
      </Button>
    </div>
  ) : null;


  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 justify-between">
            <CardTitle className='text-red-500 text-lg'>{config.title}</CardTitle>
            {config.actions?.create && (
              <Sheet open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <SheetTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                  <SheetHeader>
                    <SheetTitle>Créer {config.title}</SheetTitle>
                    <SheetDescription>
                      Remplissez les informations pour créer un nouveau {config.title.toLowerCase()}.
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <DynamicForm
                      config={config}
                      schema={schema}
                      onCreate={handleCreate}
                      isSubmitting={isCreating}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
          {config.description && (
            <CardDescription>
              {config.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {renderFilters && renderFilters()}
          {renderBulkActionsBar}
          <DataTable
            columns={columns as ColumnDef<T, unknown>[]}
            data={itemsTyped}
            meta={meta || { total: itemsTyped.length, totalPages: 1 }}
            isLoading={isLoading}
            isError={!!error}
            search={search}
            sortBy={sortBy}
            sortDir={sortDir}
            onSearchChange={handleSearchChange}
            onSortByChange={handleSortByChange}
            onSortDirChange={handleSortDirChange}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
            onRowSelectionChange={handleRowSelectionChange}
            rowSelection={rowSelection}
            renderRowActions={showRowActions ? renderChildrenActions : undefined}
          />

          {editingItem && (
            <Sheet open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
              <SheetContent className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <SheetHeader>
                  <SheetTitle>Modifier {config.title}</SheetTitle>
                  <SheetDescription>
                    Modifiez les informations de ce {config.title.toLowerCase()}.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <DynamicForm
                    config={config}
                    schema={schema}
                    initialData={editingItem}
                    onUpdate={handleUpdate}
                    isSubmitting={isUpdating}
                  />
                </div>
              </SheetContent>
            </Sheet>
          )}

          {deletingItem && (
            <AlertDialog open={!!deletingItem} onOpenChange={() => setDeletingItem(null)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                  <AlertDialogDescription>
                    Êtes-vous sûr de vouloir supprimer ce {config.title.toLowerCase()} ?
                    Cette action est irréversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </CardContent>
      </Card>
    </>
  );
}
