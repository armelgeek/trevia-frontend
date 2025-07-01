import { BaseService } from '@/lib/base-service';
import { API_ENDPOINTS } from '@/shared/config/api';

export const retryPaymentService = new BaseService(API_ENDPOINTS.retryPayment);

export async function retryPayment(bookingId: string) {
  return fetch(API_ENDPOINTS.retryPayment, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ bookingId }),
  }).then(res => res.json());
}
