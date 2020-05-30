import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const axiosBase = axios.create({
    baseURL: BASE_URL,
    timeout: 3000
});

export default axiosBase
