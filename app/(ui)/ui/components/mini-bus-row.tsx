"use client";

import { BusRow, Seat, BusAisle, DriverSeat, EmptySpace } from "@/shared/components/atoms/ui/seat";
import React from "react";

interface MiniBusRowProps {
  occupiedSeats: string[];
  totalRows?: number;
}

export function MiniBusRow({ occupiedSeats, totalRows = 4 }: MiniBusRowProps) {
  // Affiche 4 rangées par défaut (miniature complète)
  const getSeatStatus = (seatNumber: string) =>
    occupiedSeats.includes(seatNumber) ? "unavailable" : "available";

  const seatClass = "w-3 h-3 min-w-0 min-h-0 p-0 m-0";
  const driverClass = "w-3 h-3 min-w-0 min-h-0 p-0 m-0";
  const rows = [];
  // Première rangée avec conducteur
  rows.push(
    <BusRow key="driver" rowNumber={0} className="scale-50 opacity-80 gap-0">
      <DriverSeat className={driverClass} />
      <EmptySpace />
      <BusAisle />
      <Seat seatNumber="01" status={getSeatStatus("01")} isAisle={true} className={seatClass} />
      <Seat seatNumber="02" status={getSeatStatus("02")} isWindow={true} className={seatClass} />
    </BusRow>
  );
  // Rangées suivantes (4 rangées pour tout voir)
  for (let row = 1; row < totalRows; row++) {
    const seatBase = (row - 1) * 4 + 3;
    const leftWindow = String(seatBase).padStart(2, "0");
    const leftAisle = String(seatBase + 1).padStart(2, "0");
    const rightAisle = String(seatBase + 2).padStart(2, "0");
    const rightWindow = String(seatBase + 3).padStart(2, "0");
    rows.push(
      <BusRow key={row} rowNumber={row} className="scale-50 opacity-80 gap-0">
        <Seat seatNumber={leftWindow} status={getSeatStatus(leftWindow)} isWindow={true} className={seatClass} />
        <Seat seatNumber={leftAisle} status={getSeatStatus(leftAisle)} isAisle={true} className={seatClass} />
        <BusAisle />
        <Seat seatNumber={rightAisle} status={getSeatStatus(rightAisle)} isAisle={true} className={seatClass} />
        <Seat seatNumber={rightWindow} status={getSeatStatus(rightWindow)} isWindow={true} className={seatClass} />
      </BusRow>
    );
  }
  return <div className="flex flex-col items-center gap-0">{rows}</div>;
}
