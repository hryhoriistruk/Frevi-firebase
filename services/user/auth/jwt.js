const jwt = require('jsonwebtoken');
const redis = require('../redis');

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Зберігаємо refresh-токен в Redis
    await redis.set(`refresh:${userId}`, refreshToken, 'EX', 604800); // 7 днів

    return { accessToken, refreshToken };
};

const verifyToken = (token, isRefresh = false) => {
    try {
        return jwt.verify(token, isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET);
    } catch (e) {
        throw new Error('Invalid token');
    }
};