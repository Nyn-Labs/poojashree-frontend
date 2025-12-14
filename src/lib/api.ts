import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://pooja-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      alert('Request timed out. Please try again.');
    } else if (!error.response) {
      alert('Backend server is offline. Please ensure the server is running.');
    }
    return Promise.reject(error);
  }
);

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  targetAudience: string;
  imageUrls: string[];
  sizes?: string[];
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export const productApi = {
  getAll: () => api.get<Product[]>('/products/all'),
  
  add: (productData: Omit<Product, 'id' | 'imageUrls'>, images: File[]) => {
    const formData = new FormData();
    formData.append('productData', JSON.stringify(productData));
    images.forEach((image) => {
      formData.append('images', image);
    });
    return api.post('/products/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  delete: (id: number) => api.delete(`/products/${id}`),
};

export const authApi = {
  login: (credentials: LoginCredentials) => 
    api.post<AuthResponse>('/auth/login', credentials),
};

export default api;
