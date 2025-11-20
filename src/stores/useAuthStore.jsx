import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,

      login: (token) => set({ 
        isLoggedIn: true, 
        accessToken: token 
      }),

      logout: () => set({ 
        isLoggedIn: false, 
        accessToken: null 
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);