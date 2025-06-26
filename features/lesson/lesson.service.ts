// Données fictives en mémoire
type Lesson = {
  id: string;
  title: string;
  content: string;
  moduleId: string;
};

const mockLessons: Record<string, Lesson[]> = {
  'module-1': [
    { id: 'lesson-1', title: 'Intro', content: 'Bienvenue', moduleId: 'module-1' },
    { id: 'lesson-2', title: 'Chapitre 1', content: 'Contenu 1', moduleId: 'module-1' },
  ],
  'module-2': [
    { id: 'lesson-3', title: 'Début', content: 'Début module 2', moduleId: 'module-2' },
  ],
};

export class LessonService {
  static list(moduleId: string) {
    return Promise.resolve({ data: mockLessons[moduleId] || [] });
  }
  static create(moduleId: string, data: Omit<Lesson, 'id'>) {
    const newLesson: Lesson = { ...data, id: `lesson-${Math.random().toString(36).slice(2, 8)}`, moduleId };
    if (!mockLessons[moduleId]) mockLessons[moduleId] = [];
    mockLessons[moduleId].push(newLesson);
    return Promise.resolve({ data: newLesson });
  }
  static update(moduleId: string, lessonId: string, data: Partial<Lesson>) {
    const lessons = mockLessons[moduleId] || [];
    const idx = lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      lessons[idx] = { ...lessons[idx], ...data };
      return Promise.resolve({ data: lessons[idx] });
    }
    return Promise.reject(new Error('Not found'));
  }
  static delete(moduleId: string, lessonId: string) {
    const lessons = mockLessons[moduleId] || [];
    const idx = lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      lessons.splice(idx, 1);
      return Promise.resolve({});
    }
    return Promise.reject(new Error('Not found'));
  }
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useModuleLessons(moduleId: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['lessons', moduleId],
    queryFn: () => LessonService.list(moduleId),
  });

  const create = useMutation({
    mutationFn: (data: Omit<Lesson, 'id'>) => LessonService.create(moduleId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessons', moduleId] }),
  });

  const update = useMutation({
    mutationFn: ({ lessonId, data }: { lessonId: string; data: Partial<Lesson> }) => LessonService.update(moduleId, lessonId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['lessons', moduleId] }),
  });

  const remove = useMutation({
    mutationFn: (lessonId: string) => LessonService.delete(moduleId, lessonId),
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
