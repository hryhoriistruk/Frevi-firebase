import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function PaymentForm({ amount, onSuccess }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setError(null);

        try {
            const stripe = await loadStripe('your-stripe-publishable-key');
            const response = await fetch('/api/payment/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const { clientSecret } = await response.json();

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement('card'),
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else if (result.paymentIntent.status === 'succeeded') {
                onSuccess(result.paymentIntent);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="payment-form">
            <form onSubmit={handleSubmit}>
                <div id="card-element"></div>
                {error && <div className="error">{error}</div>}
                <button type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : `Pay $${amount}`}
                </button>
            </form>
        </div>
    );
}