"use client";
import { scheduleSchema } from '@/features/schedule/schedule.schema';
import { ScheduleAdminConfig } from '@/features/schedule/schedule.admin-config';
import { SimpleAdminPage } from '@/components/ui/simple-admin-page';

export default function ScheduleAdminPage() {
  return (
    <SimpleAdminPage
      config={ScheduleAdminConfig}
      schema={scheduleSchema}
    />
  );
}
