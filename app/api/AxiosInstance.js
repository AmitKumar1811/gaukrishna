import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-gau.onrender.com/api/v1/';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            let token = localStorage.getItem('token');

            try {
                token = JSON.parse(token);
            } catch (e) { }
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                const currentPath = window.location.pathname + window.location.search;
                if (!window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
                    const loginUrl = currentPath && currentPath !== '/'
                        ? `/login?redirect=${encodeURIComponent(currentPath)}`
                        : '/login';
                    window.location.href = loginUrl;
                }
            }
        }
        return Promise.reject(error);
    }
);
