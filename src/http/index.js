import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Requests

// ! Requests that might have to be discontinued
// -----------------------------------------------------------------------------
export const sendOtp = (data) => axios.post('/api/auth/send-otp', data);
export const verifyOtp = (data) => axios.post('/api/auth/verify-otp', data);
export const activateAccount = (data) => axios.post('/api/auth/activate', data);
export const authenticateUser = () => axios.get('/api/auth/authenticate-user');
export const createRoom = (data) => axios.post('/api/rooms/create', data);
export const getRooms = () => axios.get('/api/rooms');
// -----------------------------------------------------------------------------

export const loginUser = ({ email, password }) =>
    axios.post('/api/auth/login', { email, password });
export const refreshToken = () => axios.get('/api/auth/refresh');
export const logoutUser = (data) => axios.post('/api/auth/logout', data);
export const searchUsers = (searchTerm) => axios.get(`/api/user/search?query=${searchTerm}`);
export const getUser = (userId) => axios.get(`/api/user/${userId}`);
export const getUserChats = (userId) => axios.get(`/api/user/${userId}/chats`);
export const createChat = (chat_data) => axios.post('/api/chat', chat_data);
export const execChatOperation = ({ chatId = '', action = '', data = {} }) =>
    axios.post(`/api/chat/${chatId}/${action}`, data);

// Interceptors
axios.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalReq = error.config;
        console.log('Interceptor error => ', error.response.data.message);
        if (error.response.status === 401 && originalReq && !originalReq._isRetry) {
            originalReq._isRetry = true;
            try {
                await Axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/refresh`, {
                    withCredentials: true,
                });

                return axios.request(originalReq);
            } catch (error) {
                window.location.replace('/authenticate');
                console.log(error);
            }
        } else if (error.response.status === 401 && originalReq._isRetry) {
            await Axios.post(`${process.env.REACT_APP_API_ENDPOINT}/api/auth/logout`, {
                withCredentials: true,
            });
            window.location.replace('/authenticate');
        }
        throw error;
    }
);

export default axios;
