"use client";

import { LabeledSection } from "./ui-section";
import { Seat } from "@/shared/components/atoms/ui/seat";
import { useTripSeats } from "@/features/trip/hooks/use-trip-seats";

export function TripSeatsGrid({ tripId }: { tripId: string }) {
  const { data, isLoading, error } = useTripSeats(tripId);

  if (isLoading) return <div>Chargement des sièges...</div>;
  if (error) return <div>Erreur lors du chargement des sièges</div>;
  if (!data || data.length === 0) return <div>Aucun horaire trouvé pour ce voyage.</div>;

  return (
    <div>
      <div className="flex justify-between mb-8">
        {data.map(schedule => {
          const seatStatusMap = Object.fromEntries(
            schedule.seats.map(s => [s.seatNumber, s.status === 'reserved' ? 'unavailable' : s.status])
          );
          return (
            <div key={schedule.scheduleId} className="w-64">
              <LabeledSection label={`🕒 Départ: ${schedule.departureTime} - Arrivée: ${schedule.arrivalTime}`}>
                <div className="grid grid-cols-4 gap-3 justify-center">
                  {schedule.seats.map(seat => (
                    <Seat
                      key={seat.seatNumber}
                      seatNumber={seat.seatNumber}
                      status={seatStatusMap[seat.seatNumber] || 'available'}
                    />
                  ))}
                </div>
              </LabeledSection>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center gap-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-b from-blue-50 to-blue-100 border-2 border-blue-400 rounded"></div>
          <span className="text-sm text-gray-600">Disponible</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-300 rounded opacity-60"></div>
          <span className="text-sm text-gray-600">Occupé</span>
        </div>
      </div>
    </div>
  );
}
