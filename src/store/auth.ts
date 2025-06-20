// Auth state: user + token stored in localStorage
import { create } from 'zustand';
import { api } from '../services/api';

interface User {
      _id: string;
      name: string;
      role: 'client' | 'provider' | 'admin';
      isValidated: boolean;
}

interface AuthState {
      user: User | null;
      token: string | null;
      login: (email: string, password: string) => Promise<void>;
      logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
      user: null,
      token: localStorage.getItem('token'),
      login: async (email, password) => {
            const res = await api.post('/auth/login', { email, password });
            const { token } = res.data;
            localStorage.setItem('token', token);
            set({ token });
            // Fetch /me profile
            const me = await api.get('/auth/me').then((r) => r.data.data);
            set({ user: me });
      },
      logout: () => {
            localStorage.removeItem('token');
            set({ user: null, token: null });
      }
}));
