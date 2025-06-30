"use client";
import { useState } from "react";
import { ScheduleTable, Schedule } from '@/shared/components/atoms/ui/schedule-table';
import { useSchedulesByDate } from '@/features/location/hooks/use-schedule-by-date';
import { addDays, format, isBefore, isSameDay, startOfToday, endOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/atoms/ui/tabs";
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

export function ScheduleTableMultiDestinationAccordion() {

    const today = startOfToday();
    const lastDay = endOfWeek(today, { weekStartsOn: 1 }); // dimanche
    const days = [];
    let d = today;
    while (d <= lastDay) {
        days.push({
            value: format(d, "yyyy-MM-dd"),
            label: format(d, "EEEE", { locale: fr }),
            date: format(d, "d MMM", { locale: fr }),
            isToday: isSameDay(d, today),
            isPast: isBefore(d, today)
        });
        d = addDays(d, 1);
    }

    const [selectedDay, setSelectedDay] = useState(() => format(today, "yyyy-MM-dd"));
    const { data, isLoading } = useSchedulesByDate(selectedDay);
    const destinations: { label: string; schedules: Schedule[] }[] = asDestinations(data);
    const [open, setOpen] = useState<string | null>(destinations.length > 0 ? destinations[0].label : null);

    const getSummary = (schedules: Schedule[]) => {
        const total = schedules.length;
        const totalSeats = schedules.reduce((acc, s) => acc + s.totalSeats, 0);
        const available = schedules.reduce((acc, s) => acc + s.availableSeats, 0);
        const minPrice = Math.min(...schedules.map(s => s.price));
        return `${total} départ${total > 1 ? 's' : ''} • dès ${minPrice}€ • ${available}/${totalSeats} places`;
    };

    return (
        <div>
            <Tabs value={selectedDay} onValueChange={setSelectedDay} className="w-full mb-5">
                <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent p-0">
                    {days.map((day) => (
                        <TabsTrigger
                            key={day.value}
                            value={day.value}
                            disabled={day.isPast}
                            className={`flex flex-col items-center px-4 py-2 h-auto rounded-lg transition-all border border-transparent
                  ${selectedDay === day.value ? 'bg-primary text-white shadow ring-2 ring-primary' : 'bg-gray-100 text-gray-800 hover:bg-primary/10'}
                  ${day.isPast ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="text-xs font-semibold">{day.label.charAt(0).toUpperCase() + day.label.slice(1)}</span>
                            <span className="text-xs opacity-75">{day.date}</span>
                            {day.isToday && <span className="text-[10px] text-primary font-bold mt-1">Aujourd&apos;hui</span>}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            {isLoading ? (
                <div className="space-y-2 mt-6">
                  {[1,2,3].map((i) => (
                    <div key={i} className="border rounded bg-gray-100">
                      <div className="h-12 flex items-center px-4">
                        <Skeleton className="w-32 h-4 mr-4" />
                        <Skeleton className="w-24 h-4 mr-4" />
                        <Skeleton className="w-16 h-4 mr-4" />
                        <Skeleton className="w-20 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
            ) : destinations.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">Aucun horaire trouvé pour cette date.</div>
            ) : (
                <div className="space-y-2">
                    {destinations.map((dest) => (
                        <div key={dest.label} className="border rounded">
                            <button
                                className="w-full text-left px-4 py-2 font-semibold bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
                                onClick={() => setOpen(open === dest.label ? null : dest.label)}
                                aria-expanded={open === dest.label}
                                aria-controls={`panel-${dest.label}`}
                            >
                                <span>{dest.label}</span>
                                <span className="text-xs text-gray-500 ml-2">{getSummary(dest.schedules)}</span>
                            </button>
                            {open === dest.label && (
                                <div className="p-4" id={`panel-${dest.label}`}>
                                    <ScheduleTable schedules={dest.schedules} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ScheduleTableMultiDestinationAccordion;

// Ajout du typage explicite et correction de l'appel à asDestinations
function asDestinations(data: unknown): { label: string; schedules: Schedule[] }[] {
    if (!Array.isArray(data)) return [];
    return data as { label: string; schedules: Schedule[] }[];
}
