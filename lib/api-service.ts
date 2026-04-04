import { apiClient } from './api-client';

export const apiService = {
    cart: {
        get: () => apiClient.get('/cart'),
        add: (data: { productId: string; quantity: number }) =>
            apiClient.post('/cart', data),
        update: (data: { productId: string; quantity: number }) =>
            apiClient.put('/cart', data),
        remove: (productId: string) =>
            apiClient.delete(`/cart/${productId}`),
        clear: () => apiClient.delete('/cart'),
    },
    categories: {
        getAll: () => apiClient.get('/categories'),
    },
    addresses: {
        getAll: () => apiClient.get('/addresses'),
        create: (data: any) => apiClient.post('/addresses', data),
        update: (addressId: string, data: any) => apiClient.put(`/addresses/${addressId}`, data),
        remove: (addressId: string) => apiClient.delete(`/addresses/${addressId}`),
    },
    orders: {
        placeFromCart: (data: { addressId: string }) => apiClient.post('/orders/cart', data),
        buyNow: (data: { productId: string; quantity: number; address: any }) =>
            apiClient.post('/orders/buy-now', data),
    },
    payments: {
        createOrder: (orderId: string) => apiClient.post('/payments/create-order', { orderId }),
        verify: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
            apiClient.post('/payments/verify', data),
    },
    products: {
        getAll: (params?: any) => apiClient.get('/products', { params }),
        getById: (id: string) => apiClient.get(`/products/${id}`),
        getBySlug: async (slug: string) => {
            try {
                // Try direct fetch first
                return await apiClient.get(`/products/${slug}`);
            } catch (err: any) {
                // If 404 Route Not Found, fallback to fetching all and finding by slug
                if (err.response?.status === 404) {
                    const allRes = await apiClient.get('/products', { params: { limit: 1000 } });
                    const products = allRes.data?.data || [];
                    const found = products.find((p: any) => p.slug === slug || p.id === slug || p._id === slug);
                    if (found) return { data: { data: found } };
                }
                throw err;
            }
        },
        getRelated: (id: string) => apiClient.get(`/products/${id}/related`),
    },
    user: {
        getProfile: () => apiClient.get('/user/profile'),
        updateProfile: (data: any) => apiClient.put('/user/profile', data),
    },
};
