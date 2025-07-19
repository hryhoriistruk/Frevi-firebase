import axios from 'axios';

const API_BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000/api';

export const UserService = {
    // Метод для входу через емайл/пароль
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    },

    // Інші методи (приклад)
    getUser: async (userId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
};