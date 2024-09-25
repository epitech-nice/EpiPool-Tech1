import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

axiosInstance.interceptors.request.use(async (config) => {
    const authStore = useAuthStore();

    const tokenExpiration = authStore.tokenExpiration;
    const currentTime = Math.floor(Date.now() / 1000);

    if (tokenExpiration && tokenExpiration < currentTime) {
        authStore.logout();
        router.push('/login');
        return Promise.reject(new Error('Token expiré'));
    }

    const token = authStore.token;
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
    }, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
