import { create } from 'zustand';

const useAuthStore = create((set) => ({
  accessToken: null,
  userInfoChecking: false, // 사용자 프로필 확인용
  isLoading: true, // 토큰 확인 중 로딩 상태

  setAccessToken: (token) =>
    set({
      accessToken: token,
      isLoggedIn: !!token,
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
}));

export default useAuthStore;
