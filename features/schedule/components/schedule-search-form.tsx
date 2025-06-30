"use client";
import { useRef } from "react";
import { DateTimePicker } from '@/shared/components/atoms/date-picker';
import { Input } from '@/shared/components/atoms/ui/input';
import { Button } from '@/shared/components/atoms/ui/button';
import { MapPin, Users, Calendar } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/shared/components/atoms/ui/select';
interface ScheduleSearchFormProps {
  from: string;
  to: string;
  dateStart?: Date;
  dateEnd?: Date;
  passengers: number;
  onChange: (params: {
    from: string;
    to: string;
    dateStart?: Date;
    dateEnd?: Date;
    passengers: number;
    search: string;
  }) => void;
  onSubmit: (params: {
    from: string;
    to: string;
    dateStart?: Date;
    dateEnd?: Date;
    passengers: number;
    search: string;
  }) => void;
  search: string;
  uniqueFrom: string[];
  uniqueTo: string[];
}

export function ScheduleSearchForm({
  from,
  to,
  dateStart,
  dateEnd,
  passengers,
  onChange,
  onSubmit,
  search,
  uniqueFrom,
  uniqueTo,
}: ScheduleSearchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="w-full flex flex-col items-center justify-center my-5 border border-gray-200 bg-white/90 z-20 sticky top-14 pt-0">
      <form
        ref={formRef}
        className="flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl mx-auto p-6 justify-center"
        onSubmit={e => {
          e.preventDefault();
          onSubmit({ from, to, dateStart, dateEnd, passengers, search });
        }}
      >
        <div className="flex flex-col w-full md:w-auto min-w-[180px]">
          <label htmlFor="from" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4 text-primary" />Départ</label>
          <Select value={from || 'all'} onValueChange={value => onChange({ from: value === 'all' ? '' : value, to, dateStart, dateEnd, passengers, search })}>
            <SelectTrigger id="from">
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {uniqueFrom.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col w-full md:w-auto min-w-[180px]">
          <label htmlFor="to" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1"><MapPin className="w-4 h-4 text-primary rotate-180" />Arrivée</label>
          <Select value={to || 'all'} onValueChange={value => onChange({ from, to: value === 'all' ? '' : value, dateStart, dateEnd, passengers, search })}>
            <SelectTrigger id="to">
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {uniqueTo.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col w-full md:w-auto min-w-[250px]">
          <label htmlFor="dateStart" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1"><Calendar className="w-4 h-4 text-primary" />Date</label>
          <DateTimePicker
            value={dateStart}
            onChange={d => onChange({ from, to, dateStart: d, dateEnd, passengers, search })}
            placeholder="Départ"
            displayFormat={{ hour24: 'dd MMMM yyyy' }}
            granularity="day"
            className="w-[300px]"
          />
        </div>
        <div className="flex flex-col w-full md:w-auto min-w-[120px]">
          <label htmlFor="passengers" className="text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1"><Users className="w-4 h-4 text-primary" />Passagers</label>
          <Input
            id="passengers"
            type="number"
            min={1}
            max={10}
            value={passengers}
            onChange={e => onChange({ from, to, dateStart, dateEnd, passengers: Number(e.target.value), search })}
            className="border-2 border-primary min-w-[100px] focus:ring-2 focus:ring-primary"
            aria-label="Nombre de passagers"
          />
        </div>
        
        

        <Button type="submit" className="px-6 font-semibold mt-2 md:mt-6 w-full md:w-auto">
          Vérifier les disponibilités
        </Button>
      </form>
    </div>
  );
}
