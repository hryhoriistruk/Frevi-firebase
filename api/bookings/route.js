import { createBooking, getUserBookings } from '@/lib/firebase/bookings';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/firebase/auth';

export async function POST(request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const bookingData = await request.json();
        const bookingId = await createBooking({
            ...bookingData,
            userId: user.uid
        });

        return NextResponse.json({ bookingId });
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const bookings = await getUserBookings(user.uid);
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}