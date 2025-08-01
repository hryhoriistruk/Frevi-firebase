/**
 * Stripe API wrapper for payments.
 */
const Stripe = require('stripe');

class StripeConfig {
    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }

    async createPaymentIntent(amount, currency = 'usd') {
        return await this.stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Stripe uses cents
            currency,
        });
    }
}

module.exports = StripeConfig;