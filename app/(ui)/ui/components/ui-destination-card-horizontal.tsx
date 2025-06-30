"use client";

import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Clock, MapPin, Euro, Star } from "lucide-react";
import Image from "next/image";

interface DestinationCardHorizontalProps {
  from: string;
  to: string;
  duration: string;
  price: number;
  departureTime?: string;
  isPopular?: boolean;
  isDirect?: boolean;
  image?: string;
  className?: string;
}

export function DestinationCardHorizontal({
  from,
  to,
  duration,
  price,
  departureTime,
  isPopular = false,
  isDirect = true,
  image,
  className
}: DestinationCardHorizontalProps) {
  return (
    <Card className={`overflow-hidden shadow-lg group flex flex-col md:flex-row items-stretch transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
      {/* Image ou bandeau gradient */}
      <div className="relative w-full md:w-64 h-40 md:h-auto flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
        {image && (
          <Image src={image} alt={`${from} to ${to}`} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        {isPopular && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              <Star className="w-3 h-3 mr-1" />
              POPULAIRE
            </Badge>
          </div>
        )}
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
                  {duration}
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
            {isDirect && (
              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs ml-2 font-semibold">Direct</span>
            )}
          </div>
          {/* Confort bus : Wi-Fi, clim, USB */}
          <div className="flex gap-3 mb-2">
            <span className="flex items-center gap-1 text-xs text-gray-700 bg-white/80 border border-gray-200 px-2 py-0.5 rounded">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M2 8c5-5 15-5 20 0" strokeLinecap="round"/><path d="M5 11c3.5-3.5 10.5-3.5 14 0" strokeLinecap="round"/><path d="M8.5 14.5c2-2 5-2 7 0" strokeLinecap="round"/><circle cx="12" cy="18" r="1.5"/></svg>
              Wi-Fi
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-700 bg-white/80 border border-gray-200 px-2 py-0.5 rounded">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="6" y="3" width="12" height="18" rx="3"/><path d="M9 7h6"/><path d="M9 11h6"/><path d="M9 15h6"/></svg>
              Climatisation
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-700 bg-white/80 border border-gray-200 px-2 py-0.5 rounded">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="9" y="2" width="6" height="20" rx="2"/><path d="M12 6v4"/><path d="M12 14v4"/></svg>
              USB
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-700 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />
              Départ&nbsp;:
              <span className="font-medium">{departureTime || "--:--"}</span>
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
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <Button size="icon" variant="outline" className="rounded-full w-8 h-8 p-0" aria-label="Réserver">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
