// services/payment/paymentController.js
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.createPayment = async (req, res) => {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        metadata: { userId: req.user.id }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
};

exports.webhook = async (req, res) => {
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

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        await Order.updateOne(
            { paymentId: paymentIntent.id },
            { status: 'paid' }
        );
    }

    res.json({ received: true });
};