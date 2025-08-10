import { getServices } from '@/lib/firebase/services';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const userId = searchParams.get('userId');

        const services = await getServices({ category, userId });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}