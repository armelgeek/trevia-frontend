import { createAdminEntity } from '@/lib/admin-generator';
import { CategorySchema } from './category.schema';

export const CategoryAdminConfig = createAdminEntity('Catégorie', CategorySchema, {
  description: 'Gérez vos catégories de produits',
  icon: '🏷️',
  ui: {
    table: {
      defaultSort: 'name',
    },
    form: {
      layout: 'simple',
    }
  },
  actions: {
    create: true,
    read: true,
    update: true, 
    delete: true,
    bulk: false,
    export: false,
  }
});
