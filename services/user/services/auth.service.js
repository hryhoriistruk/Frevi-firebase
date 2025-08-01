/**
 * Handles JWT and OAuth authentication.
 */
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async generateJWT(userId) {
        return jwt.sign({ id: userId }, this.jwtSecret, { expiresIn: '1h' });
    }

    async verifyGoogleToken(token) {
        const ticket = await this.googleClient.verifyIdToken({ idToken: token });
        return ticket.getPayload();
    }
}

module.exports = AuthService;