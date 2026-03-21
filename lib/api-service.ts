import { apiClient } from './api-client';

export const apiService = {
    cart: {
        get: () => apiClient.get('/cart'),
        add: (data: { productId: string; variantId: string; quantity: number }) =>
            apiClient.post('/cart', data),
        update: (data: { productId: string; variantId: string; quantity: number }) =>
            apiClient.put('/cart', data),
        remove: (productId: string, variantId: string) =>
            apiClient.delete(`/cart/${productId}/${variantId}`),
        clear: () => apiClient.delete('/cart'),
    },
    categories: {
        getAll: () => apiClient.get('/categories'),
    },
    products: {
        getAll: (params?: any) => apiClient.get('/products', { params }),
        getById: (id: string) => apiClient.get(`/products/${id}`),
        getBySlug: (slug: string) => apiClient.get(`/products/${slug}`),
        getRelated: (id: string) => apiClient.get(`/products/${id}/related`),
    },
    user: {
        getProfile: () => apiClient.get('/user/profile'),
        updateProfile: (data: any) => apiClient.put('/user/profile', data),
    },
};
