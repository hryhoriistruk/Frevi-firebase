export const createPaymentIntent = async (amount) => {
    const response = await fetch('/api/payment/create-intent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
    });

    if (!response.ok) {
        throw new Error('Failed to create payment intent');
    }

    return response.json();
};