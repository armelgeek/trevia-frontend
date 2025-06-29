import { StatsContainer } from "@/components/ui/stat-card";
import { StatsCard } from '@/shared/components/molecules/dashboard';
import { BadgeDollarSign, Book, Bus, Star } from 'lucide-react';

export interface KpiStatsProps {
  kpis?: {
    totalTrips?: number;
    totalBookings?: number;
    occupancyRate?: number;
    revenue?: number;
  };
}

export function KpiStats({ kpis }: KpiStatsProps) {
  return (
    <StatsContainer title="" backgroundVariant="white">
      <StatsCard
        value={kpis?.totalTrips ?? "-"}
        title="Voyages à venir"
        icon={Bus}
      />
      <StatsCard
        value={kpis?.totalBookings ?? "-"}
        title="Réservations récentes"
        icon={Book}
      />
      <StatsCard
        value={kpis?.occupancyRate ? `${kpis.occupancyRate}%` : "-"}
        title="Taux d'occupation"
        icon={Star}
      />
      <StatsCard
        value={kpis?.revenue ? `${kpis.revenue} €` : "-"}
        title="Chiffre d'affaires"
        icon={BadgeDollarSign}
      />
    </StatsContainer>
  );
}
