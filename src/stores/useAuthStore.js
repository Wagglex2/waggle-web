import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      userInfoChecking: false,
      isLoading: true,

      setAccessToken: (token) =>
        set({
          accessToken: token,
          isLoading: false,
        }),

      login: (token) =>
        set({
          accessToken: token,
          isLoading: false,
        }),

      logout: () =>
        set({
          accessToken: null,
          userInfoChecking: false,
          isLoading: false,
        }),

      setUserInfoChecking: (value) =>
        set({
          userInfoChecking: value,
        }),

      setLoading: (value) =>
        set({
          isLoading: value,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuthStore;
