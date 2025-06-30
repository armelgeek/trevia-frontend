import { useState } from "react";
import { ScheduleTable, Schedule } from '@/shared/components/atoms/ui/schedule-table';

export function ScheduleTableMultiDestinationAccordion({ destinations }: { destinations: { label: string; schedules: Schedule[] }[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {destinations.map((dest) => (
        <div key={dest.label} className="border rounded">
          <button
            className="w-full text-left px-4 py-2 font-semibold bg-gray-50 hover:bg-gray-100"
            onClick={() => setOpen(open === dest.label ? null : dest.label)}
          >
            {dest.label}
          </button>
          {open === dest.label && (
            <div className="p-4">
              <ScheduleTable schedules={dest.schedules} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
