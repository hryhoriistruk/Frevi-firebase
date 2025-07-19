import axios from 'axios';

const API_BASE_URL = 'http://localhost:9091/api'; // Замініть на URL вашого бекенду

export const UserService = {
    // Отримати всіх користувачів
    getAllUsers: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Отримати користувача по ID
    getUserById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    // Створити користувача
    createUser: async (user) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users`, user);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Логін користувача
    login: async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    // Додаткові методи (оновлення, видалення тощо)...
    updateUser: async (id, userData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
            return response.data;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
};