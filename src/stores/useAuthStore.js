import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      userInfoChecking: false,
      //isLoading: true, // 새로고침 시 초기값은 true로 시작해야 안전합니다.

      setAccessToken: (token) =>
        set({
          accessToken: token,
          // isLoggedIn은 accessToken 유무로 파생 가능하므로 굳이 상태로 안 둬도 되지만,
          // 필요하다면 여기서 같이 관리합니다.
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
      name: 'auth-storage', // 로컬 스토리지에 저장될 키 이름 (개발자 도구 > Application 탭에서 확인 가능)
      storage: createJSONStorage(() => localStorage), // (생략 가능, 기본값이 localStorage임)

      // 🔥 중요: accessToken만 저장하고, isLoading 같은 화면 상태는 저장하지 않음
      // 만약 isLoading: false를 저장해버리면, 새로고침 했을 때 로딩이 안 떠서
      // 토큰 체크하기 전에 화면이 노출되는 버그가 생길 수 있습니다.
      partialize: (state) => ({
        accessToken: state.accessToken,
      }),
    }
  )
);

export default useAuthStore;
