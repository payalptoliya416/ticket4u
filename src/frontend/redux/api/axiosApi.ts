
import axios from 'axios';

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL;
const authToken = localStorage.getItem("authToken") || "";

const AxiosAddBank = axios.create({
    baseURL: ADMIN_API_URL, 
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
    },
});

export default AxiosAddBank;
