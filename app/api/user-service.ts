import { apiClient } from './AxiosInstance';
import { USERS, ADDRESSES, WISHLIST } from './endpoints';

export interface UserProfileData {
    name?: string;
    phone?: string;
}

export interface Address {
    _id?: string;
    id?: string;
    type: 'Home' | 'Work' | 'Other';
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
}

export const updateProfile = async (data: UserProfileData) => {
    try {
        const response = await apiClient.put(`${USERS}/me`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating profile:", error);
        throw error;
    }
};

export const getAddresses = async () => {
    try {
        const response = await apiClient.get(ADDRESSES);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching addresses:", error);
        throw error;
    }
};

export const addAddress = async (data: Omit<Address, '_id' | 'id'>) => {
    try {
        const response = await apiClient.post(ADDRESSES, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error adding address:", error);
        throw error;
    }
};

export const updateAddress = async (addressId: string, data: Partial<Address>) => {
    try {
        const response = await apiClient.put(`${ADDRESSES}/${addressId}`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating address:", error);
        throw error;
    }
};

export const deleteAddress = async (addressId: string) => {
    try {
        const response = await apiClient.delete(`${ADDRESSES}/${addressId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting address:", error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const response = await apiClient.get(`${USERS}/orders`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching orders:", error);
        throw error;
    }
};

export const getWishlist = async () => {
    try {
        const response = await apiClient.get(WISHLIST);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching wishlist:", error);
        throw error;
    }
};

export const removeFromWishlist = async (productId: string) => {
    try {
        const response = await apiClient.delete(`${WISHLIST}/${productId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error removing from wishlist:", error);
        throw error;
    }
};
