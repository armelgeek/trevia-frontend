import { createAdminEntity } from '@/lib/admin-generator';
import { CategorySchema } from './category.schema';
import { categoryService } from './category.mock';

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
  },
  services: {
    fetchItems: categoryService.fetchItems,
    createItem: categoryService.createItem,
    updateItem: categoryService.updateItem,
    deleteItem: categoryService.deleteItem,
  },
  queryKey: ['categories'],
});
