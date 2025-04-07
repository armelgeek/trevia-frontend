"use client";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./checkout-page";
import convertToSubcurrency from "@/shared/lib/utils/convert-to-sub-currency";
import { stripePromise } from "@/shared/lib/config/stripe";

export default function PaymentPage() {
  const amount = 49.99;

  return (
    <main>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Boilerplate</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}