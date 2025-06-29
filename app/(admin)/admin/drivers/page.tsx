"use client";
import { DriverSchema } from '@/features/driver/driver.schema';
import { DriverAdminConfig } from '@/features/driver/driver.admin-config';
import { SimpleAdminPage } from '@/shared/components/atoms/ui/simple-admin-page';

export default function DriverAdminPage() {
  return (
    <SimpleAdminPage
      config={DriverAdminConfig}
      schema={DriverSchema}
    />
  );
}
