import React, { useEffect, useState } from 'react';
import { getPostsRealtime } from '@/services/postsService';
import Post from './Post';
// Remove the CSS import - it's now in _app.js

const PostsList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = getPostsRealtime((posts) => {
            setPosts(posts);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="posts-list">
            {posts.length === 0 ? (
                <p>No posts yet. Be the first to post!</p>
            ) : (
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            )}
        </div>
    );
};

export default PostsList;