'use client';

import { EntityForm } from '@/shared/components/molecules/form/add-entity';
import { CategoryPayload } from '../../config/category.type';
import { CategoryForm } from '../molecules/category-form';
import { categoryKeys } from '../../config/category.key';
import { useCategory, useCategoryMutations } from '../../hooks/use-category';

interface EditProps {
  slug: string;
  onComplete?: () => void;
}

export function Edit({ slug, onComplete }: EditProps) {
  const { category } = useCategory(slug);
  const { updateCategory, isUpdating } = useCategoryMutations();

  const handleSubmit = async (data: CategoryPayload) => {
    await updateCategory({ slug, data });
    onComplete?.();
  };

  if (!category) {
    return null;
  }

  return (
    <EntityForm<CategoryPayload>
      title="Category"
      initialData={category}
      onSubmit={handleSubmit}
      isSubmitting={isUpdating}
      Form={CategoryForm}
      queryKey={categoryKeys.all}
      mode="edit"
    />
  );
}
