import { useQuery } from '@tanstack/react-query';
import { API_URL } from '@/shared/lib/config/api';
export interface TripSeat {
  scheduleId: string;
  departureTime: string;
  arrivalTime: string;
  seats: Array<{
    seatNumber: string;
    status: 'available' | 'unavailable' | 'reserved';
  }>;
}

async function fetchTripSeats(tripId: string): Promise<TripSeat[]> {
  const res = await fetch(`${API_URL}/api/schedules/seats?tripId=${tripId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!res.ok) return [];
  const data = await res.json();
  if (!data || !data.data) return [];
  return data.data;
}

export function useTripSeats(tripId: string) {
  return useQuery<TripSeat[]>({
    queryKey: ['tripSeats', tripId],
    queryFn: () => fetchTripSeats(tripId),
    enabled: !!tripId,
  });
}
