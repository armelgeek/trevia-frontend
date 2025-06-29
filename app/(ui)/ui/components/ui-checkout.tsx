"use client";

import { LabeledSection } from "./ui-section";
import { Button } from "@/shared/components/atoms/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/atoms/ui/card";
import { Input } from "@/shared/components/atoms/ui/input";
import { Label } from "@/shared/components/atoms/ui/label";
import { Separator } from "@/shared/components/atoms/ui/separator";
import { Badge } from "@/shared/components/atoms/ui/badge";
import { 
  CreditCard, 
  Shield, 
  MapPin, 
  Calendar, 
  Clock, 
  Users,
  Lock,
  AlertCircle,
  Info
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/shared/components/atoms/ui/alert";

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
  passengerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface PaymentInfo {
  method: "card" | "paypal" | "bank_transfer";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const sampleBooking: BookingDetails = {
  tripId: "TR-001",
  from: "Paris",
  to: "Lyon",
  date: "2024-06-25",
  time: "08:15",
  duration: "4h30",
  seats: ["12", "13"],
  pricePerSeat: 35,
  vehicle: "Minibus Standard - AB-456-EF",
  passengerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }
};

function BookingSummary({ booking }: { booking: BookingDetails }) {
  const totalPrice = booking.seats.length * booking.pricePerSeat;
  const serviceFee = Math.round(totalPrice * 0.05 * 100) / 100; // 5% service fee
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
            Annulation gratuite jusqu&apos;à 24h avant le départ
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

function PassengerInfoForm({ 
  booking, 
  onUpdate 
}: { 
  booking: BookingDetails;
  onUpdate: (info: BookingDetails["passengerInfo"]) => void;
}) {
  const [passengerInfo, setPassengerInfo] = useState(booking.passengerInfo);

  const handleChange = (field: keyof typeof passengerInfo, value: string) => {
    const updated = { ...passengerInfo, [field]: value };
    setPassengerInfo(updated);
    onUpdate(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-primary" />
          <span>Informations du passager</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom *</Label>
            <Input
              id="firstName"
              value={passengerInfo.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Votre prénom"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom *</Label>
            <Input
              id="lastName"
              value={passengerInfo.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Votre nom"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={passengerInfo.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="votre@email.com"
            required
          />
          <p className="text-xs text-gray-500">
            Votre billet et les informations de voyage vous seront envoyés par email
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            value={passengerInfo.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="06 12 34 56 78"
            required
          />
          <p className="text-xs text-gray-500">
            Pour vous contacter en cas de changement ou d&apos;urgence
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentForm({ 
  onPaymentUpdate 
}: { 
  onPaymentUpdate: (payment: PaymentInfo) => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentInfo["method"]>("card");
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const handlePaymentChange = (field: keyof PaymentInfo, value: string) => {
    const updated = { ...paymentInfo, [field]: value };
    setPaymentInfo(updated);
    onPaymentUpdate(updated);
  };

  const handleMethodChange = (method: PaymentInfo["method"]) => {
    setPaymentMethod(method);
    const updated = { ...paymentInfo, method };
    setPaymentInfo(updated);
    onPaymentUpdate(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="w-5 h-5 text-primary" />
          <span>Paiement</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label>Méthode de paiement</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              onClick={() => handleMethodChange("card")}
              className="justify-start"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Carte bancaire
            </Button>
            <Button
              variant={paymentMethod === "paypal" ? "default" : "outline"}
              onClick={() => handleMethodChange("paypal")}
              className="justify-start"
            >
              💳 PayPal
            </Button>
            <Button
              variant={paymentMethod === "bank_transfer" ? "default" : "outline"}
              onClick={() => handleMethodChange("bank_transfer")}
              className="justify-start"
            >
              🏦 Virement
            </Button>
          </div>
        </div>
        
        {paymentMethod === "card" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Nom sur la carte *</Label>
              <Input
                id="cardName"
                value={paymentInfo.cardName}
                onChange={(e) => handlePaymentChange("cardName", e.target.value)}
                placeholder="Jean Dupont"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Numéro de carte *</Label>
              <Input
                id="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Date d&apos;expiration *</Label>
                <Input
                  id="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                  placeholder="MM/AA"
                  maxLength={5}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV *</Label>
                <Input
                  id="cvv"
                  value={paymentInfo.cvv}
                  onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                  placeholder="123"
                  maxLength={3}
                  required
                />
              </div>
            </div>
            
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Vos informations de paiement sont sécurisées et cryptées
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {paymentMethod === "paypal" && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              💳
            </div>
            <p className="text-gray-600 mb-4">
              Vous serez redirigé vers PayPal pour finaliser votre paiement
            </p>
            <Badge variant="secondary">Paiement sécurisé</Badge>
          </div>
        )}
        
        {paymentMethod === "bank_transfer" && (
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Votre réservation sera confirmée après réception du virement.
                Les détails bancaires vous seront envoyés par email.
              </AlertDescription>
            </Alert>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Délai:</strong> 1-3 jours ouvrés</p>
              <p><strong>Frais:</strong> Selon votre banque</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CheckoutForm() {
  const [booking, setBooking] = useState(sampleBooking);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: ""
  });

  const handlePassengerUpdate = (info: BookingDetails["passengerInfo"]) => {
    setBooking(prev => ({ ...prev, passengerInfo: info }));
  };

  const handlePayment = () => {
    // Here you would typically submit to a payment processor
    console.log("Processing payment:", { booking, paymentInfo });
    alert("Paiement en cours... (démo)");
  };

  const isFormValid = 
    booking.passengerInfo.firstName &&
    booking.passengerInfo.lastName &&
    booking.passengerInfo.email &&
    booking.passengerInfo.phone &&
    (paymentInfo.method !== "card" || 
     (paymentInfo.cardName && paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <PassengerInfoForm 
          booking={booking}
          onUpdate={handlePassengerUpdate}
        />
        <PaymentForm onPaymentUpdate={setPaymentInfo} />
      </div>
      
      <div className="space-y-6">
        <BookingSummary booking={booking} />
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={handlePayment}
          disabled={!isFormValid}
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

export function CheckoutSample() {
  return (
    <div className="space-y-8">
      <LabeledSection label="Processus de Checkout Complet">
        <CheckoutForm />
      </LabeledSection>
      
      <LabeledSection label="Résumé de Réservation">
        <div className="max-w-md">
          <BookingSummary booking={sampleBooking} />
        </div>
      </LabeledSection>
    </div>
  );
}
