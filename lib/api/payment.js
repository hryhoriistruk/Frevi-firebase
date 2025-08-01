// lib/api/payment.js
export const createPayment = async (orderId, token) => {
    const response = await fetch(`${API_URL}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderId })
    });
    return response.json();
};

export const getPaymentStatus = async (paymentId, token) => {
    const response = await fetch(`${API_URL}/payments/${paymentId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
};