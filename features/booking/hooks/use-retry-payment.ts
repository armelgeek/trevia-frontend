import { useMutation } from '@tanstack/react-query';
import { retryPayment } from '../retry-payment.service';

export function useRetryPayment() {
  return useMutation({
    mutationFn: retryPayment,
  });
}
