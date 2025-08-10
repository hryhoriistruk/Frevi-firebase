import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

// Динамічний імпорт контекстів
const AuthProvider = dynamic(() => import('@/context/AuthContext').then(mod => mod.default), { ssr: false });
const ChatProvider = dynamic(() => import('@/context/ChatContext').then(mod => mod.default), { ssr: false });
// Temporarily comment out FriendsProvider to test
// const FriendsProvider = dynamic(() => import('@/context/FriendsContext').then(mod => mod.default), { ssr: false });

function RouteLoading() {
    const router = useRouter();
    const [routeLoading, setRouteLoading] = useState(false);

    useEffect(() => {
        const handleStart = (url) => (url !== router.asPath) && setRouteLoading(true);
        const handleComplete = () => setTimeout(() => setRouteLoading(false), 100);

        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);

        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplete', handleComplete);
            router.events.off('routeChangeError', handleComplete);
        };
    }, [router]);

    return routeLoading && (
        <div className='h-full w-full flex justify-center items-center fixed top-0 left-0 bg-[#F3FFFC] z-30'>
            <div className='absolute flex flex-col justify-center items-center h-full mx-0 my-auto'>
                <ThreeDots
                    height={80}
                    width={80}
                    radius="9"
                    color="#a3beb6"
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        </div>
    );
}

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <AuthProvider>
                <ChatProvider>
                    {/* Temporarily comment out FriendsProvider */}
                    {/* <FriendsProvider> */}
                    <RouteLoading />
                    <Component {...pageProps} />
                    {/* </FriendsProvider> */}
                </ChatProvider>
            </AuthProvider>
        </SessionProvider>
    );
}