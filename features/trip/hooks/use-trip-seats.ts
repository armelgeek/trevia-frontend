import { useEntityQuery } from '@/shared/hooks/use-entity-query';
import { tripSeatsService } from '../trip.service';

export interface TripSeat {
  scheduleId: string;
  departureTime: string;
  arrivalTime: string;
  vehicleRegistration: string;
  vehicleCapacity: string;
  seats: Array<{
    id: string;
    seatNumber: string;
    status: 'available' | 'unavailable' | 'reserved' | 'free';
  }>;
  seatsById?: Record<string, {
    id: string;
    seatNumber: string;
    status: 'available' | 'unavailable' | 'reserved' | 'free';
  }>;
}

export function useTripSeats(tripId: string, scheduleId?: string) {
  return useEntityQuery<TripSeat[]>({
    service: tripSeatsService,
    queryKey: ['tripSeats', tripId, scheduleId],
    params: {
      tripId,
      ...(scheduleId ? { scheduleId } : {})
    },
    enabled: !!tripId,
    select: (data) =>
      data.map(schedule => ({
        ...schedule,
        seatsById: Object.fromEntries(
          (schedule.seats || []).map(seat => [seat.id, seat])
        )
      })),
  });
}
