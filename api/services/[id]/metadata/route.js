// app/api/services/[id]/metadata/route.js
import { getServiceById } from '@/lib/firebase/services';

export async function GET(request, { params }) {
    const service = await getServiceById(params.id);

    return new Response(JSON.stringify({
        title: `${service.title} | Frevi Services`,
        description: service.description.substring(0, 160),
        image: service.images?.[0] || '/default-service.jpg'
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}