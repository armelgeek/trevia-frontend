'use client';

import React, { useState } from 'react';
import { ZodType } from 'zod';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { DynamicForm } from '@/components/ui/dynamic-form';
import { generateTableColumns } from '@/components/ui/dynamic-table';
import { useAdminEntity } from '@/hooks/use-admin-entity';
import { Plus } from 'lucide-react';
import type { AdminConfigWithServices } from '@/lib/admin-generator';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface SimpleAdminPageProps<T extends Record<string, unknown>> {
  config: AdminConfigWithServices<T>;
  schema: ZodType<T>;
  className?: string;
}

export function SimpleAdminPage<T extends Record<string, unknown>>({
  config,
  schema,
}: SimpleAdminPageProps<T>) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);

  // Vérification que les services sont configurés
  if (!config.services) {
    throw new Error(`Services not configured for ${config.title}. Please add services to your config or use the regular AdminPage component.`);
  }

  if (!config.queryKey) {
    throw new Error(`QueryKey not configured for ${config.title}. Please add queryKey to your config.`);
  }

  // Utilisation du hook avec les services de la config
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
    apiEndpoint: '', // Non utilisé avec services custom
    queryKey: config.queryKey,
    onSuccess: {
      create: () => setIsCreateOpen(false),
      update: () => setEditingItem(null),
      delete: () => setDeletingItem(null),
    },
    // Services personnalisés
    customServices: config.services
  });

  // Handlers pour les actions CRUD
  const handleCreate = async (data: T) => {
    console.log('handleCreate called with:', data);
    try {
      console.log('Calling create function...');
      await create(data);
      console.log('Create function completed successfully');
    } catch (error) {
      console.error('Error in handleCreate:', error);
      throw error;
    }
  };

  const handleUpdate = async (data: T) => {
    console.log('handleUpdate called with:', data);
    if (!editingItem) {
      console.error('No editing item found');
      return;
    }
    const id = (editingItem as Record<string, unknown>).id as string;
    console.log('Updating item with ID:', id);
    try {
      console.log('Calling update function...');
      await update(id, data);
      console.log('Update function completed successfully');
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

  // Génération des colonnes de table
  const columns = generateTableColumns<T>(
    config,
    config.actions?.update ? setEditingItem : undefined,
    config.actions?.delete ? setDeletingItem : undefined
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 justify-between">
            <CardTitle className='text-red-500 text-lg'>{config.title}</CardTitle>
            {config.actions?.create && (
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer
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
                    isSubmitting={isCreating}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
          {config.description && (
            <CardDescription>
              {config.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          
          {/* Data Table */}
          <DataTable
            columns={columns}
            data={items}
            meta={meta || { total: items.length, totalPages: 1 }}
            isLoading={isLoading}
            isError={!!error}
            search=""
            sortBy=""
            sortDir="asc"
            page={1}
            pageSize={10}
            onSearchChange={() => {}}
            onSortByChange={() => {}}
            onSortDirChange={() => {}}
            onPageChange={() => {}}
            onPageSizeChange={() => {}}
          />

          {/* Edit Dialog */}
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
                  isSubmitting={isUpdating}
                />
              </DialogContent>
            </Dialog>
          )}

          {/* Delete Confirmation */}
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
