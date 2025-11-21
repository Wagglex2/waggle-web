import axios from 'axios';
import api from './api';

const apiKey = import.meta.env.VITE_API_KEY;

// 로그인
export const signinApi = async (data) => {
  try {
    const res = await axios.post(`${apiKey}/api/v1/auth/sign-in`, data, {
      withCredentials: true,
    });

    const accessToken = res.headers.authorization?.replace('Bearer ', '');

    if (!accessToken) {
      throw new Error('토큰을 찾을 수 없습니다.');
    }

    return accessToken;
  } catch (error) {
    const status = error.response?.status;

    if (status === 401 || status === 404 || status === 500)
      throw new Error(error.response.data.message);

    throw new Error(error.message || '알 수 없는 오류가 발생했습니다.');
  }
};

// 로그아웃
export const logoutApi = async () => {
  const res = await api.post('/api/v1/auth/sign-out');
  //console.log(res);
  return res.status;
};
