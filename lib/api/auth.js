import { fetchWrapper } from '../utils/fetchWrapper';
export const loginUser = (email, password) => {
    return fetchWrapper('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
};
export const registerUser = (userData) => {
    return fetchWrapper('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};
export const getProfile = () => {
    return fetchWrapper('/users/me');
};
export const logoutUser = () => {
    return fetchWrapper('/auth/logout', {
        method: 'POST',
    });
};