import { apiClient } from './AxiosInstance';
import { CART, CATEGORIES, ADDRESSES, ORDERS, PAYMENTS, PRODUCTS, USER, CONTACTS, COUPONS } from './endpoints';

export const getCart = async () => {
    try {
        const response = await apiClient.get(CART);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching cart:", error);
        throw error;
    }
};

export const addToCart = async (data: { productId: string; quantity: number }) => {
    try {
        const response = await apiClient.post(CART, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error adding to cart:", error);
        throw error;
    }
};

export const updateCartItem = async (data: { productId: string; quantity: number }) => {
    try {
        const response = await apiClient.put(CART, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating cart:", error);
        throw error;
    }
};

export const removeFromCart = async (productId: string) => {
    try {
        const response = await apiClient.delete(`${CART}/${productId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error removing from cart:", error);
        throw error;
    }
};

export const clearCart = async () => {
    try {
        const response = await apiClient.delete(CART);
        return response.data;
    } catch (error) {
        console.error("❌ Error clearing cart:", error);
        throw error;
    }
};

export const getAllCategories = async () => {
    try {
        const response = await apiClient.get(CATEGORIES);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        throw error;
    }
};

export const getAllAddresses = async () => {
    try {
        const response = await apiClient.get(ADDRESSES);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching addresses:", error);
        throw error;
    }
};

export const createAddress = async (data: any) => {
    try {
        const response = await apiClient.post(ADDRESSES, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error creating address:", error);
        throw error;
    }
};

export const editAddress = async (addressId: string, data: any) => {
    try {
        const response = await apiClient.put(`${ADDRESSES}/${addressId}`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating address:", error);
        throw error;
    }
};

export const removeAddress = async (addressId: string) => {
    try {
        const response = await apiClient.delete(`${ADDRESSES}/${addressId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error deleting address:", error);
        throw error;
    }
};

export const validateCoupon = async (data: { code: string; subtotal: number }) => {
    const response = await apiClient.post(`${COUPONS}/validate`, data);
    return response.data;
};

export const placeOrderFromCart = async (data: { items: any[], address: any, couponCode?: string }) => {
    try {
        const response = await apiClient.post(ORDERS, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error placing order:", error);
        throw error;
    }
};

export const buyNow = async (data: { productId: string; quantity: number; address: any; couponCode?: string }) => {
    try {
        const response = await apiClient.post(`${ORDERS}/buy-now`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error with buy now:", error);
        throw error;
    }
};

export const createPaymentOrder = async (orderId: string) => {
    try {
        const response = await apiClient.post(`${PAYMENTS}/create-order`, { orderId });
        return response.data;
    } catch (error) {
        console.error("❌ Error creating payment order:", error);
        throw error;
    }
};

export const verifyPayment = async (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
    try {
        const response = await apiClient.post(`${PAYMENTS}/verify`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error verifying payment:", error);
        throw error;
    }
};

export const getAllProducts = async (params?: any) => {
    try {
        const response = await apiClient.get(PRODUCTS, { params });
        return response; // returning the whole response as before, some code expects { data: ... }
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id: string) => {
    try {
        const response = await apiClient.get(`${PRODUCTS}/${id}`);
        return response;
    } catch (error) {
        console.error("❌ Error fetching product by ID:", error);
        throw error;
    }
};

export const getProductBySlug = async (slug: string) => {
    try {
        const response = await apiClient.get(`${PRODUCTS}/${slug}`);
        return response;
    } catch (err: any) {
        if (err.response?.status === 404) {
            const allRes = await apiClient.get(PRODUCTS, { params: { limit: 1000 } });
            const products = allRes.data?.data || [];
            const found = products.find((p: any) => p.slug === slug || p.id === slug || p._id === slug);
            if (found) return { data: { data: found } };
        }
        console.error("❌ Error fetching product by slug:", err);
        throw err;
    }
};

export const getRelatedProducts = async (id: string) => {
    try {
        const response = await apiClient.get(`${PRODUCTS}/${id}/related`);
        return response;
    } catch (error) {
        console.error("❌ Error fetching related products:", error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try {
        const response = await apiClient.get(`${USER}/profile`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching user profile:", error);
        throw error;
    }
};

export const updateUserProfileData = async (data: any) => {
    try {
        const response = await apiClient.put(`${USER}/profile`, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error updating user profile:", error);
        throw error;
    }
};

export const createContact = async (data: { name: string; email: string; subject: string; message: string }) => {
    try {
        const response = await apiClient.post(CONTACTS, data);
        return response.data;
    } catch (error) {
        console.error("❌ Error creating contact:", error);
        throw error;
    }
};

export const checkStock = async (items: any[]) => {
    try {
        const response = await apiClient.post(`${PRODUCTS}/check-stock`, { items });
        return response.data;
    } catch (error) {
        console.error("❌ Error checking stock:", error);
        throw error;
    }
};

export const getOrderById = async (id: string) => {
    try {
        const response = await apiClient.get(`${ORDERS}/${id}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching order by ID:", error);
        throw error;
    }
};

export const getAllBlogs = async () => {
    try {
        const response = await apiClient.get('/blogs');
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching blogs:", error);
        throw error;
    }
};

export const getBlogBySlug = async (slug: string) => {
    try {
        const response = await apiClient.get(`/blogs/${slug}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching blog by slug:", error);
        throw error;
    }
};
