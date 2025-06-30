"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/atoms/ui/button";

export default function BookingSuccessPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Réservation confirmée !</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Merci pour votre réservation. Votre paiement a bien été reçu et vos sièges sont réservés. Vous recevrez un email de confirmation avec les détails de votre voyage.
      </p>
      <Button asChild>
        <Link href="/">Retour à l’accueil</Link>
      </Button>
    </div>
  );
}
