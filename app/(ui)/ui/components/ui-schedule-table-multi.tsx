"use client";
import { useState } from "react";
import { ScheduleTable, Schedule } from '@/shared/components/atoms/ui/schedule-table';

export function ScheduleTableMultiDestinationSample() {
  const destinations: { label: string; schedules: Schedule[] }[] = [
    {
      label: 'Paris → Lyon',
      schedules: [
        {
          id: '1', departure: '08:00', arrival: '12:30', duration: '4h30', price: 35, availableSeats: 12, totalSeats: 50, vehicleType: 'Standard', stops: ['Lyon Part-Dieu']
        },
        {
          id: '2', departure: '14:30', arrival: '19:00', duration: '4h30', price: 42, availableSeats: 8, totalSeats: 40, vehicleType: 'Premium', stops: ['Lyon Part-Dieu', 'Mâcon']
        }
      ]
    },
    {
      label: 'Paris → Bordeaux',
      schedules: [
        {
          id: '3', departure: '09:00', arrival: '14:45', duration: '5h45', price: 55, availableSeats: 20, totalSeats: 50, vehicleType: 'VIP', stops: ['Bordeaux St-Jean']
        },
        {
          id: '4', departure: '16:00', arrival: '21:45', duration: '5h45', price: 49, availableSeats: 0, totalSeats: 50, vehicleType: 'Standard', stops: ['Bordeaux St-Jean']
        }
      ]
    }
  ];

  return (
    <div className="space-y-10">
      {destinations.map((dest) => (
        <div key={dest.label}>
          <h3 className="text-lg font-bold mb-2">{dest.label}</h3>
          <ScheduleTable schedules={dest.schedules} />
        </div>
      ))}
    </div>
  );
}

export function ScheduleTableMultiDestinationAccordion() {
  const destinations: { label: string; schedules: Schedule[] }[] = [
    {
      label: 'Paris → Lyon',
      schedules: [
        {
          id: '1', departure: '08:00', arrival: '12:30', duration: '4h30', price: 35, availableSeats: 12, totalSeats: 50, vehicleType: 'Standard', stops: ['Lyon Part-Dieu']
        },
        {
          id: '2', departure: '14:30', arrival: '19:00', duration: '4h30', price: 42, availableSeats: 8, totalSeats: 40, vehicleType: 'Premium', stops: ['Lyon Part-Dieu', 'Mâcon']
        }
      ]
    },
    {
      label: 'Paris → Bordeaux',
      schedules: [
        {
          id: '3', departure: '09:00', arrival: '14:45', duration: '5h45', price: 55, availableSeats: 20, totalSeats: 50, vehicleType: 'VIP', stops: ['Bordeaux St-Jean']
        },
        {
          id: '4', departure: '16:00', arrival: '21:45', duration: '5h45', price: 49, availableSeats: 0, totalSeats: 50, vehicleType: 'Standard', stops: ['Bordeaux St-Jean']
        }
      ]
    }
  ];

  // Ouvre la première destination par défaut
  const [open, setOpen] = useState<string | null>(destinations.length > 0 ? destinations[0].label : null);

  // Helper pour infos synthétiques
  const getSummary = (schedules: Schedule[]) => {
    const total = schedules.length;
    const totalSeats = schedules.reduce((acc, s) => acc + s.totalSeats, 0);
    const available = schedules.reduce((acc, s) => acc + s.availableSeats, 0);
    const minPrice = Math.min(...schedules.map(s => s.price));
    return `${total} départ${total > 1 ? 's' : ''} • dès ${minPrice}€ • ${available}/${totalSeats} places`;
  };

  return (
    <div className="space-y-2">
      {destinations.map((dest) => (
        <div key={dest.label} className="border rounded">
          <button
            className="w-full text-left px-4 py-2 font-semibold bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
            onClick={() => setOpen(open === dest.label ? null : dest.label)}
          >
            <span>{dest.label}</span>
            <span className="text-xs text-gray-500 ml-2">{getSummary(dest.schedules)}</span>
          </button>
          {open === dest.label && (
            <div className="p-4">
              <ScheduleTable schedules={dest.schedules} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// Ajout d'un export par défaut pour l'accordéon multi-destinations
export default ScheduleTableMultiDestinationAccordion;
