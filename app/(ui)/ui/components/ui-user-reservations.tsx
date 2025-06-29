"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CreditCard, 
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Separator } from "@/shared/components/atoms/ui/separator";

interface Reservation {
  id: string;
  tripId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  duration: string;
  seats: string[];
  price: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  passenger: {
    name: string;
    email: string;
    phone: string;
  };
  vehicle: {
    type: string;
    license: string;
  };
  paymentMethod: string;
  bookingDate: string;
}

const sampleReservations: Reservation[] = [
  {
    id: "RES-2024-001",
    tripId: "TR-001",
    from: "Paris",
    to: "Lyon",
    date: "2024-06-25",
    time: "08:15",
    duration: "4h30",
    seats: ["12", "13"],
    price: 70,
    status: "confirmed",
    passenger: {
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78"
    },
    vehicle: {
      type: "Minibus Standard",
      license: "AB-456-EF"
    },
    paymentMethod: "Carte bancaire",
    bookingDate: "2024-06-20"
  },
  {
    id: "RES-2024-002",
    tripId: "TR-002",
    from: "Lyon",
    to: "Marseille",
    date: "2024-06-18",
    time: "14:30",
    duration: "3h15",
    seats: ["8"],
    price: 45,
    status: "completed",
    passenger: {
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78"
    },
    vehicle: {
      type: "Autocar Confort",
      license: "CD-789-GH"
    },
    paymentMethod: "PayPal",
    bookingDate: "2024-06-15"
  },
  {
    id: "RES-2024-003",
    tripId: "TR-003",
    from: "Marseille",
    to: "Nice",
    date: "2024-07-02",
    time: "10:00",
    duration: "2h45",
    seats: ["15"],
    price: 35,
    status: "pending",
    passenger: {
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "06 12 34 56 78"
    },
    vehicle: {
      type: "Minibus Standard",
      license: "EF-123-IJ"
    },
    paymentMethod: "Virement bancaire",
    bookingDate: "2024-06-22"
  }
];

function getStatusColor(status: Reservation["status"]) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "completed":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusIcon(status: Reservation["status"]) {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "cancelled":
      return <XCircle className="w-4 h-4" />;
    case "completed":
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
}

function getStatusText(status: Reservation["status"]) {
  switch (status) {
    case "confirmed":
      return "Confirmée";
    case "pending":
      return "En attente";
    case "cancelled":
      return "Annulée";
    case "completed":
      return "Terminée";
    default:
      return "Inconnue";
  }
}

function ReservationCard({ reservation }: { reservation: Reservation }) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              {reservation.from} → {reservation.to}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Réservation #{reservation.id}
            </p>
          </div>
          <Badge className={`${getStatusColor(reservation.status)} flex items-center space-x-1`}>
            {getStatusIcon(reservation.status)}
            <span>{getStatusText(reservation.status)}</span>
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">{reservation.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{reservation.time} • {reservation.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span>Places : {reservation.seats.join(", ")}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{reservation.vehicle.type} - {reservation.vehicle.license}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>{reservation.paymentMethod}</span>
            </div>
            <div className="text-lg font-bold text-primary">
              {reservation.price}€
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Détails
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
          {reservation.status === "confirmed" && (
            <Button variant="destructive" size="sm">
              Annuler
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ReservationList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Mes réservations</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Toutes</Button>
          <Button variant="outline" size="sm">Confirmées</Button>
          <Button variant="outline" size="sm">En attente</Button>
          <Button variant="outline" size="sm">Terminées</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sampleReservations.map((reservation) => (
          <ReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </div>
  );
}

function ReservationStats() {
  const totalTrips = sampleReservations.length;
  const confirmedTrips = sampleReservations.filter(r => r.status === "confirmed").length;
  const completedTrips = sampleReservations.filter(r => r.status === "completed").length;
  const totalSpent = sampleReservations.reduce((sum, r) => sum + r.price, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total voyages</p>
              <p className="text-2xl font-bold text-gray-900">{totalTrips}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Confirmés</p>
              <p className="text-2xl font-bold text-gray-900">{confirmedTrips}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Terminés</p>
              <p className="text-2xl font-bold text-gray-900">{completedTrips}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total dépensé</p>
              <p className="text-2xl font-bold text-gray-900">{totalSpent}€</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function UserReservationSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Dashboard Réservations Utilisateur">
        <div className="space-y-6">
          <ReservationStats />
          <ReservationList />
        </div>
      </LabeledSection>
      
      <LabeledSection label="Carte de Réservation Individuelle">
        <div className="max-w-2xl">
          <ReservationCard reservation={sampleReservations[0]} />
        </div>
      </LabeledSection>
    </div>
  );
}
