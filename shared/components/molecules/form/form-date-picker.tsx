'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Control, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/shared/lib/utils';

interface FormDatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  mode?: 'single' | 'range';
  format?: string;
}

export function FormDatePicker({
  name,
  control,
  label,
  placeholder = 'Pick a date',
  error,
  className,
  disabled,
  required,
  mode = 'single',
  format: dateFormat = 'PPP',
}: FormDatePickerProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !field.value && 'text-muted-foreground',
                  error && 'border-red-500 focus:ring-red-500'
                )}
                disabled={disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  mode === 'range' ? (
                    <>
                      {format((field.value as DateRange)?.from as Date, dateFormat)}{' - '}
                      {format((field.value as DateRange)?.to as Date, dateFormat)}
                    </>
                  ) : (
                    format(field.value as Date, dateFormat)
                  )
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode={mode}
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabled}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
