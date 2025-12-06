// import axios from 'axios';
// import useAuthStore from '@/stores/useAuthStore';

// const apiKey = import.meta.env.VITE_API_KEY;

// // api 요청 시 토큰을 보내야하는 경우에 대한 인스턴스
// const api = axios.create({
//   baseURL: apiKey,
//   withCredentials: true,
// });

// // 요청 인터셉터: 서버로 보내는 데이터 헤더에 AccessToken 자동 첨부
// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().accessToken;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // 응답 인터셉터: 401 -> accessToken 재발급
// let isRefreshing = false; // refresh 요청 여부(동시에 401 응답이 왔을 때, 401 응답을 받은 모든 요청들이 refresh 요청을 하지 않도록 하기 위함 => 중복 refresh 요청 방지용)
// let refreshSubscribers = []; // refresh 후 다시 서버로 보낼 요청 목록(요청을 보냈으나 accessToken 만료로 처리되지 못한 요청들)

// // 새로 받은 토큰으로 이전에 401 응답 받은 요청들 다시 처리
// // function onTokenRefreshed(newToken) {
// //   refreshSubscribers.forEach((cb) => {
// //     cb(newToken);
// //     console.log(cb);
// //   });
// //   refreshSubscribers = [];
// // }
// function onTokenRefreshed(newToken) {
//   console.log(`총 ${refreshSubscribers.length}개의 대기 요청을 처리합니다.`);

//   refreshSubscribers.forEach((cb) => {
//     // 아까 붙여둔 메모(targetUrl)를 확인합니다!
//     console.log('재요청 실행 중 -> URL:', cb.targetUrl);

//     cb(newToken); // 실행
//   });

//   refreshSubscribers = [];
// }

// api.interceptors.response.use(
//   (res) => res, // 요청이 정상적으로 성공 했을 때 즉, 기존 accsessToken이 유효할 때 받은 응답
//   async (error) => {
//     // accessToken이 만료됐을 때
//     // 실패했을 때
//     const { config, response } = error;
//     const originalRequest = config;

//     // AccessToken 만료(401)
//     if (response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       const authStore = useAuthStore.getState();

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const refreshResponse = await axios.post(
//             `${apiKey}/api/v1/auth/refresh`,
//             {},
//             { withCredentials: true }
//           );

//           const authHeader = refreshResponse.headers.authorization;
//           const newAccessToken = authHeader?.startsWith('Bearer ')
//             ? authHeader.split(' ')[1]
//             : authHeader;

//           // Zustand에 저장
//           authStore.setAccessToken(newAccessToken);

//           isRefreshing = false;
//           onTokenRefreshed(newAccessToken);
//         } catch (error) {
//           isRefreshing = false;
//           authStore.logout(); // Refresh도 만료 → 로그아웃
//           return Promise.reject(error);
//         }
//       }

//       // refresh 끝날 때까지 기다림
//       return new Promise((resolve) => {
//         // 1. 나중에 실행할 함수를 먼저 변수(retryOriginalRequest)에 담습니다.
//         const retryOriginalRequest = (newToken) => {
//           // 헤더 교체
//           originalRequest.headers.Authorization = `Bearer ${newToken}`;

//           // URL 완전하게 만들기 (상대 경로 이슈 해결)
//           if (!originalRequest.url.startsWith('http')) {
//             originalRequest.url = `${apiKey}${originalRequest.url}`;
//           }
//           originalRequest.baseURL = undefined;

//           // 재요청 실행
//           resolve(axios(originalRequest));
//         };

//         // 2. 디버깅을 위해 이 함수에 '어떤 주소인지' 메모를 붙입니다. (핵심!)
//         retryOriginalRequest.targetUrl = originalRequest.url;

//         // 3. 명단에 추가합니다.
//         refreshSubscribers.push(retryOriginalRequest);
//       });
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from 'axios';
import useAuthStore from '@/stores/useAuthStore';

const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: apiKey,
  withCredentials: true,
});

// ----------------------- Request Interceptor -----------------------
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ----------------------- Refresh System -----------------------
let isRefreshing = false;
let refreshSubscribers = [];

// 🔍 디버깅: onTokenRefreshed 내부에 로그 추가
function onTokenRefreshed(newToken) {
  console.log(
    `%c🔄 Refresh 완료! 총 ${refreshSubscribers.length}개의 대기 요청을 재실행합니다.`,
    'color:#4CAF50;font-weight:bold'
  );

  refreshSubscribers.forEach((cb) => {
    console.log(`▫ 재요청 실행 → ${cb.targetUrl}`);
    cb(newToken);
  });

  refreshSubscribers = [];
}

// ----------------------- Response Interceptor -----------------------
api.interceptors.response.use(
  (res) => res,
  async (error) => {
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

          // 대기 중인 요청들 처리
          onTokenRefreshed(newAccessToken);
          isRefreshing = false;

          // ✅ 첫 번째 요청도 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (error) {
          isRefreshing = false;
          refreshSubscribers = []; // ✅ 대기 목록 초기화
          authStore.logout();
          return Promise.reject(error);
        }
      }

      // ✅ refresh 진행 중이면 대기열에 추가
      return new Promise((resolve, reject) => {
        refreshSubscribers.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default api;
