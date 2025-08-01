import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthService = {
    async register(email, password, name) {
        const response = await axios.post(`${API_URL}/auth/register`, {
            email,
            password,
            name
        });
        return response.data;
    },

    async login(email, password) {
        const response = await axios.post(`${API_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    },

    async logout() {
        await axios.post(`${API_URL}/auth/logout`);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    async verifyToken(token) {
        try {
            const response = await axios.post(`${API_URL}/auth/verify-token`, { token });
            return response.data.isValid;
        } catch (error) {
            return false;
        }
    },

    async getCurrentUser(token) {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }
};