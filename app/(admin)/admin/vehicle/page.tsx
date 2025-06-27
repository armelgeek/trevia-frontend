"use client";
import { VehicleSchema } from '@/features/vehicle/vehicle.schema';
import { VehicleAdminConfig } from '@/features/vehicle/vehicle.admin-config';
import { SimpleAdminPage } from '@/components/ui/simple-admin-page';

export default function VehicleAdminPage() {
  return (
    <SimpleAdminPage
      config={VehicleAdminConfig}
      schema={VehicleSchema}
    />
  );
}
