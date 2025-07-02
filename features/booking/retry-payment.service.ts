
import { API_ENDPOINTS } from '@/shared/config/api';
import { API_URL } from '../../shared/lib/config/api';
import BaseService from '@/shared/lib/services/base-service';

export const retryPaymentService = new BaseService(API_ENDPOINTS.retryPayment);

export async function retryPayment(bookingId: string) {
  return fetch(API_URL + API_ENDPOINTS.retryPayment, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ bookingId }),
  }).then(res => res.json());
}
