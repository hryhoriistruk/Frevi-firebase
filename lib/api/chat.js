import { fetchWrapper } from '../utils/fetchWrapper';

export const getChats = async () => {
    return fetchWrapper('/chats');
};

export const getMessages = async (chatId) => {
    return fetchWrapper(`/chats/${chatId}/messages`);
};

export const createChat = async (participantIds) => {
    return fetchWrapper('/chats', {
        method: 'POST',
        body: JSON.stringify({ participants: participantIds })
    });
};