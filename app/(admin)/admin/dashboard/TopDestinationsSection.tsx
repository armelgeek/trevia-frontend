import { Card } from '@/shared/components/atoms/ui/card';
import { ChartContainer, ChartLegend, ChartTooltip } from '@/shared/components/atoms/ui/chart';
import * as RechartsPrimitive from 'recharts';

interface TopDestination {
  routeId: string;
  routeLabel: string;
  bookings: number;
}

interface TopDestinationsSectionProps {
  topDest: { topDestinations: TopDestination[] } | undefined;
}

export default function TopDestinationsSection({ topDest }: TopDestinationsSectionProps) {
  const destinations = topDest?.topDestinations || [];
  return (
    <Card className="shadow-md border-0 rounded-md mb-4  bg-white dark:bg-zinc-900 flex flex-col md:flex-row">
      <div className="flex-1 p-6 flex flex-col">
        <div className="font-semibold text-lg flex flex-row items-center gap-2 pb-2">
          <span>🏆</span> Top destinations
        </div>
        <ul className="mt-4 space-y-2">
          {destinations.length > 0 ? destinations.slice(0, 5).map((dest) => (
            <li key={dest.routeId} className="flex items-center justify-between text-sm">
              <span className="truncate max-w-[160px] font-medium">{dest.routeLabel}</span>
              <span className="ml-2 text-primary-600 font-bold">{dest.bookings}</span>
            </li>
          )) : (
            <li className="text-muted-foreground text-sm">Aucune donnée à afficher</li>
          )}
        </ul>
      </div>
      <div className="flex-[1.5] min-w-[400px]  p-4 flex items-center justify-center">
        {destinations.length > 0 ? (
          <ChartContainer
            config={{
              bookings: { label: "Réservations", color: "#CC0000" },
            }}
            className="w-[500px] h-[400px]"
          >
            <RechartsPrimitive.BarChart data={destinations} barSize={32} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <RechartsPrimitive.XAxis dataKey="routeLabel" tick={{ fontSize: 13 }} />
              <RechartsPrimitive.YAxis tick={{ fontSize: 13 }} />
              <RechartsPrimitive.Bar dataKey="bookings" fill="#CC0000" radius={[8,8,0,0]} />
              <ChartTooltip />
              <ChartLegend />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        ) : null}
      </div>
    </Card>
  );
}
