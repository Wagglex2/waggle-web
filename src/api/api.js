import axios from 'axios';
import useAuthStore from '@/stores/useAuthStore';

const apiKey = import.meta.env.VITE_API_KEY;

// api 요청 시 토큰을 보내야하는 경우에 대한 인스턴스
const api = axios.create({
  baseURL: apiKey,
  withCredentials: true,
});

// 요청 인터셉터: 서버로 보내는 데이터 헤더에 AccessToken 자동 첨부
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 -> accessToken 재발급
let isRefreshing = false; // refresh 요청 여부(동시에 401 응답이 왔을 때, 401 응답을 받은 모든 요청들이 refresh 요청을 하지 않도록 하기 위함 => 중복 refresh 요청 방지용)
let refreshSubscribers = []; // refresh 후 다시 서버로 보낼 요청 목록(요청을 보냈으나 accessToken 만료로 처리되지 못한 요청들)

// 새로 받은 토큰으로 이전에 401 응답 받은 요청들 다시 처리
function onTokenRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => cb(newToken));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (res) => res, // 요청이 정상적으로 성공 했을 때 즉, 기존 accsessToken이 유효할 때 받은 응답
  async (error) => {
    // accessToken이 만료됐을 때
    // 실패했을 때
    const { config, response } = error;
    const originalRequest = config;

    // AccessToken 만료(401)
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const authStore = useAuthStore.getState();

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshResponse = await axios.post(
            `${apiKey}/api/v1/auth/refresh`,
            {},
            { withCredentials: true }
          );

          const authHeader = refreshResponse.headers.authorization;
          const newAccessToken = authHeader?.startsWith('Bearer ')
            ? authHeader.split(' ')[1]
            : authHeader;

          // Zustand에 저장
          authStore.setAccessToken(newAccessToken);

          isRefreshing = false;
          onTokenRefreshed(newAccessToken);
        } catch (error) {
          isRefreshing = false;
          authStore.logout(); // Refresh도 만료 → 로그아웃
          return Promise.reject(error);
        }
      }

      // refresh 끝날 때까지 기다림
      return new Promise((resolve) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
