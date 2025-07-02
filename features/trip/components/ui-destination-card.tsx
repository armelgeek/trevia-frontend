"use client";

import React from "react";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Clock, MapPin, Euro } from "lucide-react";
import Image from "next/image";

export interface DestinationCardProps {
  routeLabel: string;
  from: string;
  to: string;
  duration: string;
  price: number;
  isPopular?: boolean;
  isDirect?: boolean;
  image?: string;
  className?: string;
  horaires?: string[];
  distanceKm: string;
}

export function DestinationCard({ 
  routeLabel,
  from, 
  to, 
  duration, 
  price, 
  image,
  className,
  horaires,
  distanceKm,
}: DestinationCardProps) {
  return (
    <Card className={`overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${className}`}>
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        {image && (
          <Image 
            src={image} 
            alt={`${from} to ${to}`}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        
        
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{routeLabel}</h3>
          <div className="flex items-center space-x-3 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
           
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="bg-gradient-to-r from-primary to-highlight text-white px-3 py-2 rounded-lg text-right">
            <div className="text-xs opacity-90">À partir de</div>
            <div className="text-xl font-bold">{price}€</div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Départs quotidiens</span>
            </div>
            <div className="flex items-center space-x-1">
              <Euro className="w-4 h-4" />
              <span>Tarif économique</span>
            </div>
          </div>
        </div>
        
        {/* Route visualization */}
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-primary rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs font-medium mt-2 text-gray-700">{from}</span>
          </div>
          <div className="flex-1 mx-4 relative">
            <div className="h-0.5 bg-gradient-to-r from-primary to-highlight"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white border border-gray-200 px-2 py-1 rounded text-xs text-gray-600">
                {distanceKm}km
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-highlight rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs font-medium mt-2 text-gray-700">{to}</span>
          </div>
        </div>
        {Array.isArray(horaires) && horaires.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {horaires.map((h, idx) => (
              <span key={idx} className="flex items-center gap-1 bg-white/80 border border-gray-200 px-2 py-0.5 rounded text-xs text-primary font-mono">
                <Clock className="w-3 h-3 text-primary" />
                {h}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
