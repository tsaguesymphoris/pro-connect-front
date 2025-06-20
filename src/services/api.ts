// Axios instance with baseURL and auth header injection
import axios from 'axios';
import { useAuthStore } from '../store/auth';

export const api = axios.create({
      baseURL: import.meta.env.VITE_API_URL
});

// Attach JWT token automatically
api.interceptors.request.use(cfg => {
      const token = useAuthStore.getState().token;
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
      return cfg;
});
