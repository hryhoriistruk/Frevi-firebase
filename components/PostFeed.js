import React, { useEffect, useState } from 'react';
import { dbRef, onValue } from 'firebase/database';
import { db } from '../firebase';

function PostFeed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const postsRef = dbRef(db, 'posts');
        onValue(postsRef, (snapshot) => {
            const data = snapshot.val() || {};
            setPosts(Object.values(data).sort((a, b) => b.timestamp - a.timestamp));
        });
    }, []);

    return (
        <div className="post-feed">
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div className="post-content">{post.content}</div>
                    <div className="post-media">
                        {post.mediaUrls.map((url) => (
                            <img key={url} src={url} alt="Post media" />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostFeed;