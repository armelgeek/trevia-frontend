"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { useKpis, useTopDestinations, useUpcomingDepartures, useRecentBookings } from '@/features/dashboard/hooks';
import { KpiStats } from '@/features/dashboard/components/KpiStats';
import CancelledDeparturesSection from '@/features/dashboard/components/CancelledDeparturesSection';
import TopDestinationsSection from '@/features/dashboard/components/TopDestinationsSection';
import UpcomingDeparturesSection from '@/features/dashboard/components/UpcomingDeparturesSection';
import RecentBookingsSection from '@/features/dashboard/components/RecentBookingsSection';
import DashboardPeriodFilter from '@/features/dashboard/components/DashboardPeriodFilter';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<'day' | 'month' | 'year'>('day');
  const { data: kpis, isLoading: loadingKpis } = useKpis(period);
  const { data: topDest, isLoading: loadingTopDest } = useTopDestinations(period);
  const { data: upcoming, isLoading: loadingUpcoming } = useUpcomingDepartures(period);
  const { data: recentBookings, isLoading: loadingRecent } = useRecentBookings(period);

  if (loadingKpis || loadingTopDest || loadingUpcoming || loadingRecent) {
    return (
      <div className="flex flex-col gap-6 p-8">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-80 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-4 py-2 md:p-8 min-h-screen">
      <DashboardPeriodFilter value={period} onChange={setPeriod} />
      <KpiStats kpis={kpis} />
      <TopDestinationsSection topDest={topDest} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UpcomingDeparturesSection upcoming={upcoming} />
        <RecentBookingsSection recentBookings={recentBookings} />
      </div>
      <CancelledDeparturesSection />
    </div>
  );
}
