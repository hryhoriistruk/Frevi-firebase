import { db, auth } from '@/firebase/config';
import {
    collection, addDoc, serverTimestamp,
    query, orderBy, onSnapshot, doc,
    runTransaction
} from 'firebase/firestore';

// Try to import storage, but handle the case where it might not be available
let storage = null;
let uploadBytes = null;
let getDownloadURL = null;
let ref = null;

try {
    const storageModule = require('firebase/storage');
    const configModule = require('@/firebase/config');

    storage = configModule.storage;
    uploadBytes = storageModule.uploadBytes;
    getDownloadURL = storageModule.getDownloadURL;
    ref = storageModule.ref;
} catch (error) {
    console.warn('Firebase storage not available:', error);
}

export const createPost = async (content, mediaFile = null) => {
    const user = auth.currentUser;
    let mediaURL = null;
    let mediaType = null;

    if (mediaFile && storage) {
        const fileType = mediaFile.type;
        mediaType = fileType.startsWith('image/') ? 'image' :
            fileType.startsWith('video/') ? 'video' : null;

        try {
            const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}`);
            await uploadBytes(storageRef, mediaFile);
            mediaURL = await getDownloadURL(storageRef);
        } catch (error) {
            console.error('Error uploading media:', error);
            // Continue without media if upload fails
        }
    } else if (mediaFile && !storage) {
        console.warn('Storage not available, creating post without media');
    }

    const postRef = await addDoc(collection(db, 'posts'), {
        authorId: user.uid,
        authorName: user.displayName,
        authorPhotoURL: user.photoURL,
        content,
        mediaURL,
        mediaType,
        timestamp: serverTimestamp(),
        likes: [],
        commentsCount: 0
    });

    return postRef.id;
};

export const getPostsRealtime = (callback) => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const posts = [];
        snapshot.forEach(doc => {
            posts.push({ id: doc.id, ...doc.data() });
        });
        callback(posts);
    });
};

export const toggleLike = async (postId, userId) => {
    const postRef = doc(db, 'posts', postId);

    await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        const likes = postDoc.data().likes || [];

        if (likes.includes(userId)) {
            transaction.update(postRef, {
                likes: likes.filter(id => id !== userId)
            });
        } else {
            transaction.update(postRef, {
                likes: [...likes, userId]
            });
        }
    });
};