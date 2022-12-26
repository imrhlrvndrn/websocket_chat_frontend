import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000',
});

export default instance;
