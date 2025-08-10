// app/service/[id]/layout.js
import { getServiceById } from '@/lib/firebase/services';

export async function generateMetadata({ params }) {
    const service = await getServiceById(params.id);
    return {
        title: `${service.title} | Frevi Services`,
        description: service.description.substring(0, 160),
        openGraph: {
            images: service.images?.[0] || '/default-service.jpg',
        },
    };
}

export default function Layout({ children }) {
    return <>{children}</>;
}