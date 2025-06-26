import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';
import type { Lesson } from './lesson.schema';

const base = API_ENDPOINTS.lesson.base;
const service = new BaseService(base);

export const lessonService = {
  // Liste toutes les lessons d'un module (filtrage par moduleId)
  listByModule: (moduleId: string) => service.get<Lesson[]>('', { moduleId }),
  // CRUD génériques
  get: (id: string) => service.get<Lesson>(`/${id}`),
  create: (data: Partial<Lesson>) => service.post<Lesson>('', data),
  update: (id: string, data: Partial<Lesson>) => service.put<Lesson>(`/${id}`, data),
  delete: (id: string) => service.delete<Lesson>(`/${id}`),
};

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useModuleLessons(moduleId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['lessons', moduleId],
    queryFn: () => lessonService.listByModule(moduleId),
  });

  const create = useMutation({
    mutationFn: (data: Omit<Lesson, 'id'>) => lessonService.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessons', moduleId] }),
  });

  const update = useMutation({
    mutationFn: ({ lessonId, data }: { lessonId: string; data: Partial<Lesson> }) => lessonService.update(lessonId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessons', moduleId] }),
  });

  const remove = useMutation({
    mutationFn: (lessonId: string) => lessonService.delete(lessonId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessons', moduleId] }),
  });

  return {
    lessons: query.data?.data || [],
    isLoading: query.isLoading,
    create: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
  };
}
