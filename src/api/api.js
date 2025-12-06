import axios from 'axios';
import useAuthStore from '@/stores/useAuthStore';

const BASE_URL = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

function onTokenRefreshed(newToken) {
  refreshSubscribers.forEach((callback) => {
    try {
      callback(newToken);
    } catch (error) {
      console.error('재요청 중 에러:', error);
    }
  });

  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    // AccessToken 만료(401)
    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh 진행 중이면 대기열에 추가
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const authStore = useAuthStore.getState();

        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const authHeader = refreshResponse.headers.authorization;
        const newAccessToken = authHeader?.startsWith('Bearer ')
          ? authHeader.split(' ')[1]
          : authHeader;

        if (!newAccessToken) {
          throw new Error('새 토큰을 받지 못했습니다');
        }

        // Zustand에 저장
        authStore.setAccessToken(newAccessToken);

        // 대기 중인 요청들 처리
        onTokenRefreshed(newAccessToken);

        // 현재 요청도 재시도
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('토큰 갱신 실패:', refreshError);

        const authStore = useAuthStore.getState();
        authStore.logout();

        // 대기 중인 모든 요청 reject
        refreshSubscribers.forEach((callback) => {
          callback(null); // 또는 reject 처리
        });
        refreshSubscribers = [];

        alert('세션이 종료되었습니다. 다시 로그인해 주세요.');

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
