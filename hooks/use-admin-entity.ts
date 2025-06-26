import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { AdminConfig, CrudService } from '@/lib/admin-generator';

interface UseAdminEntityOptions<T extends Record<string, unknown>> {
  config: AdminConfig;
  apiEndpoint?: string;
  queryKey: string[];
  onSuccess?: {
    create?: (data: T) => void;
    update?: (data: T) => void;
    delete?: (id: string) => void;
  };
  onError?: {
    create?: (error: Error) => void;
    update?: (error: Error) => void;
    delete?: (error: Error) => void;
    fetch?: (error: Error) => void;
  };
  customServices?: CrudService<T>;
  filters?: Record<string, string | number | undefined>;
  parentId?: string;
}

interface AdminEntityService<T> {
  fetchItems: (filters?: Record<string, unknown>) => Promise<{ data: T[]; meta?: { total: number; totalPages: number } }>;
  createItem: (data: T) => Promise<T>;
  updateItem: (id: string, data: Partial<T>) => Promise<T>;
  deleteItem: (id: string) => Promise<void>;
}

function createAdminService<T>(endpoint: string): AdminEntityService<T> {
  return {
    async fetchItems(filters?: Record<string, unknown>) {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      return response.json();
    },

    async createItem(data: T) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to create item`);
      }
      return response.json();
    },

    async updateItem(id: string, data: Partial<T>) {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to update item`);
      }
      return response.json();
    },

    async deleteItem(id: string) {
      const response = await fetch(`${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete item`);
      }
    },
  };
}

export function useAdminEntity<T extends Record<string, unknown>>(
  options: UseAdminEntityOptions<T>
) {
  const queryClient = useQueryClient();
  const service = options.customServices
    ? wrapParentService(options.customServices, options.parentId)
    : createAdminService<T>(options.apiEndpoint || '');

  const query = useQuery({
    queryKey: [...options.queryKey, options.filters || {}],
    queryFn: () => service.fetchItems(options.filters),
  });

  const createMutation = useMutation({
    mutationFn: service.createItem,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });
      toast.success(`${options.config.title} créé avec succès`);
      options.onSuccess?.create?.(data);
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la création : ${error.message}`);
      options.onError?.create?.(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<T> }) => 
      service.updateItem(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });
      toast.success(`${options.config.title} modifié avec succès`);
      options.onSuccess?.update?.(data);
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la modification : ${error.message}`);
      options.onError?.update?.(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: service.deleteItem,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: options.queryKey });
      toast.success(`${options.config.title} supprimé avec succès`);
      options.onSuccess?.delete?.(id);
    },
    onError: (error: Error) => {
      toast.error(`Erreur lors de la suppression : ${error.message}`);
      options.onError?.delete?.(error);
    },
  });

  return {
    data: query.data?.data || [],
    meta: query.data?.meta,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,

    create: createMutation.mutateAsync,
    update: (id: string, data: Partial<T>) => {
      console.log('useAdminEntity.update called with:', id, data);
      return updateMutation.mutateAsync({ id, data });
    },
    delete: deleteMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    refetch: query.refetch,
    invalidate: () => queryClient.invalidateQueries({ queryKey: options.queryKey }),
  };
}

function wrapParentService<T extends Record<string, unknown>>(service: CrudService<T>, parentId?: string): CrudService<T> {
  return {
    fetchItems: () => {
      if (parentId && service.fetchItems.length > 0) {
        return service.fetchItems();
      }
      return service.fetchItems();
    },
    createItem: (data: T) => {
      if (parentId && service.createItem.length > 0) {
        return service.createItem({ ...data, parentId });
      }
      return service.createItem(data);
    },
    updateItem: (id: string, data: Partial<T>) => {
      if (parentId && service.updateItem.length > 1) {
        return service.updateItem(id, { ...data, parentId });
      }
      return service.updateItem(id, data);
    },
    deleteItem: (id: string) => {
      if (parentId && service.deleteItem.length > 1) {
        // On ignore le second argument si la méthode n'en attend qu'un
        return (service.deleteItem as (id: string, params?: { parentId?: string }) => Promise<void>)(id, { parentId });
      }
      return service.deleteItem(id);
    },
  };
}

export function useSimpleAdminEntity<T extends Record<string, unknown>>(
  entityName: string,
  config: AdminConfig
) {
  const kebabName = entityName.toLowerCase().replace(/([A-Z])/g, '-$1').replace(/^-/, '');
  
  return useAdminEntity<T>({
    config,
    queryKey: [kebabName],
    apiEndpoint: `/api/${kebabName}s`,
  });
}

export type { AdminEntityService, UseAdminEntityOptions };
export { createAdminService };
