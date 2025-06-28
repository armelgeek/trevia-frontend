"use client";

import { tripSchema } from '@/features/trip/trip.schema';
import { TripAdminConfig } from '@/features/trip/trip.admin-config';
import { SimpleAdminPage } from '@/components/ui/simple-admin-page';
import React from 'react';

export default function TripAdminPage() {
  return (
    <SimpleAdminPage
      config={TripAdminConfig}
      schema={tripSchema}
    />
  );
}
