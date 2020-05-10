import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

const axiosBase = axios.create({
    baseURL: BASE_URL
});

export default axiosBase
