"use client";

import { LabeledSection } from "./ui-section";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Button } from "@/shared/components/atoms/ui/button";
import { Seat, DriverSeat, BusLayout, BusRow, BusAisle, EmptySpace } from "@/shared/components/atoms/ui/seat";
import { useState, useEffect } from "react";
import { useTripSeats } from "@/features/trip/hooks/use-trip-seats";

interface TripSeatsBusProps {
  tripId: string;
  scheduleId?: string;
  selectedSeats?: SeatType[];
  onChangeSelectedSeats?: (seats: SeatType[]) => void;
}

export interface SeatType {
  id: string;
  seatNumber: string;
  status: 'available' | 'unavailable' | 'reserved' | 'free';
}

export function TripSeatsBusSkeleton() {
  return (
    <div className="w-[340px] mx-auto animate-pulse">
      <div className="h-6 bg-muted/40 rounded mb-4 w-2/3 mx-auto" />
      <div className="bg-muted/30 rounded h-64 w-full mb-4" />
      <div className="flex gap-2 justify-center">
        <div className="h-6 w-16 bg-muted/30 rounded" />
        <div className="h-6 w-16 bg-muted/30 rounded" />
      </div>
    </div>
  );
}

export function TripSeatsBus({ tripId, scheduleId, selectedSeats: controlledSeats, onChangeSelectedSeats }: TripSeatsBusProps) {
  const { data, isLoading, error } = useTripSeats(tripId, scheduleId);
  const [internalSelectedSeats, setInternalSelectedSeats] = useState<SeatType[]>([]);
  const selectedSeats = controlledSeats !== undefined ? controlledSeats as SeatType[] : internalSelectedSeats;

  useEffect(() => {
    if (controlledSeats !== undefined) return;
    if (onChangeSelectedSeats) onChangeSelectedSeats(internalSelectedSeats);
  }, [internalSelectedSeats, controlledSeats, onChangeSelectedSeats]);

  if (isLoading) return <TripSeatsBusSkeleton />;
  if (error) return <div>Erreur lors du chargement des sièges</div>;
  if (!data || data.length === 0) return <div>Aucun horaire trouvé pour ce voyage.</div>;

  // Si scheduleId fourni, n'affiche que cet horaire
  if (scheduleId) {
    const schedule = data.find(s => s.scheduleId === scheduleId) || data[0];
    if (!schedule) return <div>Aucun horaire trouvé pour ce voyage.</div>;
    const occupiedSeats = schedule.seats.filter(s => s.status === 'unavailable' || s.status === 'reserved').map(s => s.seatNumber);
    const rawCapacity = schedule.vehicleCapacity || 14;
    const capacity = typeof rawCapacity === 'string' ? parseInt(rawCapacity, 10) : Number(rawCapacity);
    const seatsById = schedule.seatsById || {};
    const seatsByNumber = Object.fromEntries(Object.values(seatsById).map(seat => [seat.seatNumber, seat]));

    const handleSeatClick = (seatNumber: string) => {
      const seatObj = seatsByNumber[seatNumber];
      console.log('handleSeatClick',seatsByNumber);
      if (!seatObj) return;
      let newSeats: SeatType[];
      if (selectedSeats.some((s) => s.id === seatObj.id)) {
        newSeats = selectedSeats.filter((s) => s.id !== seatObj.id);
      } else {
        newSeats = [...selectedSeats, seatObj];
      }
      if (controlledSeats !== undefined && onChangeSelectedSeats) {
        onChangeSelectedSeats(newSeats);
      } else {
        setInternalSelectedSeats(newSeats);
      }
    };

    const generateBusLayout = (occupiedSeats: string[], capacity: number) => {
      const rows = [];
      const getSeatStatus = (seatNumber: string) => {
        const seatObj = seatsByNumber[seatNumber];
        if (!seatObj) return 'unavailable';
        if (seatObj.status !== 'free') return 'unavailable';
        if (selectedSeats.some((s) => s.id === seatObj.id)) return 'selected';
        return 'available';
      };
      // 2 sièges devant (1A, 1B)
      rows.push(
        <BusRow key="driver" rowNumber={1}>
          <DriverSeat />
          <EmptySpace />
          <BusAisle />
          <Seat 
            seatNumber="1A"
            status={getSeatStatus("1A")}
            onSeatClick={handleSeatClick}
            isAisle={true}
          />
          <Seat 
            seatNumber="1B"
            status={getSeatStatus("1B")}
            onSeatClick={handleSeatClick}
            isWindow={true}
          />
        </BusRow>
      );
      // Rangs suivants (2A, 2B, 2C, 2D, 3A, ...)
      const alphabet = 'ABCD';
      let seatIndex = 3; // commence à 3 car 1A/1B sont déjà posés
      let rowNumber = 2;
      while (seatIndex <= capacity) {
        const seatsLeft = [];
        for (let i = 0; i < 2; i++) {
          if (seatIndex <= capacity) {
            const seatNum = `${rowNumber}${alphabet[i]}`;
            seatsLeft.push(
              <Seat
                key={seatNum}
                seatNumber={seatNum}
                status={getSeatStatus(seatNum)}
                onSeatClick={handleSeatClick}
                isWindow={i === 0}
                isAisle={i === 1}
              />
            );
            seatIndex++;
          } else {
            seatsLeft.push(<EmptySpace key={`empty-left-${i}-${rowNumber}`} />);
          }
        }
        const seatsRight = [];
        for (let i = 2; i < 4; i++) {
          if (seatIndex <= capacity) {
            const seatNum = `${rowNumber}${alphabet[i]}`;
            seatsRight.push(
              <Seat
                key={seatNum}
                seatNumber={seatNum}
                status={getSeatStatus(seatNum)}
                onSeatClick={handleSeatClick}
                isAisle={i === 2}
                isWindow={i === 3}
              />
            );
            seatIndex++;
          } else {
            seatsRight.push(<EmptySpace key={`empty-right-${i}-${rowNumber}`} />);
          }
        }
        rows.push(
          <BusRow key={rowNumber} rowNumber={rowNumber}>
            {seatsLeft}
            <BusAisle />
            {seatsRight}
          </BusRow>
        );
        rowNumber++;
      }
      return rows;
    };

    return (
      <div className="w-[340px] mx-auto">
        <LabeledSection label={`🕒 Départ: ${schedule.departureTime} - Arrivée: ${schedule.arrivalTime}`}>
          <div className="flex justify-center">
            <BusLayout busNumber={schedule.vehicleRegistration}>
              {generateBusLayout(occupiedSeats, capacity)}
            </BusLayout>
          </div>
          {selectedSeats.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {selectedSeats.map((seat) => (
                <Badge key={seat.id} variant="secondary">
                  Siège {seat.seatNumber}
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
          const rawCapacity =  schedule.vehicleCapacity || 14;
          const capacity = typeof rawCapacity === 'string' ? parseInt(rawCapacity, 10) : Number(rawCapacity);
          const seatsById = schedule.seatsById || {};
          const seatsByNumber = Object.fromEntries(Object.values(seatsById).map(seat => [seat.seatNumber, seat]));

          const handleSeatClick = (seatNumber: string) => {
            const seatObj = seatsByNumber[seatNumber];
            if (!seatObj) return;
            let newSeats: SeatType[];
            if (selectedSeats.some((s) => s.id === seatObj.id)) {
              newSeats = selectedSeats.filter((s) => s.id !== seatObj.id);
            } else {
              newSeats = [...selectedSeats, seatObj];
            }
            if (controlledSeats !== undefined && onChangeSelectedSeats) {
              onChangeSelectedSeats(newSeats);
            } else {
              setInternalSelectedSeats(newSeats);
            }
          };

          const generateBusLayout = (occupiedSeats: string[], capacity: number) => {
            const rows = [];
            const getSeatStatus = (seatNumber: string) => {
              const seatObj = seatsByNumber[seatNumber];
              if (!seatObj) return 'unavailable';
              if (seatObj.status !== 'free') return 'unavailable';
              if (selectedSeats.some((s) => s.id === seatObj.id)) return 'selected';
              return 'available';
            };
            // 2 sièges devant (conducteur + passager)
            let seatNum = 3;
            const rowCount = Math.ceil((capacity - 2) / 4);
            rows.push(
              <BusRow key="driver" rowNumber={0}>
                <DriverSeat />
                <EmptySpace />
                <BusAisle />
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
              </BusRow>
            );
            for (let row = 1; row <= rowCount; row++) {
              const seatsLeft = [];
              for (let i = 0; i < 2; i++) {
                if (seatNum <= capacity) {
                  seatsLeft.push(
                    <Seat
                      key={seatNum}
                      seatNumber={String(seatNum).padStart(2, '0')}
                      status={getSeatStatus(String(seatNum).padStart(2, '0'))}
                      onSeatClick={handleSeatClick}
                      isWindow={i === 0}
                      isAisle={i === 1}
                    />
                  );
                  seatNum++;
                } else {
                  seatsLeft.push(<EmptySpace key={`empty-left-${i}-${row}`} />);
                }
              }
              const seatsRight = [];
              for (let i = 0; i < 2; i++) {
                if (seatNum <= capacity) {
                  seatsRight.push(
                    <Seat
                      key={seatNum}
                      seatNumber={String(seatNum).padStart(2, '0')}
                      status={getSeatStatus(String(seatNum).padStart(2, '0'))}
                      onSeatClick={handleSeatClick}
                      isAisle={i === 0}
                      isWindow={i === 1}
                    />
                  );
                  seatNum++;
                } else {
                  seatsRight.push(<EmptySpace key={`empty-right-${i}-${row}`} />);
                }
              }
              rows.push(
                <BusRow key={row} rowNumber={row}>
                  {seatsLeft}
                  <BusAisle />
                  {seatsRight}
                </BusRow>
              );
            }
            return rows;
          };

          return (
            <div key={schedule.scheduleId} className="w-[340px]">
              <LabeledSection label={`🕒 Départ: ${schedule.departureTime} - Arrivée: ${schedule.arrivalTime}`}>
                <div className="flex justify-center">
                  <BusLayout busNumber={schedule.vehicleRegistration}>
                    {generateBusLayout(occupiedSeats, capacity)}
                  </BusLayout>
                </div>
                {selectedSeats.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {selectedSeats.map(seat => (
                      <Badge key={seat.id} variant="secondary">
                        Siège {seat.seatNumber}
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
