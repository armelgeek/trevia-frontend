import PaymentSuccess from '@/features/checkout/components/molecules/payment-success'
import React from 'react'

export default function Page({
    searchParams: { amount },
}: {
    searchParams: { amount: string };
}) {
    return (
        <PaymentSuccess amount={amount} />
    )
}
