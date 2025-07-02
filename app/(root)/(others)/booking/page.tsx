"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckoutForm } from '@/features/booking/components/checkout-form';
import { TripSeatsBus } from '@/app/(ui)/ui/components/trip-seats-bus';
import { useBookingReservation } from '@/features/booking/hooks/use-booking-reservation';
import { SeatType } from '@/app/(ui)/ui/components/trip-seats-bus';

export default function BookingPage() {
  const [selectedSeats, setSelectedSeats] = useState<SeatType[]>([]);
  const [step, setStep] = useState(1);
  const searchParams = useSearchParams();
  const tripId = searchParams.get('tripId') || '';
  const scheduleId = searchParams.get('scheduleId') || undefined;
  const { mutate: reserve, isPending: loading } = useBookingReservation();
  const [error, setError] = useState<string | null>(null);

  // Dummy booking details for résumé (à remplacer par les vraies données du trip/schedule)
  const booking = {
    tripId,
    from: 'Départ', // à remplacer par la vraie valeur
    to: 'Arrivée', // à remplacer par la vraie valeur
    date: 'Date', // à remplacer par la vraie valeur
    time: 'Heure', // à remplacer par la vraie valeur
    duration: 'Durée', // à remplacer par la vraie valeur
    seats: selectedSeats.map(s => s.seatNumber),
    pricePerSeat: 10, // à remplacer par la vraie valeur
    vehicle: 'Bus', // à remplacer par la vraie valeur
  };

  const handlePayment = () => {
    setError(null);
    reserve(
      {
        tripId,
        seatIds: selectedSeats.map(s => s.id),
        scheduleId
      },
      {
        onSuccess: (data) => {
          if (data.success && data.paymentUrl) {
            window.location.href = data.paymentUrl;
          } else {
            setError('Erreur lors de la création de la réservation.');
          }
        },
        onError: () => {
          setError('Erreur lors de la création de la réservation.');
        }
      }
    );
  };

  return (
    <section className="max-w-3xl mx-auto text-center py-10 px-2 md:px-0 rounded-xl shadow-sm">
      {/* Stepper visuel */}
      <div className="flex items-center justify-center gap-8 mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg border-2 ${step === 1 ? 'bg-primary text-white border-primary' : 'bg-muted text-primary border-muted-foreground'}`}>1</div>
          <span className={`font-medium ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}>Sièges</span>
        </div>
        <div className="w-8 h-px bg-muted-foreground/40" />
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-lg border-2 ${step === 2 ? 'bg-primary text-white border-primary' : 'bg-muted text-primary border-muted-foreground'}`}>2</div>
          <span className={`font-medium ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}>Paiement</span>
        </div>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-primary text-center">Choisissez vos sièges</h1>
      <p className="mb-8 text-muted-foreground text-center">Sélectionnez votre place à bord et poursuivez votre réservation.</p>
      {step === 1 && (
        <div className="bg-white rounded-lg shadow p-6">
          <TripSeatsBus tripId={tripId} scheduleId={scheduleId} selectedSeats={selectedSeats} onChangeSelectedSeats={setSelectedSeats} />
          <div className="mt-8 flex justify-end">
            <button
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition disabled:opacity-50"
              disabled={!tripId}
              onClick={() => {
                setStep(2);
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Continuer
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center">
          <div className="bg-white rounded-lg shadow p-6 w-full max-w-lg">
            <CheckoutForm booking={booking} />
            <div className="mt-6 flex justify-between items-center">
              <button
                className="text-primary underline text-sm font-medium hover:text-primary/80"
                onClick={() => {
                  setStep(1);
                  if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                ← Retour à la sélection
              </button>
              <button
                className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition disabled:opacity-50"
                disabled={loading || selectedSeats.length === 0}
                onClick={handlePayment}
              >
                {loading ? 'Redirection...' : 'Payer'}
              </button>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </div>
        </div>
      )}
    </section>
  );
}
