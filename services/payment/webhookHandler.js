// services/payment/webhookHandler.js
router.post('/webhook/stripe', async (ctx) => {
    const sig = ctx.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(
        ctx.request.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === 'payment_intent.succeeded') {
        await processSuccessfulPayment(event.data.object);
    }
});