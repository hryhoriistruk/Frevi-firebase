import React from 'react';
import { useRouter } from "next/router";
import HeadTag from '../components/HeadTag';
import Navbar from '../components/Navbar/Navbar';
import PostCreator from '../components/PostCreator';
import PostsList from '../components/PostsList';
import Footer from '../components/Footer';

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