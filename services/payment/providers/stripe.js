const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, currency = 'usd') => {
    return await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Переводимо у центи
        currency,
        metadata: { integration_check: 'accept_a_payment' }
    });
};

const handleWebhook = (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Обробка подій Stripe
    switch (event.type) {
        case 'payment_intent.succeeded':
            // Оновлення статусу платежу в БД
            break;
    }

    res.json({ received: true });
};