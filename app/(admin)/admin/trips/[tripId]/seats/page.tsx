"use client";

import { useParams } from "next/navigation";
import { TripSeatsBus } from "@/app/(ui)/ui/components/trip-seats-bus";

export default function TripSeatsPage() {
  const params = useParams();
  const tripId = typeof params?.tripId === "string" ? params.tripId : Array.isArray(params?.tripId) ? params.tripId[0] : undefined;

  if (!tripId) return <div>Paramètre tripId manquant</div>;

  return (
    <div className="py-8 text-center">
      <h1 className="text-2xl font-bold mb-6 uppercase">Disponibilité des sièges</h1>
      <TripSeatsBus tripId={tripId} />
    </div>
  );
}
