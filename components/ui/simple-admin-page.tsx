'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ZodType } from 'zod';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { DynamicForm } from '@/components/ui/dynamic-form';
import { generateTableColumns } from '@/components/ui/dynamic-table';
import { useAdminEntity } from '@/hooks/use-admin-entity';
import Link from 'next/link';
import { Plus } from 'lucide-react';
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

export function SimpleAdminPage<T extends Record<string, unknown>>({
  config,
  schema,
  renderFilters,
  filters,
}: SimpleAdminPageProps<T>) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deletingItem, setDeletingItem] = useState<T | null>(null);

  // ---
  // PATTERN RELATION PARENT/ENFANT (admin nested):
  // Ici, l'ID du parent (ex: moduleId) est récupéré via l'URL (params) et injecté dans le hook et la config.
  // Le champ de relation (ex: moduleId) N'EST PAS affiché comme dropdown dans le formulaire enfant (lesson),
  // il est automatiquement renseigné côté service/hook lors de la création/mise à jour.
  // Cela évite toute sélection manuelle et garantit la cohérence parent/enfant.
  // ---
  const params = useParams();
  let parentId: string | undefined = undefined;
  if ('parent' in config && config.parent && typeof config.parent === 'object' && 'routeParam' in config.parent) {
    const paramValue = params?.[config.parent.routeParam as string];
    parentId = Array.isArray(paramValue) ? paramValue[0] : paramValue;
  }

  // Vérification que les services sont configurés
  if (!config.services) {
    throw new Error(`Services not configured for ${config.title}. Please add services to your config or use the regular AdminPage component.`);
  }

  if (!config.queryKey) {
    throw new Error(`QueryKey not configured for ${config.title}. Please add queryKey to your config.`);
  }

  const pickFields = (data: Record<string, unknown>, fields: (string | number)[]) =>
  Object.fromEntries(fields.map((key: string | number) => [key, data[key]]));

  
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
    customServices: config.services, // Ajouté pour utiliser le vrai service CRUD externe
    queryKey: config.queryKey,
    onSuccess: {
      create: () => setIsCreateOpen(false),
      update: () => setEditingItem(null),
      delete: () => setDeletingItem(null),
    },
    filters,
    parentId,
  });

  // Handlers pour les actions CRUD
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

  // Génération des colonnes de table
  const columns = generateTableColumns<T>(
    config as unknown as Parameters<typeof generateTableColumns<T>>[0],
    config.actions?.update
      ? (item) => setEditingItem(item): undefined,
    config.actions?.delete ? setDeletingItem : undefined,
    schema // <-- Ajout du schéma pour parsing Zod
  );

  // Ajout du bouton "Gérer l'enfant" si la config admin déclare un enfant
  const childConfig = (config as { child?: { route: string; label?: string } }).child;


  const childrenArray: ChildConfig[] = Array.isArray((config as { children?: ChildConfig[] }).children)
    ? ((config as unknown as { children: ChildConfig[] }).children)
    : [];

  const hasChildren = childrenArray.length > 0;
  const renderChildrenActions = hasChildren
    ? (row: { original: Record<string, unknown> }) => {
        // Remplacement dynamique de tous les paramètres :xxx dans la route
        const paramRegex = /:([a-zA-Z0-9_]+)/g;
        return (
          <div className="flex flex-wrap gap-1">
            {(config as any).children.map((child: any) => {
              let route = child.route;
              route = route.replace(paramRegex, (_: string, param: string) => {
                const value = row.original[param] || params?.[param] || row.original.id;
                return value || param;
              });
              const href = route.startsWith('/') ? `/admin${route}` : `/admin/${route}`;
              return (
                <Link
                  key={child.route}
                  href={href}
                  aria-label={child.label || 'Gérer'}
                  className="text-red-500 hover:underline font-medium whitespace-nowrap px-1 py-0.5 text-xs flex items-center rounded border border-red-100 bg-red-50 hover:bg-red-100 transition"
                  style={{ display: 'inline-block', minWidth: 0 }}
                >
                  {child.icon && <span className="text-base align-middle mr-1">{child.icon}</span>}
                  <span className="align-middle truncate max-w-[80px]">{child.label || 'Action'}</span>
                </Link>
              );
            })}
          </div>
        );
      }
    : undefined;

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
          {/* Data Table */}
          <DataTable
            columns={columns as any}
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
            renderRowActions={renderChildrenActions}
          />

          {/* Edit Sheet */}
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
