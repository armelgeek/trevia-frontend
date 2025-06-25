'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { useTableParams } from '@/shared/hooks/use-table-params';
import { DynamicForm } from '@/components/ui/dynamic-form';
import { generateTableColumns } from '@/components/ui/dynamic-table';
import { toast } from 'sonner';
import type { AdminConfig } from '@/lib/admin-generator';
import { z } from 'zod';

interface AdminPageProps<T extends Record<string, unknown>> {
  config: AdminConfig;
  schema: z.ZodSchema<T>;
  fetchItems: () => Promise<{ data: T[]; meta?: { total: number; totalPages: number } }>;
  createItem: (data: T) => Promise<T>;
  updateItem: (id: string, data: Partial<T>) => Promise<T>;
  deleteItem: (id: string) => Promise<void>;
  queryKey: string[];
  className?: string;
}

export function AdminPage<T extends Record<string, unknown>>({
  config,
  schema,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  queryKey,
  className,
}: AdminPageProps<T>) {
  const queryClient = useQueryClient();
  const { tableProps } = useTableParams();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);

  const handleSearchChange = (search: string | null) => {
    tableProps.onSearchChange(search);
  };

  const handleSortByChange = (sortBy: string | null) => {
    tableProps.onSortByChange(sortBy);
  };

  const handleSortDirChange = (sortDir: 'asc' | 'desc' | null) => {
    tableProps.onSortDirChange(sortDir);
  };

  const handlePageChange = (page: number) => {
    tableProps.onPageChange(page.toString());
  };

  const handlePageSizeChange = (pageSize: number) => {
    tableProps.onPageSizeChange(pageSize.toString());
  };

  const { data: itemsResponse, isLoading } = useQuery({
    queryKey,
    queryFn: fetchItems,
  });

  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setIsCreateOpen(false);
      toast.success(`${config.title} créé avec succès`);
    },
    onError: (error) => {
      toast.error(`Erreur lors de la création : ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => updateItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setEditingItem(null);
      toast.success(`${config.title} modifié avec succès`);
    },
    onError: (error) => {
      toast.error(`Erreur lors de la modification : ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      setDeletingItem(null);
      toast.success(`${config.title} supprimé avec succès`);
    },
    onError: (error) => {
      toast.error(`Erreur lors de la suppression : ${error.message}`);
    },
  });

  const handleCreate = async (data: T) => {
    await createMutation.mutateAsync(data);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
  };

  const handleUpdate = async (data: T) => {
    if (!editingItem?.id) return;
    await updateMutation.mutateAsync({ 
      id: editingItem.id as string, 
      data 
    });
  };

  const handleDelete = (item: T) => {
    setDeletingItem(item);
  };

  const confirmDelete = async () => {
    if (!deletingItem?.id) return;
    await deleteMutation.mutateAsync(deletingItem.id as string);
  };

  const columns = generateTableColumns(config, handleEdit, handleDelete);

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-red-500 font-bold tracking-tight">
            {config.title}s
          </h1>
          {config.description && (
            <p className="text-muted-foreground mt-1 text-sm">
              {config.description}
            </p>
          )}
        </div>

        {config.actions.create && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter {config.title}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer {config.title}</DialogTitle>
                <DialogDescription>
                  Remplissez les informations pour créer un nouveau {config.title.toLowerCase()}.
                </DialogDescription>
              </DialogHeader>
              <DynamicForm
                config={config}
                schema={schema}
                onSubmit={(data: Record<string, unknown>) => handleCreate(data as T)}
                isSubmitting={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <DataTable
        columns={columns}
        data={itemsResponse?.data || []}
        meta={itemsResponse?.meta || { total: 0, totalPages: 0 }}
        isLoading={isLoading}
        isError={false}
        search={tableProps.search}
        sortBy={tableProps.sortBy}
        sortDir={tableProps.sortDir}
        page={tableProps.page}
        pageSize={tableProps.pageSize}
        onSearchChange={handleSearchChange}
        onSortByChange={handleSortByChange}
        onSortDirChange={handleSortDirChange}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier {config.title}</DialogTitle>
              <DialogDescription>
                Modifiez les informations de ce {config.title.toLowerCase()}.
              </DialogDescription>
            </DialogHeader>
            <DynamicForm
              config={config}
              schema={schema}
              initialData={editingItem}
              onSubmit={(data: Record<string, unknown>) => handleUpdate(data as T)}
              isSubmitting={updateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
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
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
