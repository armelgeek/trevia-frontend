import { useState, useCallback, useEffect } from 'react';

export interface UseDetailConfig<T> {
  fetchFn: (id: string) => Promise<T>;
  updateFn?: (id: string, data: Partial<T>) => Promise<T>;
  deleteFn?: (id: string) => Promise<void>;
  onSuccess?: (action: 'fetch' | 'update' | 'delete', data?: T) => void;
  onError?: (error: Error, action: 'fetch' | 'update' | 'delete') => void;
}

export interface UseDetailReturn<T> {
  // Data
  data: T | null;
  
  // Loading states
  loading: boolean;
  updating: boolean;
  deleting: boolean;
  
  // Error states
  error: string | null;
  
  // Actions
  fetch: (id: string) => Promise<void>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  
  // State management
  setData: (data: T | null) => void;
  clearError: () => void;
}

export function useDetail<T>(config: UseDetailConfig<T>): UseDetailReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetch = useCallback(async (id: string) => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    setCurrentId(id);
    
    try {
      const result = await config.fetchFn(id);
      setData(result);
      config.onSuccess?.('fetch', result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors du chargement');
      setError(error.message);
      config.onError?.(error, 'fetch');
    } finally {
      setLoading(false);
    }
  }, [config]);

  const update = useCallback(async (id: string, updateData: Partial<T>) => {
    if (!config.updateFn) {
      throw new Error('Update function not provided');
    }
    
    setUpdating(true);
    setError(null);
    
    try {
      const result = await config.updateFn(id, updateData);
      setData(result);
      config.onSuccess?.('update', result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors de la mise à jour');
      setError(error.message);
      config.onError?.(error, 'update');
      throw error;
    } finally {
      setUpdating(false);
    }
  }, [config]);

  const remove = useCallback(async (id: string) => {
    if (!config.deleteFn) {
      throw new Error('Delete function not provided');
    }
    
    setDeleting(true);
    setError(null);
    
    try {
      await config.deleteFn(id);
      setData(null);
      config.onSuccess?.('delete');
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur lors de la suppression');
      setError(error.message);
      config.onError?.(error, 'delete');
      throw error;
    } finally {
      setDeleting(false);
    }
  }, [config]);

  const refresh = useCallback(async () => {
    if (currentId) {
      await fetch(currentId);
    }
  }, [currentId, fetch]);

  return {
    // Data
    data,
    
    // Loading states
    loading,
    updating,
    deleting,
    
    // Error states
    error,
    
    // Actions
    fetch,
    update,
    remove,
    refresh,
    
    // State management
    setData,
    clearError,
  };
}
