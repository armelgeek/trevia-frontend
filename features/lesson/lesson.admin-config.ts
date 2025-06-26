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
    fetchItems: async () => {
      const result = await LessonAdminAdapter.fetchItems({ parentId: '' });
      return {
        data: result.data.map((l: Lesson) => ({
          ...l,
          order: 0,
          description: l.description ?? '',
        })),
        meta: { total: result.data.length, totalPages: 1 },
      };
    },
    createItem: (data) => LessonAdminAdapter.createItem({ ...data, parentId: '' }),
    updateItem: (id, data) => LessonAdminAdapter.updateItem(id, { ...data, parentId: '' }),
    deleteItem: (id) => LessonAdminAdapter.deleteItem(id, { parentId: '' }),
  },
  queryKey: ['lessons'],
});
// Le parentId sera injecté dynamiquement par le wrapper dans useAdminEntity
