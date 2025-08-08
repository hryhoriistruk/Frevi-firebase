import React, { useState } from 'react';
import { toggleLike } from '@/services/postsService';
import { auth } from '@/firebase/config';
// Remove this line: import '@/components/posts/styles.css';

const Post = ({ post }) => {
    const [isLiked, setIsLiked] = useState(
        post.likes.includes(auth.currentUser?.uid)
    );

    const handleLike = async () => {
        if (!auth.currentUser) return;
        try {
            await toggleLike(post.id, auth.currentUser.uid);
             setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    return (
        <div className="post">
            <div className="post-header">
                <img
                    src={post.authorPhotoURL || '/default-avatar.png'}
                    alt={post.authorName}
                />
                <div>
                    <h3>{post.authorName}</h3>
                    <small>{new Date(post.timestamp?.toDate()).toLocaleString()}</small>
                </div>
            </div>

            <div className="post-content">
                <p>{post.content}</p>
                {post.mediaType === 'image' && (
                    <img src={post.mediaURL} alt="Post content" />
                )}
                {post.mediaType === 'video' && (
                    <video controls src={post.mediaURL} />
                )}
            </div>

            <div className="post-actions">
                <button
                    onClick={handleLike}
                    className={isLiked ? 'liked' : ''}
                >
                    {isLiked ? 'Unlike' : 'Like'} ({post.likes?.length || 0})
                </button>
                <button>Comment ({post.commentsCount || 0})</button>
            </div>
        </div>
    );
};

export default Post;