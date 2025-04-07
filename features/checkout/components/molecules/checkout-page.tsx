"use client";

import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { useStripePayment } from "../../hooks/use-stripe-payment";

interface CheckoutPageProps {
  amount: number;
  description?: string;
  successUrl?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

const CheckoutPage = ({
  amount,
  description = "Complete your payment securely",
  successUrl,
  onPaymentSuccess,
  onPaymentError,
}: CheckoutPageProps) => {
  const {
    clientSecret,
    isLoadingIntent,
    intentError,
    paymentError,
    isSubmitting,
    isReady,
    submitPayment
  } = useStripePayment({
    amount,
    successUrl,
    onPaymentSuccess,
    onPaymentError,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitPayment();
  };

  if (isLoadingIntent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Preparing payment...</p>
        </CardContent>
      </Card>
    );
  }

  if (intentError) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Payment Setup Error</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription>{intentError}</AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button
           
            variant="outline"
            className="w-full"
          >
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {clientSecret && <PaymentElement />}

          {paymentError && (
            <Alert variant="destructive">
              <AlertDescription>{paymentError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={!isReady || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </CardFooter>
      </form>
      <div className="px-6 pb-6 pt-0">
        <p className="text-xs text-muted-foreground text-center">
          Your payment information is processed securely through Stripe.
        </p>
      </div>
    </Card>
  );
};

export default CheckoutPage;