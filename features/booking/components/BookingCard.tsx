"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, CreditCard, MapPin, Eye, Download, XCircle, CheckCircle, AlertCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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

export function BookingCard({ booking, showUser = true }: { booking: Booking; showUser?: boolean }) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              {booking.routeLabel}
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Réservation #{booking.id}
            </p>
            {showUser && booking.userFullName && (
              <div className="mt-4 mb-2 flex justify-start">
                <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 shadow-md px-4 py-2 min-w-[220px]">
                  <div className="flex items-center justify-center bg-primary/80 rounded-full w-10 h-10">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wide">Client</span>
                    <span className="text-base font-bold text-primary leading-tight">{booking.userFullName}</span>
                  </div>
                </div>
              </div>
            )}
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
