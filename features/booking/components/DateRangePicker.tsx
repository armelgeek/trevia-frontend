"use client";
import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import type { DateRange as DayPickerDateRange } from 'react-day-picker';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export function DateRangePicker({ value, onChange }: { value: DateRange; onChange: (range: DateRange) => void }) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (range: DayPickerDateRange | undefined) => {
    if (range) onChange(range);
    setOpen(false);
  };

  const label = value.from && value.to
    ? `${format(value.from, 'dd/MM/yyyy')} - ${format(value.to, 'dd/MM/yyyy')}`
    : value.from
      ? format(value.from, 'dd/MM/yyyy')
      : 'Choisir une période';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-primary" />
          <span>{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value as DayPickerDateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
