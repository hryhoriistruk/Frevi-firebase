const { generateTokens } = require('../../services/user/auth/jwt');

describe('JWT Service', () => {
    beforeAll(() => {
        process.env.JWT_SECRET = 'test-secret';
        process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
    });

    test('Generates valid tokens', async () => {
        const { accessToken, refreshToken } = await generateTokens('user-123');
        expect(accessToken).toBeDefined();
        expect(refreshToken).toBeDefined();
    });
});