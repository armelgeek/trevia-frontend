import { Badge } from '@/shared/components/atoms/ui/badge';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import type { Booking } from '@/features/booking/booking.schema';

const STATUS_MAP: Record<Booking['status'], { label: string; color: string; icon: React.ReactNode }> = {
  confirmed: {
    label: 'Confirmée',
    color: 'bg-green-100 text-green-800',
    icon: <CheckCircle className="w-3 h-3 mr-1" />,
  },
  pending: {
    label: 'En attente',
    color: 'bg-yellow-100 text-yellow-800',
    icon: <Clock className="w-3 h-3 mr-1" />,
  },
  cancelled: {
    label: 'Annulée',
    color: 'bg-red-100 text-red-800',
    icon: <XCircle className="w-3 h-3 mr-1" />,
  },
};

export function StatusTag({ status }: { status: Booking['status'] }) {
  const s = STATUS_MAP[status] ?? { label: status, color: 'bg-gray-100 text-gray-800', icon: null };
  return (
    <Badge className={`inline-flex items-center ${s.color}`} variant="plain">
      {s.icon}
      {s.label}
    </Badge>
  );
}
