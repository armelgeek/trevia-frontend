"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { Calendar, Clock, Users, CreditCard, MapPin, Eye, Download, XCircle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/atoms/ui/button";
import { Separator } from "@/shared/components/atoms/ui/separator";
import type { Booking } from '@/features/booking/booking.schema';

function getStatusColor(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getStatusIcon(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "cancelled":
      return <XCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
}

function getStatusText(status: Booking["status"]) {
  switch (status) {
    case "confirmed":
      return "Confirmée";
    case "pending":
      return "En attente";
    case "cancelled":
      return "Annulée";
    default:
      return "Inconnue";
  }
}

export function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              {booking.routeLabel}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Réservation #{booking.id}
            </p>
          </div>
          <Badge className={`${getStatusColor(booking.status)} flex items-center space-x-1`}>
            {getStatusIcon(booking.status)}
            <span>{getStatusText(booking.status)}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">{booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : "-"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span>Places : {booking.seatNumbers}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{booking.vehicleId ?? "-"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CreditCard className="w-4 h-4 text-primary" />
              <span>{booking.totalPrice}€</span>
            </div>
          </div>
        </div>
        <Separator />
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Détails
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Télécharger
          </Button>
          {booking.status === "confirmed" && (
            <Button variant="destructive" size="sm">
              Annuler
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
