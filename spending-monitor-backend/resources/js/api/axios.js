import axios from 'axios';

const API = axios.create({
    baseURL: 'https://spending-monitor-backend.test/api',
});

export default API;