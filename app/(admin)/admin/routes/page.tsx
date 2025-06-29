"use client";
import { RouteSchema } from '@/features/route/route.schema';
import { RouteAdminConfig } from '@/features/route/route.admin-config';
import { SimpleAdminPage } from '@/shared/components/atoms/ui/simple-admin-page';

export default function RouteAdminPage() {
  return (
    <SimpleAdminPage
      config={RouteAdminConfig}
      schema={RouteSchema}
    />
  );
}
