import { createAdminEntity } from '@/lib/admin-generator';
import { ModuleSchema } from './module.schema';
import { ModuleService } from './module.service';
import type { AdminConfigWithChild } from '@/lib/admin-generator';

export const ModuleAdminConfig: AdminConfigWithChild<{
  id: string;
  name: string;
  description?: string;
}> = createAdminEntity('Module', ModuleSchema, {
  description: 'Gérez vos modules',
  icon: '📦',
  actions: { create: true, read: true, update: true, delete: true },
  child: {
    route: 'modules/:parentId/lessons',
    label: 'Gérer les leçons',
  },
  services: {
    fetchItems: async () => {
      const result = await ModuleService.list();
      return {
        data: result.data,
        meta: { total: result.data.length, totalPages: 1 },
      };
    },
    createItem: (data) => ModuleService.create({ name: data.name, description: data.description ?? '' }),
    updateItem: (id, data) => ModuleService.update(id, data),
    deleteItem: (id) => ModuleService.delete(id),
  },
  queryKey: ['modules'],
});
