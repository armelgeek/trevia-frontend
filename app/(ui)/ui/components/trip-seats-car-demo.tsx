"use client";

import { useState, useMemo } from "react";
import { LabeledSection } from "./ui-section";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Seat, BusLayout, BusRow } from "@/shared/components/atoms/ui/seat";

interface TripSeatsCarDemoProps {
  capacity?: number; // nombre de places (4, 5, 7...)
  selectedSeats?: string[];
  onChangeSelectedSeats?: (seats: string[]) => void;
}

// Génère les sièges pour une voiture selon la capacité
function generateCarSeats(capacity: number) {
  // Convention : 2 sièges devant, le reste derrière (max 3 par rangée)
  const seats = [];
  // Rangée avant (conducteur + passager)
  seats.push([
    { seatNumber: `A1`, status: "available" },
    { seatNumber: `A2`, status: "available" },
  ]);
  let remaining = capacity - 2;
  let row = 1;
  while (remaining > 0) {
    const rowSeats = [];
    for (let i = 0; i < Math.min(3, remaining); i++) {
      rowSeats.push({ seatNumber: String.fromCharCode(66 + row - 1) + (i + 1), status: "available" });
    }
    seats.push(rowSeats);
    remaining -= rowSeats.length;
    row++;
  }
  return seats;
}

export default function TripSeatsCarDemo({ capacity = 14, selectedSeats: controlledSeats, onChangeSelectedSeats }: TripSeatsCarDemoProps) {
  const [internalSeats, setInternalSeats] = useState<string[]>([]);
  const selectedSeats = controlledSeats !== undefined ? controlledSeats : internalSeats;
  const setSelectedSeats = onChangeSelectedSeats !== undefined ? onChangeSelectedSeats : setInternalSeats;
  // Pour la démo, on rend le siège B2 occupé si possible
  const carSeats = useMemo(() => {
    const seats = generateCarSeats(capacity);
    if (capacity >= 4 && seats[1] && seats[1][1]) seats[1][1].status = "unavailable";
    return seats;
  }, [capacity]);

  const handleSeatClick = (seatNumber: string) => {
    if (onChangeSelectedSeats) {
      if (selectedSeats.includes(seatNumber)) {
        onChangeSelectedSeats(selectedSeats.filter((s: string) => s !== seatNumber));
      } else {
        onChangeSelectedSeats([...selectedSeats, seatNumber]);
      }
    } else {
      if (selectedSeats.includes(seatNumber)) {
        setSelectedSeats(selectedSeats.filter((s: string) => s !== seatNumber));
      } else {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const getSeatStatus = (seatNumber: string) => {
    for (const row of carSeats) {
      const seat = row.find((s) => s.seatNumber === seatNumber);
      if (seat) {
        if (seat.status === "unavailable") return "unavailable";
        if (selectedSeats.includes(seatNumber)) return "selected";
        return "available";
      }
    }
    return "available";
  };

  return (
    <div className="max-w-md mx-auto  p-6">
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-6 rounded-lg px-6 py-3">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-primary/80 border border-primary/80 inline-block" />
            <span className="text-sm text-muted-foreground">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-muted-foreground/40 border border-muted-foreground/40 inline-block" />
            <span className="text-sm text-muted-foreground">Occupé</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-accent border border-accent inline-block" />
            <span className="text-sm text-muted-foreground">Sélectionné</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded border border-dashed border-primary/60 inline-block" />
            <span className="text-sm text-muted-foreground">Fenêtre</span>
          </div>
        </div>
      </div>
      <div className="w-[340px] mx-auto">
        <div className="flex justify-center">
          <BusLayout busNumber={`CAR-${capacity}`}> 
            {/* Rangée avant */}
            <BusRow rowNumber={0}>
              <div className="flex flex-1 justify-center gap-4">
                <Seat
                  seatNumber="A1"
                  status={getSeatStatus("A1")}
                  onSeatClick={handleSeatClick}
                  isAisle={true}
                />
                <Seat
                  seatNumber="A2"
                  status={getSeatStatus("A2")}
                  onSeatClick={handleSeatClick}
                  isWindow={true}
                />
              </div>
            </BusRow>
            {carSeats.slice(1).map((row, i) => (
              <BusRow key={i + 1} rowNumber={i + 1}>
                <div className={`flex flex-1 justify-center gap-4`}>
                  {row.map((seat, idx) => (
                    <Seat
                      key={seat.seatNumber}
                      seatNumber={seat.seatNumber}
                      status={getSeatStatus(seat.seatNumber)}
                      onSeatClick={handleSeatClick}
                      isAisle={row.length === 2 && idx === 0}
                      isWindow={row.length >= 2 && idx === row.length - 1}
                    />
                  ))}
                </div>
              </BusRow>
            ))}
          </BusLayout>
        </div>
        {selectedSeats.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {selectedSeats.map((seat) => (
              <Badge key={seat} variant="secondary" className="hover:bg-primary/10 transition-colors">
                Siège {seat}
              </Badge>
            ))}
            <Button variant="outline" size="sm" onClick={() => setSelectedSeats([])}>
              Effacer sélection
            </Button>
          </div>
        )}
        <LabeledSection label="🕒 Départ: 09:00 - Arrivée: 11:00" />
      </div>
      <div className="mt-10 text-center">
        <span className="font-medium text-lg">Sièges sélectionnés :</span>
        <span className="ml-2 text-base">{selectedSeats.length > 0 ? selectedSeats.join(", ") : "Aucun"}</span>
      </div>
    </div>
  );
}
