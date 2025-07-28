import { db } from '../db';

export class UserService {
    // Create user in Firestore
    static async createUser(uid, userData) {
        await db.collection('users').doc(uid).set({
            ...userData,
            createdAt: new Date().toISOString()
        });
    }

    // Fetch user data
    static async getUser(uid) {
        const doc = await db.collection('users').doc(uid).get();
        return doc.exists ? doc.data() : null;
    }

    // Update user data
    static async updateUser(uid, data) {
        await db.collection('users').doc(uid).update(data);
    }
}