'use client';

import { DataTable } from '@/shared/components/molecules/datatable/data-table';
import { columns } from '@/features/category/components/organisms/columns';
import { useCategories } from '@/features/category/hooks/use-category';
import { Add } from '@/features/category/components/organisms/add';
import { useTableParams } from '@/shared/hooks/use-table-params';

export default function CategoryPage() {
  const { params, tableProps } = useTableParams();
  const { data, meta, isLoading } = useCategories(params);

  return (
    <div className="space-y-4">
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-2xl font-bold tracking-tight">Manage Category</h2>
          <p className="text-muted-foreground">
            You can create, edit, and delete products here.
          </p>
        </div>
        <Add />
      </div>

      <DataTable
        columns={columns}
        data={data}
        meta={meta}
        isLoading={isLoading}
        isError={false}
        {...tableProps}
      />
    </div>
  );
}
