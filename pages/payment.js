import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createPaymentIntent } from '../lib/payment';
import { FiCreditCard, FiDollarSign, FiLock, FiCheckCircle } from 'react-icons/fi';
import styles from '@/styles/PaymentPage.module.css';

// Initialize Stripe outside component
let stripePromise;
const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    }
    return stripePromise;
};

export default function PaymentPage() {
    const [amount, setAmount] = useState(2500); // $25.00 in cents
    const [loading, setLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardDetailsComplete, setCardDetailsComplete] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const { clientSecret } = await createPaymentIntent(amount);
            const stripe = await getStripe();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement('card'),
                    billing_details: {
                        name: 'Customer Name',
                    },
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            if (paymentIntent.status === 'succeeded') {
                setPaymentSuccess(true);
            }
        } catch (err) {
            alert(`Payment failed: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAmountChange = (e) => {
        const value = Math.round(Number(e.target.value) * 100);
        setAmount(Math.max(50, value)); // Minimum $0.50
    };

    if (paymentSuccess) {
        return (
            <div className={styles.successContainer}>
                <FiCheckCircle className={styles.successIcon} />
                <h2 className={styles.successTitle}>Payment Successful!</h2>
                <p className={styles.successMessage}>
                    Thank you for your payment of ${(amount / 100).toFixed(2)}
                </p>
                <button
                    className={styles.successButton}
                    onClick={() => setPaymentSuccess(false)}
                >
                    Make Another Payment
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <FiCreditCard className={styles.headerIcon} />
                <h1>Secure Payment</h1>
                <p>Complete your transaction with our 128-bit SSL encryption</p>
            </div>

            <div className={styles.paymentCard}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${paymentMethod === 'card' ? styles.activeTab : ''}`}
                        onClick={() => setPaymentMethod('card')}
                    >
                        Credit Card
                    </button>
                    <button
                        className={`${styles.tab} ${paymentMethod === 'paypal' ? styles.activeTab : ''}`}
                        onClick={() => setPaymentMethod('paypal')}
                    >
                        PayPal
                    </button>
                </div>

                {paymentMethod === 'card' ? (
                    <>
                        <div className={styles.amountInput}>
                            <label className={styles.inputLabel}>Payment Amount</label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.currencySymbol}>$</span>
                                <input
                                    type="number"
                                    value={(amount / 100).toFixed(2)}
                                    onChange={handleAmountChange}
                                    className={styles.amountField}
                                    step="0.01"
                                    min="0.50"
                                />
                            </div>
                        </div>

                        <div className={styles.cardElementContainer}>
                            <label className={styles.inputLabel}>Card Details</label>
                            <div id="card-element" className={styles.cardElement} />
                            {/* Stripe will inject the Card Element here */}
                        </div>

                        <div className={styles.securityNote}>
                            <FiLock className={styles.lockIcon} />
                            <span>Your payment is secured with 256-bit encryption</span>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={loading || !cardDetailsComplete}
                            className={styles.payButton}
                        >
                            {loading ? (
                                <span className={styles.spinner}></span>
                            ) : (
                                `Pay $${(amount / 100).toFixed(2)}`
                            )}
                        </button>
                    </>
                ) : (
                    <div className={styles.paypalContainer}>
                        <p>You'll be redirected to PayPal to complete your payment</p>
                        <button className={styles.paypalButton}>
                            Continue with PayPal
                        </button>
                    </div>
                )}

                <div className={styles.acceptedCards}>
                    <span>We accept:</span>
                    <div className={styles.cardIcons}>
                        <img src="/icons/visa.svg" alt="Visa" />
                        <img src="/icons/mastercard.svg" alt="Mastercard" />
                        <img src="/icons/amex.svg" alt="American Express" />
                        <img src="/icons/discover.svg" alt="Discover" />
                    </div>
                </div>
            </div>
        </div>
    );
}