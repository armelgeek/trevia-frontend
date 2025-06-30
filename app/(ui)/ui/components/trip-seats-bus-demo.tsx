"use client";

import TripSeatsCarDemo from "./trip-seats-car-demo";

interface TripSeatsBusCarDemoWrapperProps {
  selectedSeats: string[];
  onChangeSelectedSeats: (seats: string[]) => void;
}

export default function TripSeatsBusCarDemoWrapper({ selectedSeats, onChangeSelectedSeats }: TripSeatsBusCarDemoWrapperProps) {
  return <TripSeatsCarDemo selectedSeats={selectedSeats} onChangeSelectedSeats={onChangeSelectedSeats} />;
}
