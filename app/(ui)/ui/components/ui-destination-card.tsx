"use client";

import React from "react";
import { LabeledSection } from "./ui-section";
import { Card, CardContent } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Clock, MapPin, Euro, Star } from "lucide-react";
import Image from "next/image";

interface DestinationCardProps {
  from: string;
  to: string;
  duration: string;
  price: number;
  isPopular?: boolean;
  isDirect?: boolean;
  image?: string;
  className?: string;
  horaires?: string[];
}

export function DestinationCard({ 
  from, 
  to, 
  duration, 
  price, 
  isPopular = false, 
  isDirect = true,
  image,
  className,
  horaires
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
        
        {isPopular && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              <Star className="w-3 h-3 mr-1" />
              POPULAIRE
            </Badge>
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-2xl font-bold mb-1">{from} → {to}</h3>
          <div className="flex items-center space-x-3 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            {isDirect && (
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">
                Direct
              </span>
            )}
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
                {duration}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-highlight rounded-full border-2 border-white shadow-md"></div>
            <span className="text-xs font-medium mt-2 text-gray-700">{to}</span>
          </div>
        </div>
        {/* Horaires sous forme de badges, toujours visibles */}
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

export function DestinationCardSample() {
  const destinations = [
    {
      from: "Paris",
      to: "Lyon",
      duration: "4h30",
      price: 35,
      isPopular: true,
      horaires: ["08:00", "10:30", "14:00", "17:45"]
    },
    {
      from: "Lyon",
      to: "Marseille",
      duration: "3h15",
      price: 28,
      isPopular: false,
      horaires: ["09:00", "13:30", "18:00"]
    },
    {
      from: "Paris",
      to: "Bordeaux",
      duration: "5h45",
      price: 42,
      isPopular: true,
      horaires: ["07:15", "12:00", "16:30"]
    },
    {
      from: "Lille",
      to: "Paris",
      duration: "2h30",
      price: 25,
      isPopular: false,
    },
    {
      from: "Toulouse",
      to: "Montpellier",
      duration: "2h15",
      price: 22,
      isPopular: false,
    },
    {
      from: "Paris",
      to: "Nice",
      duration: "8h30",
      price: 65,
      isPopular: true,
      isDirect: false,
    }
  ];

  return (
    <div className="space-y-8">
      <LabeledSection label="Cartes de Destination">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <DestinationCard
              key={index}
              from={dest.from}
              to={dest.to}
              duration={dest.duration}
              price={dest.price}
              isPopular={dest.isPopular}
              isDirect={dest.isDirect}
              horaires={dest.horaires}
            />
          ))}
        </div>
      </LabeledSection>

      <LabeledSection label="Carte de Destination Simple">
        <div className="max-w-md">
          <DestinationCard
            from="Paris"
            to="Lyon"
            duration="4h30"
            price={35}
            isPopular={true}
          />
        </div>
      </LabeledSection>
    </div>
  );
}
