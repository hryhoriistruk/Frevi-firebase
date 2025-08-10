// components/services/BookingForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm({ serviceId, price }) {
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                body: JSON.stringify({ serviceId, date }),
            });

            if (!response.ok) throw new Error('Booking failed');
            router.push('/bookings');
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="border rounded-lg p-6">
            {/* Form implementation */}
        </div>
    );
}