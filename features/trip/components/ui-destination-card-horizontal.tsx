"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Button } from "@/shared/components/atoms/ui/button";
import { Clock, MapPin, Euro } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface DestinationCardHorizontalProps {
  tripId: string;
  scheduleId: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  departure?: string;
  dateDeparture?: string;
  distanceKm?: string;
  isPopular?: boolean;
  availableSeats?: number;
  totalSeats?: number;
  vehicleType?: string;
  image?: string;
  className?: string;
  vehicleEquipment: string[],
}

export function DestinationCardHorizontal({
  tripId,
  scheduleId,
  from,
  to,
  dateDeparture,
  price,
  departure,
  duration,
  distanceKm,
  availableSeats,
  totalSeats,
  image,
  className,
  vehicleEquipment = [],
  vehicleType,
}: DestinationCardHorizontalProps) {
  const router = useRouter();
  const formattedDate = dateDeparture ? new Date(dateDeparture).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' }) : '--';

  const formattedTime = departure ? departure : '--:--';

  const handleBook = () => {
    router.push(`/booking?tripId=${tripId}&scheduleId=${scheduleId}`)
  };

  return (
    <Card className={`overflow-hidden  border-none group flex flex-col md:flex-row items-stretch transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
      {/* Image ou bandeau gradient */}
      <div className="relative w-full md:w-64 h-40 md:h-auto flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
        {image && (
          <Image src={image} alt={`${from} to ${to}`} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
        {/* Prix en haut à droite */}
        <div className="absolute right-2 top-2 z-10">
          <div className="bg-gradient-to-r from-primary to-highlight text-white px-3 py-2 rounded-lg text-right shadow">
            <div className="text-xs opacity-90">À partir de</div>
            <div className="text-xl font-bold">{price}€</div>
          </div>
        </div>
        {/* Visualisation route horizontale EN BAS */}
        <div className="absolute bottom-0 left-0 w-full px-6 pb-3 z-10">
          <div className="relative flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-md"></div>
              <span className="text-xs font-medium mt-2 text-white drop-shadow">{from}</span>
            </div>
            <div className="flex-1 mx-4 relative">
              <div className="h-0.5 bg-gradient-to-r from-primary to-highlight"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/80 border border-gray-200 px-2 py-1 rounded text-xs text-gray-700">
                  {distanceKm} km
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-highlight rounded-full border-2 border-white shadow-md"></div>
              <span className="text-xs font-medium mt-2 text-white drop-shadow">{to}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Infos et actions */}
      <CardContent className="flex-1 flex flex-col justify-center p-6 relative">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-extrabold text-gray-900 leading-tight">{from} <span className="text-primary">→</span> {to}</h3>
            {vehicleType && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2 font-semibold uppercase">{vehicleType}</span>
            )}
          </div>
          {/* Date et heure de départ en avant */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center bg-primary/10 text-primary font-bold rounded px-3 py-1 text-lg md:text-xl shadow-sm">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-extrabold mr-2">{formattedDate}</span>
              <span className="mx-2 text-primary font-extrabold text-base">•</span>
              <span className="font-bold text-base">{formattedTime}</span>
            </span>
          </div>
          {/* Equipements dynamiques */}
          <div className="flex gap-3 mb-2">
            {vehicleEquipment.map((eq) => (
              <span key={eq} className="flex items-center uppercase gap-1 text-xs text-gray-700 bg-white/80 border border-gray-200 px-2 py-0.5 rounded">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {eq}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-700 mb-2">
           
            <span className="mx-1 text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              Durée&nbsp;:
              <span className="font-medium">{duration || '--:--'}</span>
            </span>
            <span className="mx-1 text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary" />
              Départs quotidiens
            </span>
            <span className="mx-1 text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Euro className="w-4 h-4 text-primary" />
              Tarif économique
            </span>
            {typeof availableSeats === 'number' && typeof totalSeats === 'number' && (
              <>
                <span className="mx-1 text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="4" y="7" width="16" height="10" rx="3"/><path d="M4 11h16"/></svg>
                  <span className="font-medium">{availableSeats}/{totalSeats} places</span>
                </span>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button size="icon" variant="outline" className="rounded-full w-8 h-8 p-0" aria-label="Réserver" onClick={handleBook}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
