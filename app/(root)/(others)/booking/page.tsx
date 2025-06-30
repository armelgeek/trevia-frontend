"use client";
import { useState } from "react";
import { CheckoutForm } from '@/shared/components/organisms/checkout-form';
import TripSeatsBusCarDemoWrapper from '@/app/(ui)/ui/components/trip-seats-bus-demo';

export default function BookingPage() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState(1);

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
          <TripSeatsBusCarDemoWrapper selectedSeats={selectedSeats} onChangeSelectedSeats={setSelectedSeats} />
          <div className="mt-8 flex justify-end">
            <button
              className="bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-primary/90 transition disabled:opacity-50"
              disabled={false}
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
            <CheckoutForm selectedSeats={selectedSeats} />
            <div className="mt-6 flex justify-between">
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
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
