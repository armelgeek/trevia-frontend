import { Card, CardHeader, CardContent } from '@/shared/components/atoms/ui/card';
import { useDashboardAlerts } from '@/features/dashboard/hooks';

export default function DashboardAlertsSection() {
  const { data, isLoading, error } = useDashboardAlerts();
  return (
    <div className="mt-2">
      <Card className="shadow-md border-0 bg-white dark:bg-zinc-900">
        <CardHeader className="font-semibold text-base flex flex-row items-center gap-2 pb-2">
          <span>⚠️</span> Alertes système
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="text-muted-foreground text-sm">Chargement...</div>
          ) : error ? (
            <div className="text-destructive text-sm">Erreur lors du chargement</div>
          ) : data?.alerts && data.alerts.length > 0 ? (
            <ul className="list-disc pl-6 space-y-1">
              {data.alerts.map((alert, i) => (
                <li key={i} className="text-destructive text-sm">{alert}</li>
              ))}
            </ul>
          ) : (
            <div className="text-muted-foreground text-sm">Aucune alerte</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
