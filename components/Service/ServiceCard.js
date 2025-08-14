import Link from 'next/link';

export default function ServiceCard({ service }) {
    return (
        <Link href={`/jobs/s/${service.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{service.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {service.category}
          </span>
                </div>
                <p className="text-gray-600 mt-2 line-clamp-2">{service.description}</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="font-bold">{service.price}</span>
                    {service.duration && (
                        <span className="text-sm text-gray-500">{service.duration}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}