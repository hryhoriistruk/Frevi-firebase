import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const generateJWT = (user) => {
    return jwt.sign(
        { uid: user.uid, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
};

export const verifyJWT = (token) => {
    return jwt.verify(token, JWT_SECRET);
};