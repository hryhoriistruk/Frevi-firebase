'use client';
import { useEffect, useState } from 'react';
import Post from './Post';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const initializePosts = async () => {
                try {
                    const { getPostsRealtime } = await import('@/services/postsService');
                    const unsubscribe = getPostsRealtime((posts) => {
                        setPosts(posts);
                        setIsLoading(false);
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error("Error loading posts:", error);
                    setIsLoading(false);
                }
            };

            initializePosts();
        }
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-gray-200 h-12 w-12"></div>
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="posts-list space-y-6">
            {posts.length === 0 ? (
                <p className="text-center py-8 text-gray-500">
                    No posts yet. Be the first to post!
                </p>
            ) : (
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

export default PostsList;