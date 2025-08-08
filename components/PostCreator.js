import React, { useState } from 'react';
import { createPost } from '@/services/postsService';
// Remove this line: import '@/components/posts/styles.css';

const PostCreator = () => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !media) return;

        setIsUploading(true);
        try {
            await createPost(content, media);
            setContent('');
            setMedia(null);
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="post-creator">
            <form onSubmit={handleSubmit}>
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            disabled={isUploading}
        />

                <div className="media-upload">
                    <label>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            onChange={(e) => setMedia(e.target.files[0])}
                            disabled={isUploading}
                        />
                        Add Photo/Video
                    </label>
                    {media && (
                        <span>
              {media.name}
                            <button type="button" onClick={() => setMedia(null)}>×</button>
            </span>
                    )}
                </div>

                <button type="submit" disabled={isUploading}>
                    {isUploading ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    );
};

export default PostCreator;