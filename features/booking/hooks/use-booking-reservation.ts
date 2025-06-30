import { useMutation } from '@tanstack/react-query';
import { bookingReservationService } from '../booking-reservation.service';

interface BookingReservationPayload {
  tripId: string;
  seatIds: string[];
  scheduleId?: string;
}

interface BookingReservationResponse {
  success: boolean;
  paymentUrl: string;
}

export function useBookingReservation() {
  return useMutation<BookingReservationResponse, Error, BookingReservationPayload>({
    mutationFn: async (payload) => {
      const res = await bookingReservationService.post('', payload);
      return res.data as BookingReservationResponse;
    },
  });
}
