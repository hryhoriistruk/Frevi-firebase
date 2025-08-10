'use client';
import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
import HeadTag from '../components/HeadTag';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer';

// Dynamically import Firebase-dependent components
const PostCreator = dynamic(
    () => import('../components/PostCreator'),
    {
        ssr: false,
        loading: () => <div className="py-4 text-center">Loading post creator...</div>
    }
);

const PostsList = dynamic(
    () => import('../components/PostsList'),
    {
        ssr: false,
        loading: () => <div className="py-8 text-center">Loading posts...</div>
    }
);

export default function FeedPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col">
            <HeadTag title="Frevi - Community Posts"/>
            <Navbar/>

            <main className="container mx-auto py-8 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-[#0C4A6E] mb-8">Community Posts</h1>
                    <PostCreator />
                    <PostsList />
                </div>
            </main>

            <Footer/>
        </div>
    );
}