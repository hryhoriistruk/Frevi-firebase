// src/services/messageService.js
import axios from 'axios';

const messageService = axios.create({
    baseURL: 'http://localhost:9191', // URL MessageService (або інший порт)
});

export const getMessages = () => messageService.get('/messages');
export const getMessageById = (id) => messageService.get(`/messages/${id}`);
export const sendMessage = (data) => messageService.post('/messages', data);
export const updateMessage = (id, data) => messageService.put(`/messages/${id}`, data);
export const deleteMessage = (id) => messageService.delete(`/messages/${id}`);