import { CategoryForm } from '../molecules/category-form';
import { useCategoryMutations } from '../../hooks/use-category';
import { categoryKeys } from '../../config/category.key';
import { CategoryPayload } from '../../config/category.type';
import { EntityForm } from '@/shared/components/molecules/form/add-entity';

export function Add() {
  const { createCategory, isCreating } = useCategoryMutations();

  const handleSubmit = async (data: CategoryPayload) => {
    await createCategory(data);
  };

  return (
    <EntityForm<CategoryPayload>
      title="Category"
      initialData={null}
      onSubmit={handleSubmit}
      isSubmitting={isCreating}
      Form={CategoryForm}
      queryKey={categoryKeys.all}
      mode="add"
    />
  );
}