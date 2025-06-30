"use client";

import { Filter } from "lucide-react";
import { Button } from "@/shared/components/atoms/ui/button";

interface DestinationsFilterSidebarProps {
  from: string;
  to: string;
  search: string;
  view: 'grid' | 'list';
  departureCities: string[];
  destinationCities: string[];
  vehicleTypes: string[];
  selectedVehicleType: string;
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  sort: string;
  onFromChange: (city: string) => void;
  onToChange: (city: string) => void;
  onSearchChange: (value: string) => void;
  onVehicleTypeChange: (type: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
  onViewChange: (view: 'grid' | 'list') => void;
}

export function DestinationsFilterSidebar({
  from,
  to,
  departureCities,
  destinationCities,
  vehicleTypes,
  selectedVehicleType,
  onFromChange,
  onToChange,
  onVehicleTypeChange,
  onReset
}: DestinationsFilterSidebarProps) {

  return (
    <aside className="hidden md:flex md:w-[300px] flex-col gap-6 bg-white/90 rounded-xl p-6 shadow-sm border h-fit sticky top-44 z-10">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="w-4 h-4 text-primary" />
        <span className="font-semibold text-base">Filtres</span>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-medium text-sm">Départ</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              size="sm"
              variant={from === "" ? "default" : "outline"}
              onClick={() => onFromChange("")}
            >
              Tous
            </Button>
            {departureCities.map(city => (
              <Button
                key={city}
                size="sm"
                variant={from === city ? "default" : "outline"}
                onClick={() => onFromChange(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <span className="font-medium text-sm">Arrivée</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              size="sm"
              variant={to === "" ? "default" : "outline"}
              onClick={() => onToChange("")}
            >
              Tous
            </Button>
            {destinationCities.map(city => (
              <Button
                key={city}
                size="sm"
                variant={to === city ? "default" : "outline"}
                onClick={() => onToChange(city)}
              >
                {city}
              </Button>
            ))}
          </div>
        </div>
       
        <div>
          <span className="font-medium text-sm">Type de véhicule</span>
          <div className="flex flex-wrap gap-2 mt-2">
            <Button
              size="sm"
              variant={selectedVehicleType === "" ? "default" : "outline"}
              onClick={() => onVehicleTypeChange("")}
            >
              Tous
            </Button>
            {vehicleTypes.map(type => (
              <Button
                key={type}
                size="sm"
                variant={selectedVehicleType === type ? "default" : "outline"}
                onClick={() => onVehicleTypeChange(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          Réinitialiser
        </Button>
       
      </div>
    </aside>
  );
}
