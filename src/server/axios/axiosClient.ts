import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_RPGSCRIPT_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default axiosInstance;