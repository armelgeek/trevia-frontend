"use client";
import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Separator } from "@/shared/components/atoms/ui/separator";
import { Alert, AlertDescription } from "@/shared/components/atoms/ui/alert";
import {  Shield, MapPin, Calendar, Clock, Users, Lock, Info } from "lucide-react";

interface BookingDetails {
  tripId: string;
  from: string;
  to: string;
  date: string;
  time: string;
  duration: string;
  seats: string[];
  pricePerSeat: number;
  vehicle: string;
}

function BookingSummary({ booking }: { booking: BookingDetails }) {
  if (!booking || !booking.seats) return null;
  const totalPrice = booking.seats.length * booking.pricePerSeat;
  const serviceFee = Math.round(totalPrice * 0.05 * 100) / 100;
  const finalTotal = totalPrice + serviceFee;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-primary" />
          <span>Résumé de votre voyage</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Trajet</span>
            <span className="text-lg font-bold">{booking.from} → {booking.to}</span>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{booking.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{booking.time} • {booking.duration}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{booking.vehicle}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="w-4 h-4 text-primary" />
            <span className="font-medium">
              Places sélectionnées: {booking.seats.join(", ")}
            </span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{booking.seats.length} place(s) × {booking.pricePerSeat}€</span>
            <span>{totalPrice}€</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Frais de service</span>
            <span>{serviceFee}€</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">{finalTotal}€</span>
          </div>
        </div>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            {"Annulation gratuite jusqu'à 24h avant le départ"}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

interface CheckoutFormProps {
  booking: BookingDetails;
  onPay?: () => void;
  loading?: boolean;
}

export function CheckoutForm({ booking, onPay, loading }: CheckoutFormProps) {
  if (!booking) return null;
  const seats = booking.seats;
  return (
    <div className="gap-8">
      <div className="space-y-6">
        <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 flex items-center gap-3 mb-2">
          <Shield className="w-5 h-5 text-primary" />
          <div>
            <div className="font-semibold text-primary">Vos informations sont protégées</div>
            <div className="text-xs text-muted-foreground">Paiement sécurisé, données cryptées, support client 7j/7.</div>
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-6">
        <BookingSummary booking={booking} />
        <Button 
          className="w-full" 
          size="lg"
          onClick={onPay}
          disabled={loading}
        >
          <Lock className="w-4 h-4 mr-2" />
          Confirmer et payer
        </Button>
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield className="w-3 h-3" />
          <span>Paiement 100% sécurisé</span>
        </div>
      </div>
    </div>
  );
}
