import React, { useState } from 'react';
import { useRouter } from "next/router";
import { FiRss, FiEdit2, FiTrendingUp, FiFilter } from 'react-icons/fi';
import HeadTag from '../components/HeadTag';
import Navbar from '../components/Navbar/Navbar';
import PostCreator from '../components/PostCreator';
import PostsList from '../components/PostsList';
import Footer from '../components/Footer';
import styles from '../styles/1FeedPage.module.css';

export default function FeedPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('latest');
    const [sortBy, setSortBy] = useState('newest');

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <HeadTag title="Frevi - Community Posts"/>
            <Navbar/>

            <main className="container mx-auto py-8 px-4 flex-1">
                <div className="max-w-4xl mx-auto">
                    {/* Header with tabs and sorting */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="flex items-center gap-3">
                            <FiRss className="text-2xl text-[#0C4A6E]" />
                            <h1 className="text-3xl font-bold text-[#0C4A6E]">Community Feed</h1>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-white pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:border-[#0C4A6E] focus:ring-1 focus:ring-[#0C4A6E] text-sm"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="trending">Trending</option>
                                </select>
                                <FiFilter className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'latest' ? 'text-[#0C4A6E] border-b-2 border-[#0C4A6E]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('latest')}
                        >
                            <FiRss /> Latest
                        </button>
                        <button
                            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 ${activeTab === 'featured' ? 'text-[#0C4A6E] border-b-2 border-[#0C4A6E]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('featured')}
                        >
                            <FiTrendingUp /> Featured
                        </button>
                    </div>

                    {/* Post creator */}
                    <div className="mb-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <FiEdit2 className="text-[#0C4A6E]" />
                            <h2 className="text-lg font-semibold">Create a Post</h2>
                        </div>
                        <PostCreator />
                    </div>

                    {/* Posts list with subtle animation */}
                    <div className="space-y-6">
                        <PostsList sortBy={sortBy} />
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}