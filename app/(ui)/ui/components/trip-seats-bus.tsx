"use client";

import { LabeledSection } from "./ui-section";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Seat, DriverSeat, BusLayout, BusRow, BusAisle, EmptySpace } from "@/shared/components/atoms/ui/seat";
import { useState, useEffect } from "react";
import { useTripSeats } from "@/features/trip/hooks/use-trip-seats";

interface TripSeatsBusProps {
  tripId: string;
  selectedSeats?: string[];
  onChangeSelectedSeats?: (seats: string[]) => void;
}

export function TripSeatsBus({ tripId, selectedSeats: controlledSeats, onChangeSelectedSeats }: TripSeatsBusProps) {
  const { data, isLoading, error } = useTripSeats(tripId);
  const [internalSelectedSeats, setInternalSelectedSeats] = useState<string[]>([]);
  const selectedSeats = controlledSeats !== undefined ? controlledSeats : internalSelectedSeats;

  useEffect(() => {
    if (controlledSeats !== undefined) return;
    if (onChangeSelectedSeats) onChangeSelectedSeats(internalSelectedSeats);
  }, [internalSelectedSeats, controlledSeats, onChangeSelectedSeats]);

  if (isLoading) return <div>Chargement des sièges...</div>;
  if (error) return <div>Erreur lors du chargement des sièges</div>;
  if (!data || data.length === 0) return <div>Aucun horaire trouvé pour ce voyage.</div>;

  const handleSeatClick = (seatNumber: string) => {
    let newSeats: string[];
    if (selectedSeats.includes(seatNumber)) {
      newSeats = selectedSeats.filter(s => s !== seatNumber);
    } else {
      newSeats = [...selectedSeats, seatNumber];
    }
    if (controlledSeats !== undefined && onChangeSelectedSeats) {
      onChangeSelectedSeats(newSeats);
    } else {
      setInternalSelectedSeats(newSeats);
    }
  };

  const generateSimpleBusLayout = (occupiedSeats: string[]) => {
    const rows = [];
    const getSeatStatus = (seatNumber: string) => {
      if (occupiedSeats.includes(seatNumber)) return 'unavailable';
      if (selectedSeats.includes(seatNumber)) return 'selected';
      return 'available';
    };
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
    for (let row = 1; row <= 3; row++) {
      const seatBase = (row - 1) * 4 + 3;
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

  // Affichage : un seul bus (cas principal)
  if (data.length === 1) {
    const schedule = data[0];
    const occupiedSeats = schedule.seats.filter(s => s.status === 'unavailable' || s.status === 'reserved').map(s => s.seatNumber);
    return (
      <div>
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-4 bg-muted/50 rounded px-4 py-2">
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-primary/80 border border-primary/80 inline-block" />
              <span className="text-xs text-muted-foreground">Disponible</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-muted-foreground/40 border border-muted-foreground/40 inline-block" />
              <span className="text-xs text-muted-foreground">Occupé</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded bg-accent border border-accent inline-block" />
              <span className="text-xs text-muted-foreground">Sélectionné</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-4 h-4 rounded border border-dashed border-primary/60 inline-block" />
              <span className="text-xs text-muted-foreground">Fenêtre</span>
            </div>
          </div>
        </div>
        <div className="w-[340px] mx-auto">
          <LabeledSection label={`🕒 Départ: ${schedule.departureTime} - Arrivée: ${schedule.arrivalTime}`}>
            <div className="flex justify-center">
              <BusLayout busNumber="MINI-001">
                {generateSimpleBusLayout(occupiedSeats)}
              </BusLayout>
            </div>
            {selectedSeats.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {selectedSeats.map(seat => (
                  <Badge key={seat} variant="secondary">
                    Siège {seat}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" onClick={() => {
                  if (controlledSeats !== undefined && onChangeSelectedSeats) {
                    onChangeSelectedSeats([]);
                  } else {
                    setInternalSelectedSeats([]);
                  }
                }}>
                  Effacer sélection
                </Button>
              </div>
            )}
          </LabeledSection>
        </div>
      </div>
    );
  }

  // Cas fallback : plusieurs bus/horaire (affichage map)
  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-4 bg-muted/50 rounded px-4 py-2">
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-primary/80 border border-primary/80 inline-block" />
            <span className="text-xs text-muted-foreground">Disponible</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-muted-foreground/40 border border-muted-foreground/40 inline-block" />
            <span className="text-xs text-muted-foreground">Occupé</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded bg-accent border border-accent inline-block" />
            <span className="text-xs text-muted-foreground">Sélectionné</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 rounded border border-dashed border-primary/60 inline-block" />
            <span className="text-xs text-muted-foreground">Fenêtre</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-12 justify-center py-6">
        {data.map(schedule => {
          const occupiedSeats = schedule.seats.filter(s => s.status === 'unavailable' || s.status === 'reserved').map(s => s.seatNumber);
          return (
            <div key={schedule.scheduleId} className="w-[340px]">
              <LabeledSection label={`🕒 Départ: ${schedule.departureTime} - Arrivée: ${schedule.arrivalTime}`}>
                <div className="flex justify-center">
                  <BusLayout busNumber="MINI-001">
                    {generateSimpleBusLayout(occupiedSeats)}
                  </BusLayout>
                </div>
                {selectedSeats.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {selectedSeats.map(seat => (
                      <Badge key={seat} variant="secondary">
                        Siège {seat}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                      if (controlledSeats !== undefined && onChangeSelectedSeats) {
                        onChangeSelectedSeats([]);
                      } else {
                        setInternalSelectedSeats([]);
                      }
                    }}>
                      Effacer sélection
                    </Button>
                  </div>
                )}
              </LabeledSection>
            </div>
          );
        })}
      </div>
    </div>
  );
}
