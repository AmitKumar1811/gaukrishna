import { apiClient } from './api-client';
export interface LoginData {
    email: string;
    password?: string;
    token?: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone: string;
}

export const authService = {
    async register(data: RegisterData) {
        const response = await apiClient.post('/auth/register', data);
        return response.data;
    },

    async login(data: LoginData) {
        const response = await apiClient.post('/auth/login', data);
        return response.data;
    },

    async googleLogin(data: any) {
        const response = await apiClient.post('/auth/google', data);
        return response.data;
    },

    async forgotPassword(email: string) {
        const response = await apiClient.post('/auth/forgot-password', { email });
        return response.data;
    },

    async logout() {
        const response = await apiClient.post('/auth/logout');
        return response.data;
    },
};
