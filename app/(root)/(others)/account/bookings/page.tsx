"use client";

import { useUserBookings } from '@/features/booking/hooks/use-user-bookings';
import { Skeleton } from '@/shared/components/atoms/ui/skeleton';
import { Button } from '@/shared/components/atoms/ui/button';
import { useRetryPayment } from '@/features/booking/hooks/use-retry-payment';

export default function UserBookingsPage() {
  const { data, isLoading, error } = useUserBookings();
  const { mutate: retryPayment, isPending } = useRetryPayment();

  if (isLoading) return <Skeleton className="h-32 w-full" />;
  if (error) return <div className="text-destructive">Erreur lors du chargement des réservations</div>;
  if (!data || !data.data.length) return <div>Aucune réservation trouvée.</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Mes réservations</h1>
      <div className="space-y-4">
        {data.data.map((booking) => (
          <div key={booking.bookingId} className="border rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-semibold">{booking.routeLabel}</div>
              <div className="text-sm text-muted-foreground">Réservé le : {new Date(booking.bookedAt).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Statut : {booking.status}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-xs text-muted-foreground">ID réservation : {booking.bookingId}</div>
              {booking.status === 'pending' && (
                <Button
                  size="sm"
                  disabled={isPending}
                  onClick={() => {
                    retryPayment(booking.bookingId, {
                      onSuccess: (res) => {
                        if (res && res.paymentUrl) {
                          window.location.href = res.paymentUrl;
                        }
                      },
                    });
                  }}
                >
                  Régler / Réessayer le paiement
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
