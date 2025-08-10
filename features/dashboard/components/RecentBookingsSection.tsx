import { Card, CardHeader, CardContent } from '@/shared/components/atoms/ui/card';
import { Table, TableHeader, TableBody } from '@/shared/components/atoms/ui/table';
import { Badge } from '@/shared/components/atoms/ui/badge';

interface RecentBooking {
  bookingId: string;
  userName: string;
  tripId: string;
  routeLabel: string;
  bookedAt: string;
  status: string;
}

interface RecentBookingsSectionProps {
  recentBookings: { recentBookings: RecentBooking[] } | undefined;
}

export default function RecentBookingsSection({ recentBookings }: RecentBookingsSectionProps) {
  const bookings = recentBookings?.recentBookings as RecentBooking[] | undefined;
  const isEmpty = !bookings || bookings.length === 0;
  return (
    <Card className="shadow-md border-0 bg-white dark:bg-zinc-900">
      <CardHeader className="font-semibold text-base flex flex-row items-center gap-2 pb-2">
        <span>📝</span> Réservations récentes
      </CardHeader>
      <CardContent className="pt-0">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <span className="text-3xl mb-2">📭</span>
            <span>Aucune réservation récente</span>
          </div>
        ) : (
          <Table className="text-sm">
            <TableHeader>
              <tr className="bg-muted/60">
                <th className="px-3 py-2 text-left font-medium">Utilisateur</th>
                <th className="px-3 py-2 text-left font-medium">Ligne</th>
                <th className="px-3 py-2 text-left font-medium">Date</th>
                <th className="px-3 py-2 text-left font-medium">Statut</th>
              </tr>
            </TableHeader>
            <TableBody>
              {bookings?.map((b) => (
                <tr key={b.bookingId} className="border-b last:border-0 hover:bg-muted/40 transition">
                  <td className="px-3 py-2">{b.userName}</td>
                  <td className="px-3 py-2">{b.routeLabel}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{new Date(b.bookedAt).toLocaleString()}</td>
                  <td className="px-3 py-2">
                    <Badge variant={b.status === "confirmed" ? "default" : b.status === "cancelled" ? "destructive" : "secondary"}>
                      {b.status === "confirmed" ? "Confirmée" : b.status === "cancelled" ? "Annulée" : b.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
