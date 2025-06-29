import { Button } from '@/shared/components/atoms/ui/button';
import { Plus, Bus, CalendarDays, Car } from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link href="/admin/trips/new">
        <Button variant="primary" className="gap-2">
          <Plus className="w-4 h-4" /> Créer un nouveau voyage
        </Button>
      </Link>
      <Link href="/admin/vehicles">
        <Button variant="secondary" className="gap-2">
          <Car className="w-4 h-4" /> Ajouter un véhicule
        </Button>
      </Link>
      <Link href="/admin/bookings?filter=today">
        <Button variant="outline" className="gap-2">
          <CalendarDays className="w-4 h-4" /> Voir les réservations du jour
        </Button>
      </Link>
      <Link href="/admin/trips/upcoming">
        <Button variant="ghost" className="gap-2">
          <Bus className="w-4 h-4" /> Voyages à venir
        </Button>
      </Link>
    </div>
  );
}
