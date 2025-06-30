"use client";
import { useState } from "react";
import { ScheduleTable, Schedule } from '@/shared/components/atoms/ui/schedule-table';
import { useSchedulesByDate } from '@/features/location/hooks/use-schedule-by-date';

function asDestinations(data: unknown): { label: string; schedules: Schedule[] }[] {
  if (!Array.isArray(data)) return [];
  return data as { label: string; schedules: Schedule[] }[];
}

export function ScheduleByDateMulti({ date }: { date: string }) {
  const { data, isLoading } = useSchedulesByDate(date);
  const destinations = asDestinations(data);

  return (
    <div className="space-y-10">
      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Chargement des horaires...</div>
      ) : destinations.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">Aucun horaire trouvé pour cette date.</div>
      ) : (
        destinations.map((dest) => (
          <div key={dest.label}>
            <h3 className="text-lg font-bold mb-2">{dest.label}</h3>
            <ScheduleTable schedules={dest.schedules} />
          </div>
        ))
      )}
    </div>
  );
}

export function ScheduleByDateMultiAccordion({ date }: { date: string }) {
  const { data, isLoading } = useSchedulesByDate(date);
  const destinations = asDestinations(data);
  const [open, setOpen] = useState<string | null>(destinations.length > 0 ? destinations[0].label : null);

  const getSummary = (schedules: Schedule[]) => {
    const total = schedules.length;
    const totalSeats = schedules.reduce((acc, s) => acc + s.totalSeats, 0);
    const available = schedules.reduce((acc, s) => acc + s.availableSeats, 0);
    const minPrice = Math.min(...schedules.map(s => s.price));
    return `${total} départ${total > 1 ? 's' : ''} • dès ${minPrice}€ • ${available}/${totalSeats} places`;
  };

  if (isLoading) {
    return <div className="text-center text-muted-foreground py-8">Chargement des horaires...</div>;
  }
  if (destinations.length === 0) {
    return <div className="text-center text-muted-foreground py-8">Aucun horaire trouvé pour cette date.</div>;
  }

  return (
    <div className="space-y-2">
      {destinations.map((dest) => (
        <div key={dest.label} className="border rounded">
          <button
            className="w-full text-left px-4 py-2 font-semibold bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
            onClick={() => setOpen(open === dest.label ? null : dest.label)}
          >
            <span>{dest.label}</span>
            <span className="text-xs text-gray-500 ml-2">{getSummary(dest.schedules)}</span>
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
