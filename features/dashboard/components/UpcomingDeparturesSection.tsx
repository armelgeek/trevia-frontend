import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody } from '@/components/ui/table';
interface Departure {
  scheduleId: string;
  tripId: string;
  routeLabel: string;
  departureTime: string;
  occupancy: number;
  status: string;
}

interface UpcomingDeparturesSectionProps {
  upcoming: { upcomingDepartures: Departure[] } | undefined;
}

export default function UpcomingDeparturesSection({ upcoming }: UpcomingDeparturesSectionProps) {
  return (
    <Card className="shadow-md border-0 bg-white  dark:bg-zinc-900">
      <CardHeader className="font-semibold text-base flex flex-row items-center gap-2 pb-2">
        <span>⏰</span> Prochains départs
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-row xl:flex-row gap-6 xl:gap-10">
          <div className="flex-[1.2] min-w-[320px]">
            <Table className="text-sm">
              <TableHeader>
                <tr className="bg-muted/60">
                  <th className="px-3 py-2 text-left font-medium">Ligne</th>
                  <th className="px-3 py-2 text-left font-medium">Départ</th>
                  <th className="px-3 py-2 text-left font-medium">Occupation</th>
                </tr>
              </TableHeader>
              <TableBody>
                {(upcoming?.upcomingDepartures as Departure[] | undefined)?.map((dep) => (
                  <tr key={dep.scheduleId} className="border-b last:border-0 hover:bg-muted/40 transition">
                    <td className="px-3 py-2">{dep.routeLabel}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{new Date(dep.departureTime).toLocaleString()}</td>
                    <td className="px-3 py-2 font-semibold">{dep.occupancy}%</td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        
        </div>
      </CardContent>
    </Card>
  );
}
