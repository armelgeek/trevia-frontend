'use client';

import { AdminPage } from '@/components/ui/admin-page';
import { CategorySchema, Category } from '@/features/category/category.schema';
import { categoryService } from '@/features/category/category.mock';
import { CategoryAdminConfig } from '@/features/category/category.admin-config';

export default function CategoriesAdminPage() {

  return (
    <div className="space-y-6 px-3">
     
      <AdminPage<Category>
        config={CategoryAdminConfig}
        schema={CategorySchema}
        fetchItems={categoryService.fetchItems}
        createItem={categoryService.createItem}
        updateItem={categoryService.updateItem}
        deleteItem={categoryService.deleteItem}
        queryKey={['categories']}
      />
    </div>
  );
}
