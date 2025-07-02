"use client";
import { Section } from '@/shared/components/atoms/ui/section';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import { DestinationCard } from '@/features/trip/components/ui-destination-card';
import { usePopularTrips } from '@/features/location/hooks/use-trip-popularity';


export default function PopularDestinationsSection() {
  const { data, isLoading } = usePopularTrips({ page: '1', limit: '6' });
  const destinations = Array.isArray(data)
    ? data.map((trip) => ({
        routeLabel: trip.routeLabel,
        distanceKm: trip.distanceKm,
        from: trip.departureCity || '',
        to: trip.arrivalCity || '',
        duration: trip.duration ? `${Math.round(trip.duration / 60)}h${(trip.duration % 60).toString().padStart(2, '0')}` : '',
        price: trip.price ?? 0,
        isPopular: true,
        isDirect: true,
        horaires: trip.availableTimes,
      }))
    : [];

  return (
    <Section
      title="NOS DESTINATIONS POPULAIRES"
      subtitle="Découvrez nos principales destinations avec des départs fréquents."
      spacing="sm"
      backgroundVariant="white"
    >
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64"><Skeleton className="h-full w-full rounded-lg" /></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard key={index} {...dest} />
          ))}
        </div>
      )}
    </Section>
  );
}
