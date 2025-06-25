'use client';

import { CategorySchema, Category } from '@/features/category/category.schema';
import { CategoryAdminConfig } from '@/features/category/category.admin-config';
import { SimpleAdminPage } from '@/components/ui/simple-admin-page';

export default function CategoriesAdminPage() {

  return (
      <SimpleAdminPage<Category>
        config={CategoryAdminConfig}
        schema={CategorySchema}
      />
  );
}
