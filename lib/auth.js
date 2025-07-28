// lib/auth.js
import { SignJWT, jwtVerify } from 'jose';

// For browser/Edge environments
const getSubtle = () => {
    if (typeof window !== 'undefined' && window.crypto) {
        return window.crypto.subtle;
    }
    return require('crypto').webcrypto.subtle;
};

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key'
);

export const signJWT = async (payload) => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(JWT_SECRET);
};

export const verifyJWT = async (token) => {
    try {
        return await jwtVerify(token, JWT_SECRET);
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
};

export const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await getSubtle().digest('SHA-256', data);
    return Buffer.from(hash).toString('hex');
};

export const comparePassword = async (password, hash) => {
    const newHash = await hashPassword(password);
    return newHash === hash;
};