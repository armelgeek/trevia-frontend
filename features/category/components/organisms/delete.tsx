'use client';

import { useCategoryMutations } from '../../hooks/use-category';
import { EntityDelete } from '@/shared/components/molecules/table/entity-delete';
import { categoryKeys } from '../../config/category.key';

interface DeleteProps {
  slug: string;
  onComplete?: () => void;
}

export function Delete({ slug, onComplete }: DeleteProps) {
  const { deleteCategory } = useCategoryMutations();

  return (
    <EntityDelete
      entityId={slug}
      entityName="Category"
      deleteService={async (id: string) => await deleteCategory(id)}
      queryKey={categoryKeys.all}
      onActionComplete={onComplete}
    />
  );
}
