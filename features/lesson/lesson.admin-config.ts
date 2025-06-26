import { createAdminEntity } from '@/lib/admin-generator';
import { LessonSchema, Lesson } from './lesson.schema';
import { LessonAdminAdapter } from './lesson.admin-adapter';
import type { AdminConfigWithParent } from '@/lib/admin-generator';

export const LessonAdminConfig: AdminConfigWithParent<Lesson> = createAdminEntity('Leçon', LessonSchema, {
  description: 'Gérez les leçons d’un module',
  icon: '📖',
  parent: { key: 'moduleId', routeParam: 'moduleId' },
  actions: { create: true, read: true, update: true, delete: true },
  services: {
    fetchItems: async (filters?: Record<string, unknown>) => {
      const moduleId = filters?.moduleId || filters?.parentId || '';
      return LessonAdminAdapter.fetchItems({ parentId: moduleId as string });
    },
    createItem: async (data: Record<string, unknown>, filters?: Record<string, unknown>) => {
      const moduleId = filters?.moduleId || filters?.parentId || '';
      return LessonAdminAdapter.createItem({
        ...data, parentId: moduleId as string,
        title: ''
      });
    },
    updateItem: async (id: string, data: Record<string, unknown>, filters?: Record<string, unknown>) => {
      const moduleId = filters?.moduleId || filters?.parentId || '';
      return LessonAdminAdapter.updateItem(id, { ...data, parentId: moduleId as string });
    },
    deleteItem: async (id: string) => {
      return LessonAdminAdapter.deleteItem(id);
    },
  },
  queryKey: ['lessons'],
});
// Le parentId/moduleId est injecté dynamiquement par le wrapper dans useAdminEntity
