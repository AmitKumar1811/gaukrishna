import { apiClient } from './api-client';

export interface UserProfileData {
    name?: string;
    phone?: string;
}

export interface Address {
    _id?: string;
    id?: string; // Handle both potential ID fields from backend
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

export const userService = {
    // User Profile
    async updateProfile(data: UserProfileData) {
        const response = await apiClient.put('/users/me', data);
        return response.data;
    },

    // User Addresses
    async getAddresses() {
        const response = await apiClient.get('/addresses');
        return response.data;
    },

    async addAddress(data: Omit<Address, '_id' | 'id'>) {
        const response = await apiClient.post('/addresses', data);
        return response.data;
    },

    async updateAddress(addressId: string, data: Partial<Address>) {
        const response = await apiClient.put(`/addresses/${addressId}`, data);
        return response.data;
    },

    async deleteAddress(addressId: string) {
        const response = await apiClient.delete(`/addresses/${addressId}`);
        return response.data;
    },

    // User Orders
    async getOrders() {
        const response = await apiClient.get('/users/orders');
        return response.data;
    },

    // User Wishlist
    async getWishlist() {
        const response = await apiClient.get('/wishlist');
        return response.data;
    },

    async removeFromWishlist(productId: string) {
        const response = await apiClient.delete(`/wishlist/${productId}`);
        return response.data;
    }
};
