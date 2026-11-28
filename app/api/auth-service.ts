import { apiClient } from './AxiosInstance';
import { AUTH } from './endpoints';

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

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await apiClient.post(`${AUTH}/register`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (data: LoginData) => {
    try {
        const response = await apiClient.post(`${AUTH}/login`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error logging in user:", error);
        throw error;
    }
};

export const googleLoginUser = async (data: any) => {
    try {
        const response = await apiClient.post(`${AUTH}/google`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error with Google login:", error);
        throw error;
    }
};

export const forgotPasswordUser = async (email: string) => {
    try {
        const response = await apiClient.post(`${AUTH}/forgot-password`, { email });
        return response.data;
    } catch (error) {
        console.error("❌ Error with forgot password:", error);
        throw error;
    }
};

export const verifyResetOtp = async (data: { email: string; otp: string }) => {
    try {
        const response = await apiClient.post(`${AUTH}/verify-reset-otp`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error verifying OTP:", error);
        throw error;
    }
};

export const resetPasswordWithOtp = async (data: { email: string; otp: string; password: string }) => {
    try {
        const response = await apiClient.post(`${AUTH}/reset-password`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error resetting password:", error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await apiClient.post(`${AUTH}/logout`);
        return response.data;
    } catch (error) {
        console.error("❌ Error logging out user:", error);
        throw error;
    }
};
