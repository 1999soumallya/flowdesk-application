import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: User, token: string) => void;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(persist((set, get) => ({
  user: null, token: null, isAuthenticated: false, isLoading: true,
  login: (user, token) => set({ user, token, isAuthenticated: true, isLoading: false, }),
  logout: () => set({ user: null, token: null, isAuthenticated: false, isLoading: false, }),

  fetchProfile: async () => {
    const { token, logout } = get();

    if (!token) {
      setTimeout(() => {
        set({ user: null, isAuthenticated: false, isLoading: false, });
      }, 2000);
      return;
    }

    try {
      set({ isLoading: true });

      const response = await fetch('https://api.example.com/auth/me', { headers: { Authorization: `Bearer ${token}` } });

      if (!response.ok) {
        throw new Error('Session expired');
      }

      const user: User = await response.json();

      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      logout();
    }
  },
}), {
  name: 'auth-storage',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ token: state.token }),
  onRehydrateStorage: () => (state) => {
    if (state) {
      setTimeout(() => state.fetchProfile(), 0);
    }
  },
}));
