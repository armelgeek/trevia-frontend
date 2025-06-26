"use client";

import { tripSchema } from '@/features/trip/trip.schema';
import { TripAdminConfig } from '@/features/trip/trip.admin-config';
import { SimpleAdminPage } from '@/components/ui/simple-admin-page';
import { AdminTableFilters } from '@/components/ui/admin-table-filters';
import React from 'react';

export default function TripAdminPage() {
  const [filters, setFilters] = React.useState<Record<string, string | number | undefined>>({});

  return (
    <SimpleAdminPage
      config={TripAdminConfig}
      schema={tripSchema}
      renderFilters={() => (
        <AdminTableFilters
          fields={TripAdminConfig.fields}
          filters={filters}
          onChange={setFilters}
        />
      )}
      filters={filters}
    />
  );
}
