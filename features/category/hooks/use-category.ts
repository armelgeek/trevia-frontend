import { categoryService } from '../domain/category.service';
import { Category, CategoryPayload } from '../config/category.type';
import { Filter } from '@/shared/lib/types/filter';
import { useDetail, useList, useMutations } from '@/shared/lib/react-query/query-hooks';

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
  lists: () => [...CATEGORY_KEYS.all, 'list'] as const,
  list: (filters: Filter) => [...CATEGORY_KEYS.lists(), { filters }] as const,
  details: () => [...CATEGORY_KEYS.all, 'detail'] as const,
  detail: (slug: string) => [...CATEGORY_KEYS.details(), slug] as const,
};

export const useCategories = (filters: Filter) => {
  return useList<Category>(
    CATEGORY_KEYS,
    categoryService,
    filters
  );
};

export const useCategory = (slug: string) => {
  const { data, isLoading } = useDetail<Category>(
    CATEGORY_KEYS,
    categoryService,
    slug
  );

  return {
    category: data,
    isLoading,
  };
};

export const useCategoryMutations = () => {

  const mutations = useMutations<Category, CategoryPayload>({
    service: categoryService,
    queryKeys: CATEGORY_KEYS,
    successMessages: {
      create: 'Catégorie créée avec succès',
      update: 'Catégorie mise à jour avec succès',
      delete: 'Catégorie supprimée avec succès'
    },
    callbacks: {
      onCreateSuccess: () => {
     
      }
    }
  });

  return {
    createCategory: mutations.create,
    updateCategory: mutations.update,
    deleteCategory: mutations.remove,
    isCreating: mutations.isCreating,
    isUpdating: mutations.isUpdating,
    isDeleting: mutations.isDeleting,
  };
};
