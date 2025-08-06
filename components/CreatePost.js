import React, { useState } from 'react';
import { ref as dbRef, push, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

function CreatePost() {
    const [postText, setPostText] = useState('');
    const [files, setFiles] = useState([]);

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload media files to Storage
        const mediaUrls = await Promise.all(
            files.map(async (file) => {
                const fileRef = storageRef(storage, `posts/${uuidv4()}_${file.name}`);
                await uploadBytes(fileRef, file);
                return await getDownloadURL(fileRef);
            })
        );

        // Save post to Realtime Database
        const postRef = push(dbRef(db, 'posts'));
        await set(postRef, {
            id: postRef.key,
            authorId: 'current_user_id', // Replace with actual user ID
            content: postText,
            mediaUrls,
            timestamp: Date.now(),
            likes: 0,
            comments: 0,
            isAd: false
        });

        setPostText('');
        setFiles([]);
    };

    return (
        <form onSubmit={handleSubmit}>
      <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="What's on your mind?"
      />
            <input
                type="file"
                multiple
                accept="image/*, video/*"
                onChange={handleFileChange}
            />
            <button type="submit">Post</button>
        </form>
    );
}

export default CreatePost;