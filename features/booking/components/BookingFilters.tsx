"use client";
import { Button } from '@/shared/components/atoms/ui/button';
import { DateRangePicker } from '@/features/booking/components/DateRangePicker';
import type { Booking } from '@/features/booking/booking.schema';

const STATUS_OPTIONS = [
  { label: 'Tous', value: '' },
  { label: 'Confirmée', value: 'confirmed' },
  { label: 'En attente', value: 'pending' },
  { label: 'Annulée', value: 'cancelled' },
];

export interface BookingFiltersProps {
  status: string;
  setStatus: (status: string) => void;
  dateRange: { from?: string; to?: string };
  setDateRange: (range: { from?: string; to?: string }) => void;
}

export function BookingFilters({ status, setStatus, dateRange, setDateRange }: BookingFiltersProps) {
  return (
    <div className="flex flex-row flex-wrap justify-between gap-4 mb-4 items-end">
      <div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={status === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatus('')}
            aria-label="Tous les statuts"
          >
            Tous
          </Button>
          {STATUS_OPTIONS.filter(opt => opt.value).map(opt => (
            <Button
              key={opt.value}
              variant={status === opt.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatus(opt.value)}
              aria-label={opt.label}
              className="flex items-center gap-1"
            >
              {opt.label as Booking['status']}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <DateRangePicker
          value={{
            from: dateRange.from ? new Date(dateRange.from) : undefined,
            to: dateRange.to ? new Date(dateRange.to) : undefined,
          }}
          onChange={range => {
            setDateRange({
              from: range.from ? range.from.toISOString().slice(0, 10) : undefined,
              to: range.to ? range.to.toISOString().slice(0, 10) : undefined,
            });
          }}
        />
      </div>
    </div>
  );
}
