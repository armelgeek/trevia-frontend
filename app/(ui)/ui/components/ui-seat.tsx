"use client";

import { LabeledSection } from "./ui-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Seat, 
  DriverSeat, 
  BusLayout, 
  BusRow, 
  BusAisle, 
  EmptySpace
} from "@/components/ui/seat";
import { useState } from "react";

export function SeatSample() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = (seatNumber: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber) 
        ? prev.filter(seat => seat !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const getSeatStatus = (seatNumber: string) => {
    // Quelques sièges occupés pour la démonstration
    const occupiedSeats = ['03', '07', '11'];
    if (occupiedSeats.includes(seatNumber)) return 'unavailable';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const resetSelection = () => {
    setSelectedSeats([]);
  };

  // Génération du layout bus simple (14 places)
  const generateSimpleBusLayout = () => {
    const rows = [];
    
    // Rangée du chauffeur avec 2 sièges à côté
    rows.push(
      <BusRow key="driver" rowNumber={0}>
        <DriverSeat />
        <EmptySpace />
        <BusAisle />
        <Seat 
          seatNumber="01"
          status={getSeatStatus("01")}
          onSeatClick={handleSeatClick}
          isAisle={true}
        />
        <Seat 
          seatNumber="02"
          status={getSeatStatus("02")}
          onSeatClick={handleSeatClick}
          isWindow={true}
        />
      </BusRow>
    );

    // 3 rangées de 4 sièges (2+2 configuration)
    for (let row = 1; row <= 3; row++) {
      const seatBase = (row - 1) * 4 + 3; // Commence à 03 pour la première rangée
      const leftWindow = String(seatBase).padStart(2, '0');
      const leftAisle = String(seatBase + 1).padStart(2, '0');
      const rightAisle = String(seatBase + 2).padStart(2, '0');
      const rightWindow = String(seatBase + 3).padStart(2, '0');

      rows.push(
        <BusRow key={row} rowNumber={row}>
          <Seat 
            seatNumber={leftWindow}
            status={getSeatStatus(leftWindow)}
            onSeatClick={handleSeatClick}
            isWindow={true}
          />
          <Seat 
            seatNumber={leftAisle}
            status={getSeatStatus(leftAisle)}
            onSeatClick={handleSeatClick}
            isAisle={true}
          />
          <BusAisle />
          <Seat 
            seatNumber={rightAisle}
            status={getSeatStatus(rightAisle)}
            onSeatClick={handleSeatClick}
            isAisle={true}
          />
          <Seat 
            seatNumber={rightWindow}
            status={getSeatStatus(rightWindow)}
            onSeatClick={handleSeatClick}
            isWindow={true}
          />
        </BusRow>
      );
    }

    return rows;
  };

  return (
    <div className="space-y-8">
      <LabeledSection label="🚌 Minibus (14 places) - Configuration Simple">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-b from-blue-50 to-blue-100 border-2 border-blue-400 rounded"></div>
                <span className="text-sm text-gray-600">Disponible</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-b from-green-400 to-green-600 border-2 border-green-600 rounded"></div>
                <span className="text-sm text-gray-600">Sélectionné</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-b from-gray-100 to-gray-200 border-2 border-gray-300 rounded opacity-60"></div>
                <span className="text-sm text-gray-600">Occupé</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-b from-blue-50 to-blue-100 border-l-4 border-l-sky-300 border-2 border-blue-400 rounded"></div>
                <span className="text-sm text-gray-600">Fenêtre</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {selectedSeats.length > 0 && (
                <Badge variant="secondary">
                  {selectedSeats.length} siège{selectedSeats.length > 1 ? 's' : ''} sélectionné{selectedSeats.length > 1 ? 's' : ''}
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={resetSelection}>
                Effacer sélection
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <BusLayout busNumber="MINI-001">
              {generateSimpleBusLayout()}
            </BusLayout>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p><strong>Structure :</strong> 1 chauffeur + 2 sièges à côté + 3 rangées de 4 sièges = 14 places</p>
            <p>✅ Configuration compacte et efficace pour les trajets courts</p>
          </div>
        </div>
      </LabeledSection>

      <LabeledSection label="Types de Sièges">
        <div className="flex items-center justify-center space-x-6 p-6 bg-gray-50 rounded-lg">
          <div className="text-center space-y-2">
            <Seat seatNumber="01" status="available" />
            <span className="text-xs text-gray-600">Standard</span>
          </div>
          <div className="text-center space-y-2">
            <Seat seatNumber="02" status="selected" />
            <span className="text-xs text-gray-600">Sélectionné</span>
          </div>
          <div className="text-center space-y-2">
            <Seat seatNumber="03" status="unavailable" />
            <span className="text-xs text-gray-600">Occupé</span>
          </div>
          <div className="text-center space-y-2">
            <Seat seatNumber="04" status="available" isWindow={true} />
            <span className="text-xs text-gray-600">Fenêtre</span>
          </div>
          <div className="text-center space-y-2">
            <Seat seatNumber="05" status="available" isAisle={true} />
            <span className="text-xs text-gray-600">Allée</span>
          </div>
          <div className="text-center space-y-2">
            <DriverSeat />
            <span className="text-xs text-gray-600">Chauffeur</span>
          </div>
        </div>
      </LabeledSection>

      {selectedSeats.length > 0 && (
        <LabeledSection label="Récapitulatif de Sélection">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="text-center space-y-4">
              <h3 className="font-semibold text-green-800 text-lg">
                🎫 Sièges sélectionnés ({selectedSeats.length})
              </h3>
              
              <div className="flex flex-wrap justify-center gap-2">
                {selectedSeats.map(seat => (
                  <Badge key={seat} variant="secondary" className="bg-green-100 text-green-800">
                    Siège {seat}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  💡 Sièges fenêtre pour la vue, sièges allée pour l&apos;accès facile
                </p>
                <div className="space-x-2">
                  <Button 
                    onClick={resetSelection}
                    variant="outline"
                    size="sm"
                  >
                    🔄 Réinitialiser
                  </Button>
                  <Button size="sm">
                    ✅ Confirmer la sélection
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </LabeledSection>
      )}

      <LabeledSection label="Informations du Véhicule">
        <div className="bg-white border rounded-lg p-6 shadow-sm max-w-md mx-auto">
          <div className="text-center space-y-4">
            <h3 className="font-semibold text-gray-800">🚌 Minibus MINI-001</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-left">
                <p><strong>Places totales :</strong> 14</p>
                <p><strong>Configuration :</strong> 2+2</p>
                <p><strong>Type :</strong> Minibus</p>
              </div>
              <div className="text-left">
                <p><strong>Sièges fenêtre :</strong> 8</p>
                <p><strong>Sièges allée :</strong> 4</p>
                <p><strong>Chauffeur :</strong> 1</p>
              </div>
            </div>
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">
                Structure : Chauffeur + 2 sièges adjacents + 3 rangées de 4 sièges
              </p>
            </div>
          </div>
        </div>
      </LabeledSection>
    </div>
  );
}
