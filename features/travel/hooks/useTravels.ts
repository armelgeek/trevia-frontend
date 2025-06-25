import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { travelService } from '../services/travel.service';

// Query keys
export const TRAVEL_KEYS = {
  all: ['travels'] as const,
  lists: () => [...TRAVEL_KEYS.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...TRAVEL_KEYS.lists(), { filters }] as const,
  details: () => [...TRAVEL_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...TRAVEL_KEYS.details(), id] as const,
  featured: () => [...TRAVEL_KEYS.all, 'featured'] as const,
};

// Types pour les filtres
export interface TravelFilters {
  search?: string;
  category?: string;
  difficulty?: string;
  status?: string;
  priceRange?: string;
  duration?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
}

// Hook pour récupérer la liste des voyages avec gestion d'état
export function useTravels(initialFilters?: TravelFilters) {
  const [filters, setFiltersState] = useState<TravelFilters>(initialFilters || {
    page: 1,
    pageSize: 12,
    sortBy: 'popularity'
  });

  // Transformer les filtres pour l'API
  const transformFiltersForAPI = (filters: TravelFilters) => {
    const apiFilters: Record<string, unknown> = { ...filters };
    
    // Transformer priceRange string en objet
    if (filters.priceRange && typeof filters.priceRange === 'string') {
      if (filters.priceRange === '0-500') {
        apiFilters.priceRange = { min: 0, max: 500 };
      } else if (filters.priceRange === '500-1000') {
        apiFilters.priceRange = { min: 500, max: 1000 };
      } else if (filters.priceRange === '1000-2000') {
        apiFilters.priceRange = { min: 1000, max: 2000 };
      } else if (filters.priceRange === '2000+') {
        apiFilters.priceRange = { min: 2000, max: 10000 };
      } else {
        delete apiFilters.priceRange;
      }
    }
    
    return apiFilters;
  };

  const query = useQuery({
    queryKey: TRAVEL_KEYS.list(filters as Record<string, unknown>),
    queryFn: () => travelService.getAll(transformFiltersForAPI(filters)),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const setFilters = (newFilters: Partial<TravelFilters>) => {
    setFiltersState(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page || 1 // Reset page sauf si explicitement fournie
    }));
  };

  const clearFilters = () => {
    setFiltersState({
      page: 1,
      pageSize: 12,
      sortBy: 'popularity'
    });
  };

  const pagination = useMemo(() => {
    if (!query.data?.meta?.pagination) {
      return {
        page: 1,
        pageSize: 12,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
    }
    return query.data.meta.pagination;
  }, [query.data]);

  return {
    ...query,
    data: query.data?.data || [],
    pagination,
    filters,
    setFilters,
    clearFilters
  };
}

// Hook pour récupérer un voyage par ID
export function useTravel(id: string) {
  return useQuery({
    queryKey: TRAVEL_KEYS.detail(id),
    queryFn: () => travelService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook pour récupérer les voyages en vedette
export function useFeaturedTravels() {
  return useQuery({
    queryKey: TRAVEL_KEYS.featured(),
    queryFn: () => travelService.getFeatured(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Hook pour créer une réservation
export function useCreateReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ travelId, reservationData }: { 
      travelId: string; 
      reservationData: Record<string, unknown> 
    }) => travelService.reserve(travelId, reservationData),
    onSuccess: () => {
      toast.success('Réservation créée avec succès !');
      
      // Invalider les caches pour rafraîchir les données
      queryClient.invalidateQueries({ queryKey: TRAVEL_KEYS.all });
    },
    onError: (error) => {
      console.error('Erreur lors de la réservation:', error);
      toast.error('Erreur lors de la création de la réservation');
    },
  });
}

// Hook composé pour gérer les filtres de recherche
export function useTravelFilters() {
  const categories = [
    { label: 'Culturel', value: 'cultural' },
    { label: 'Aventure', value: 'adventure' },
    { label: 'Détente', value: 'relaxation' },
    { label: 'Famille', value: 'family' },
    { label: 'Business', value: 'business' },
  ];

  const difficulties = [
    { label: 'Facile', value: 'easy' },
    { label: 'Modéré', value: 'moderate' },
    { label: 'Difficile', value: 'hard' },
  ];

  const statuses = [
    { label: 'Disponible', value: 'available' },
    { label: 'Complet', value: 'sold_out' },
    { label: 'Bientôt', value: 'coming_soon' },
  ];

  return {
    categories,
    difficulties,
    statuses,
  };
}
