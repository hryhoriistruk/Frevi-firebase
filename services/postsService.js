'use client';

export const createPost = async (content, mediaFile = null) => {
    if (typeof window === 'undefined') return null;

    try {
        const { auth } = await import('@/firebase/config');
        const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
        const user = auth.currentUser;

        let mediaURL = null;
        let mediaType = null;

        if (mediaFile) {
            try {
                const { storage } = await import('@/firebase/config');
                const { getStorage, ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

                const storageInstance = getStorage(storage);
                const storageRef = ref(storageInstance, `posts/${user.uid}/${Date.now()}`);
                await uploadBytes(storageRef, mediaFile);
                mediaURL = await getDownloadURL(storageRef);

                const fileType = mediaFile.type;
                mediaType = fileType.startsWith('image/') ? 'image' :
                    fileType.startsWith('video/') ? 'video' : null;
            } catch (error) {
                console.error('Error uploading media:', error);
                // Continue without media if upload fails
            }
        }

        const { db } = await import('@/firebase/config');
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
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};

export const getPostsRealtime = (callback) => {
    if (typeof window === 'undefined') {
        return () => {};
    }

    return async () => {
        try {
            const { db } = await import('@/firebase/config');
            const { collection, query, orderBy, onSnapshot } = await import('firebase/firestore');

            const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const posts = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                callback(posts);
            });

            return unsubscribe;
        } catch (error) {
            console.error('Error getting posts:', error);
            return () => {};
        }
    };
};

export const toggleLike = async (postId, userId) => {
    if (typeof window === 'undefined') return;

    try {
        const { db } = await import('@/firebase/config');
        const { doc, runTransaction } = await import('firebase/firestore');

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
    } catch (error) {
        console.error('Error toggling like:', error);
        throw error;
    }
};