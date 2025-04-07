// hooks/useStripePayment.ts
"use client";

import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/shared/lib/utils/convert-to-sub-currency";

interface UseStripePaymentProps {
  amount: number;
  successUrl?: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: (error: string) => void;
}

interface PaymentIntentResponse {
  clientSecret: string;
}

export function useStripePayment({
  amount,
  successUrl =  "http://www.localhost:3000/payment-success",
  onPaymentSuccess,
  onPaymentError,
}: UseStripePaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [clientSecret, setClientSecret] = useState("");
  const [isLoadingIntent, setIsLoadingIntent] = useState(true);
  const [intentError, setIntentError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'succeeded' | 'failed'>('idle');

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsLoadingIntent(true);
        setIntentError(null);
        
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to create payment intent");
        }
        
        const data: PaymentIntentResponse = await response.json();
        setClientSecret(data.clientSecret);
        setPaymentStatus('idle');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An error occurred creating payment intent";
        setIntentError(errorMessage);
        onPaymentError?.(errorMessage);
      } finally {
        setIsLoadingIntent(false);
      }
    };

    if (amount > 0) {
      createPaymentIntent();
    }
  }, [amount, onPaymentError]);

  const submitPayment = async () => {
    if (!stripe || !elements || !clientSecret) {
      setPaymentError("Payment processing unavailable. Please try again later.");
      return;
    }
    
    setIsSubmitting(true);
    setPaymentError(null);
    setPaymentStatus('processing');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        throw submitError;
      }

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${successUrl}?amount=${amount}`,
        },
        redirect: 'if_required',
      });
      
      if (error) {
        throw error;
      }
      
      if (paymentIntent && paymentIntent.status === 'succeeded') {
        setPaymentStatus('succeeded');
        onPaymentSuccess?.();
      }
    } catch (error) {
      setPaymentStatus('failed');
      const errorMessage = error instanceof Error ? error.message : "Payment failed";
      setPaymentError(errorMessage);
      onPaymentError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    clientSecret,
    isLoadingIntent,
    intentError,
    paymentError,
    isSubmitting,
    paymentStatus,
    isReady: !!stripe && !!elements && !!clientSecret && !isLoadingIntent,
    submitPayment,
    resetError: () => setPaymentError(null),
    stripe,
    elements
  };
}