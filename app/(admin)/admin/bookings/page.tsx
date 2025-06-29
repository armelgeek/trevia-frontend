"use client";
import { BookingAdminConfig } from '@/features/booking/booking.admin-config';
import { useAdminEntity } from '@/hooks/use-admin-entity';
import type { Booking } from '@/features/booking/booking.schema';
import { useQueryState, parseAsString, parseAsJson } from 'nuqs';
import { BookingFilters, BookingCard } from '@/features/booking/components';
import { CalendarCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function BookingAdminPage() {
  const [status, setStatus] = useQueryState('status', parseAsString.withDefault(''));
  const [dateRange, setDateRange] = useQueryState(
    'dateRange',
    parseAsJson<{ from?: string; to?: string }>(() => ({})).withDefault({})
  );

  const filters = {
    status: status || '',
    dateStart: dateRange?.from ? dateRange.from : '',
    dateEnd: dateRange?.to ? dateRange.to : '',
  };

  const {
    data: bookings,
    isLoading,
    error
  } = useAdminEntity({
    config: BookingAdminConfig,
    customServices: BookingAdminConfig.services,
    queryKey: BookingAdminConfig.queryKey ?? ['bookings'],
    filters,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 p-8">
        <div className="flex items-center gap-3 mb-1">
          <Skeleton className="w-8 h-8 rounded-full bg-primary/20" />
          <Skeleton className="h-8 w-48 bg-primary/10" />
        </div>
        <Skeleton className="h-5 w-96 mb-4 bg-primary/10" />
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-9 w-20 rounded" />
          <Skeleton className="h-9 w-20 rounded" />
          <Skeleton className="h-9 w-32 rounded" />
        </div>
        <div className="space-y-6 mt-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl bg-primary/10" />
          ))}
        </div>
      </div>
    );
  }
  if (error) {
    return <div className="p-8 text-red-600">Erreur lors du chargement des réservations</div>;
  }

  return (
    <div className="flex flex-col gap-3 p-8">
      <div className="flex items-center gap-3 mb-1">
        <CalendarCheck className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Réservations</h1>
      </div>
      <p className="text-muted-foreground text-base mb-4">Gérez et consultez toutes les réservations de la plateforme.</p>
      <BookingFilters
        status={status}
        setStatus={setStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />
      <div className="space-y-6">
        {bookings && bookings.length > 0 ? (
          bookings.map((booking: Booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <div className="text-gray-500">Aucune réservation trouvée.</div>
        )}
      </div>
    </div>
  );
}
