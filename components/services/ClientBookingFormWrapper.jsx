// src/components/services/ClientBookingFormWrapper.jsx
'use client';

import dynamic from 'next/dynamic';

// Динамічний імпорт клієнтського компонента
const ClientBookingForm = dynamic(
    () => import('./ClientBookingForm'),
    { ssr: false }
);

export default function ClientBookingFormWrapper(props) {
    return <ClientBookingForm {...props} />;
}