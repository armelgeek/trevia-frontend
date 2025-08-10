import { Card, CardHeader, CardContent } from '@/shared/components/atoms/ui/card';
import { Table, TableHeader, TableBody } from '@/shared/components/atoms/ui/table';
import { CalendarX2, Clock } from 'lucide-react';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';

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
  isLoading?: boolean;
}

export default function UpcomingDeparturesSection({ upcoming, isLoading }: UpcomingDeparturesSectionProps) {
  const hasData = upcoming?.upcomingDepartures && upcoming.upcomingDepartures.length > 0;

  if (isLoading) {
    return (
      <Card className="shadow-md border-0 bg-white dark:bg-zinc-900">
        <CardHeader className="font-semibold text-base flex flex-row items-center gap-2 pb-2">
          <Clock className="w-4 h-4 text-primary" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-row xl:flex-row gap-6 xl:gap-10">
            <div className="flex-[1.2] min-w-[320px]">
              <Table className="text-sm">
                <TableHeader>
                  <tr className="bg-muted/60">
                    <th className="px-3 py-2 text-left font-medium"><Skeleton className="h-4 w-20" /></th>
                    <th className="px-3 py-2 text-left font-medium"><Skeleton className="h-4 w-24" /></th>
                    <th className="px-3 py-2 text-left font-medium"><Skeleton className="h-4 w-16" /></th>
                  </tr>
                </TableHeader>
                <TableBody>
                  {[...Array(3)].map((_, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="px-3 py-2"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-3 py-2"><Skeleton className="h-4 w-40" /></td>
                      <td className="px-3 py-2"><Skeleton className="h-4 w-12" /></td>
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

  return (
    <Card className="shadow-md border-0 bg-white dark:bg-zinc-900">
      <CardHeader className="font-semibold text-base flex flex-row items-center gap-2 pb-2">
        <Clock className="w-4 h-4 text-primary" /> 
        Prochains départs
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-row xl:flex-row gap-6 xl:gap-10">
          {hasData ? (
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
                  {upcoming.upcomingDepartures.map((dep) => (
                    <tr key={dep.scheduleId} className="border-b last:border-0 hover:bg-muted/40 transition">
                      <td className="px-3 py-2 font-medium text-primary">{dep.routeLabel}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {dep.departureTime}
                      </td>
                      <td className="px-3 py-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                          ${dep.occupancy >= 80 ? 'bg-red-100 text-red-800' : 
                          dep.occupancy >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                          {dep.occupancy}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center text-muted-foreground">
              <CalendarX2 className="w-12 h-12 mb-3 text-muted-foreground/50" />
              <p className="text-sm font-medium">Aucun départ prévu</p>
              <p className="text-sm mt-1">{"Les prochains départs s'afficheront ici"}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
