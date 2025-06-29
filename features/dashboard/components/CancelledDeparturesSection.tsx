import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useCancelledDepartures } from '@/features/dashboard/hooks';

export default function CancelledDeparturesSection() {
  const { data, isLoading, error } = useCancelledDepartures();

  return (
    <div className="mt-2">
      <Card className="shadow-md border-0 bg-white dark:bg-zinc-900">
        <CardHeader className="font-semibold text-base flex flex-row items-center gap-2 pb-2">
          <span>🚫</span> Voyages annulés
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="text-muted-foreground text-sm">Chargement...</div>
          ) : error ? (
            <div className="text-destructive text-sm">Erreur lors du chargement</div>
          ) : data?.cancelledDepartures && data.cancelledDepartures.length > 0 ? (
            <Table className="text-sm">
              <TableHeader>
                <tr className="bg-muted/60">
                  <th className="px-3 py-2 text-left font-medium">Ligne</th>
                  <th className="px-3 py-2 text-left font-medium">Départ</th>
                  <th className="px-3 py-2 text-left font-medium">Motif</th>
                </tr>
              </TableHeader>
              <TableBody>
                {data.cancelledDepartures.map((dep) => (
                  <tr key={dep.scheduleId} className="border-b last:border-0 hover:bg-muted/40 transition">
                    <td className="px-3 py-2">{dep.routeLabel}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(dep.departureTime).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <Badge variant="destructive">{dep.reason}</Badge>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-muted-foreground text-sm">Aucun voyage annulé</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
