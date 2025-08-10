// app/api/service/[id]/metadata/route.js
import { getServiceById } from '@/lib/firebase/services';

export async function GET(request, { params }) {
    const service = await getServiceById(params.id);

    return Response.json({
        title: `${service.title} | Frevi Services`,
        description: service.description.substring(0, 160),
        image: service.images?.[0] || '/default-service.jpg'
    });
}