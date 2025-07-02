"use client";

import { DestinationCard } from "@/features/trip/components/ui-destination-card";
import { DestinationCardHorizontal } from "@/features/trip/components/ui-destination-card-horizontal";
import { Skeleton } from "@/shared/components/atoms/ui/skeleton";

import type { DestinationCardProps } from "@/features/trip/components/ui-destination-card";
import type { DestinationCardHorizontalProps } from "@/features/trip/components/ui-destination-card-horizontal";

interface DestinationsListProps {
  results: (Partial<DestinationCardProps & DestinationCardHorizontalProps>)[];
  isLoading: boolean;
  isError: boolean;
  view: 'grid' | 'list';
}

export default function DestinationsList({ results, isLoading, isError, view }: DestinationsListProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-xl bg-gray-100" />
        ))}
      </div>
    );
  }
  if (isError) {
    return <div className="text-center text-red-500 py-16">Erreur lors du chargement des horaires.</div>;
  }
  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <svg width="64" height="64" fill="none" viewBox="0 0 64 64" className="mb-4"><circle cx="32" cy="32" r="32" fill="#F3F4F6"/><path d="M20 44h24M24 28a8 8 0 1 1 16 0c0 4.418-3.582 8-8 8s-8-3.582-8-8Z" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M32 36v4" stroke="#A1A1AA" strokeWidth="2" strokeLinecap="round"/></svg>
        <div className="font-semibold text-lg mb-1">Aucun voyage trouvé</div>
        <div className="text-sm text-gray-400">Essayez de modifier vos filtres ou la date de recherche.</div>
      </div>
    );
  }
  if (view === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((dest, i) => (
          <DestinationCard key={i} {...(dest as DestinationCardProps)} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {results.map((dest, i) => (
        <DestinationCardHorizontal key={i} {...(dest as DestinationCardHorizontalProps)} />
      ))}
    </div>
  );
}
