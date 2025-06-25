"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, Euro, Calendar, Users } from "lucide-react";
import { useState } from "react";

interface Schedule {
  id: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  vehicleType: "Standard" | "Premium" | "VIP";
  stops?: string[];
}

interface ScheduleTableProps {
  schedules: Schedule[];
  onBook?: (scheduleId: string) => void;
}

function ScheduleTable({ schedules, onBook }: ScheduleTableProps) {
  const [selectedDay, setSelectedDay] = useState("today");

  const days = [
    { value: "today", label: "Aujourd'hui", date: "15 Juin" },
    { value: "tomorrow", label: "Demain", date: "16 Juin" },
    { value: "day2", label: "Mercredi", date: "17 Juin" },
    { value: "day3", label: "Jeudi", date: "18 Juin" },
    { value: "day4", label: "Vendredi", date: "19 Juin" },
  ];

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 50) return "text-green-600 bg-green-50";
    if (percentage > 20) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  const getVehicleBadgeColor = (type: string) => {
    switch (type) {
      case "VIP": return "bg-purple-100 text-purple-800";
      case "Premium": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Day selector */}
      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <Button
            key={day.value}
            variant={selectedDay === day.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedDay(day.value)}
            className="flex flex-col items-center p-3 h-auto"
          >
            <span className="text-xs font-medium">{day.label}</span>
            <span className="text-xs opacity-75">{day.date}</span>
          </Button>
        ))}
      </div>

      {/* Desktop table view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left p-4 font-semibold text-gray-700">Départ</th>
              <th className="text-left p-4 font-semibold text-gray-700">Arrivée</th>
              <th className="text-left p-4 font-semibold text-gray-700">Durée</th>
              <th className="text-left p-4 font-semibold text-gray-700">Véhicule</th>
              <th className="text-left p-4 font-semibold text-gray-700">Places</th>
              <th className="text-left p-4 font-semibold text-gray-700">Prix</th>
              <th className="text-left p-4 font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr 
                key={schedule.id} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{schedule.departure}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{schedule.arrival}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gray-600">{schedule.duration}</span>
                </td>
                <td className="p-4">
                  <Badge className={getVehicleBadgeColor(schedule.vehicleType)}>
                    {schedule.vehicleType}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getAvailabilityColor(schedule.availableSeats, schedule.totalSeats)}`}>
                      {schedule.availableSeats}/{schedule.totalSeats}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Euro className="w-4 h-4 text-gray-400" />
                    <span className="text-lg font-bold text-primary">{schedule.price}€</span>
                  </div>
                </td>
                <td className="p-4">
                  <Button 
                    size="sm" 
                    onClick={() => onBook?.(schedule.id)}
                    disabled={schedule.availableSeats === 0}
                  >
                    {schedule.availableSeats === 0 ? "Complet" : "Réserver"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-4">
        {schedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold">{schedule.departure}</div>
                    <div className="text-xs text-gray-500">Départ</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-sm text-gray-600">{schedule.duration}</div>
                    <div className="h-px bg-gray-300 my-1"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{schedule.arrival}</div>
                    <div className="text-xs text-gray-500">Arrivée</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge className={getVehicleBadgeColor(schedule.vehicleType)}>
                    {schedule.vehicleType}
                  </Badge>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className={`text-sm font-medium px-2 py-1 rounded ${getAvailabilityColor(schedule.availableSeats, schedule.totalSeats)}`}>
                      {schedule.availableSeats}/{schedule.totalSeats}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="text-xl font-bold text-primary">{schedule.price}€</span>
                  <Button 
                    size="sm" 
                    onClick={() => onBook?.(schedule.id)}
                    disabled={schedule.availableSeats === 0}
                  >
                    {schedule.availableSeats === 0 ? "Complet" : "Réserver"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ScheduleTableSample() {
  const sampleSchedules: Schedule[] = [
    {
      id: "1",
      departure: "08:00",
      arrival: "12:30",
      duration: "4h30",
      price: 35,
      availableSeats: 12,
      totalSeats: 50,
      vehicleType: "Standard",
      stops: ["Lyon Part-Dieu"]
    },
    {
      id: "2", 
      departure: "10:15",
      arrival: "14:45",
      duration: "4h30",
      price: 42,
      availableSeats: 8,
      totalSeats: 40,
      vehicleType: "Premium",
      stops: ["Lyon Part-Dieu", "Mâcon"]
    },
    {
      id: "3",
      departure: "14:30",
      arrival: "19:00", 
      duration: "4h30",
      price: 35,
      availableSeats: 25,
      totalSeats: 50,
      vehicleType: "Standard",
      stops: ["Lyon Part-Dieu"]
    },
    {
      id: "4",
      departure: "18:45",
      arrival: "23:15",
      duration: "4h30", 
      price: 55,
      availableSeats: 3,
      totalSeats: 30,
      vehicleType: "VIP",
      stops: ["Lyon Part-Dieu"]
    },
    {
      id: "5",
      departure: "22:00",
      arrival: "02:30+1",
      duration: "4h30",
      price: 35,
      availableSeats: 0,
      totalSeats: 50,
      vehicleType: "Standard",
      stops: ["Lyon Part-Dieu"]
    }
  ];

  return (
    <div className="space-y-8">
      <LabeledSection label="Tableau des Horaires - Paris → Lyon">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Horaires disponibles</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduleTable 
              schedules={sampleSchedules}
              onBook={(id) => console.log("Booking schedule:", id)}
            />
          </CardContent>
        </Card>
      </LabeledSection>

      <LabeledSection label="Version Compacte">
        <div className="max-w-2xl">
          <ScheduleTable 
            schedules={sampleSchedules.slice(0, 3)}
            onBook={(id) => console.log("Booking schedule:", id)}
          />
        </div>
      </LabeledSection>
    </div>
  );
}
