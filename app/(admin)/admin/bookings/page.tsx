"use client";
import { BookingSchema } from '@/features/booking/booking.schema';
import { BookingAdminConfig } from '@/features/booking/booking.admin-config';
import { SimpleAdminPage } from '@/components/ui/simple-admin-page';

export default function BookingAdminPage() {
  return (
    <SimpleAdminPage
      config={BookingAdminConfig}
      schema={BookingSchema}
    />
  );
}
