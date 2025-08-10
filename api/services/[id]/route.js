// app/api/services/[id]/route.js
import { getServiceById } from '@/lib/firebase/services';

export async function GET(request, { params }) {
    try {
        const service = await getServiceById(params.id);
        return new Response(JSON.stringify(service), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}