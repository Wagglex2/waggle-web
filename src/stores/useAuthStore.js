import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      userInfoChecking: false, // 사용자 프로필 입력 여부를 한 번만 불러오도록 하기 위한 state

      setAccessToken: (token) =>
        set({
          accessToken: token,
        }),

      login: (token) =>
        set({
          isLoggedIn: true,
          accessToken: token,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          accessToken: null,
          userInfoChecking: false,
        }),

      setUserInfoChecking: (value) => {
        set({
          userInfoChecking: value,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
