import { useRouter } from 'next/router';
import ServiceDetail from '../../../components/Service/ServiceDetail';
import Layout from '../../../components/layout/Layout';

export default function ServicePage() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Layout title="Service Details">
            <ServiceDetail serviceId={id} />
        </Layout>
    );
}