import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../lib/payment';

// Initialize Stripe outside component to avoid recreating on re-renders
let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    }
    return stripePromise;
};

export default function PaymentPage() {
    const [amount, setAmount] = useState(1000); // $10.00 in cents
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            // 1. Create Payment Intent
            const { clientSecret } = await createPaymentIntent(amount);

            // 2. Confirm payment with Stripe.js
            const stripe = await getStripe();
            const { error } = await stripe.confirmCardPayment(clientSecret);

            if (error) {
                alert(error.message);
            } else {
                alert('Payment successful!');
            }
        } catch (err) {
            alert('Payment failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Payment</h1>
            <div className="mb-4">
                <label className="block mb-2">Amount (USD)</label>
                <input
                    type="number"
                    value={amount / 100}
                    onChange={(e) => setAmount(Math.round(Number(e.target.value) * 100))}
                    className="w-full p-2 border rounded"
                    step="0.01"
                    min="0.50"
                />
            </div>
            <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {loading ? 'Processing...' : `Pay $${(amount / 100).toFixed(2)}`}
            </button>
        </div>
    );
}