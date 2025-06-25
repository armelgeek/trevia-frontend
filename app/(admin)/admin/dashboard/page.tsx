"use client";
import { Calendar, Plane } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboard } from '@/features/dashboard/hooks/use-dashboard';
import { StatsCard } from '@/shared/components/molecules/dashboard';

export default function DashboardAdminPage() {
  const { data, isLoading, error } = useDashboard();
  const dashboard = data?.data as { totalBookings: number; totalTrips: number; alerts: { title: string; description: string }[] } | undefined;

  if (isLoading) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const stats = [
    { title: 'Réservations', value: dashboard?.totalBookings ?? 0, icon: Calendar },
    { title: 'Voyages', value: dashboard?.totalTrips ?? 0, icon: Plane },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} value={String(stat.value)} title={stat.title} icon={stat.icon} />
        ))}
      </div>
      <div className="grid gap-2">
        {dashboard?.alerts?.map((alert, i) => (
          <Alert key={i} variant="default">
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}
