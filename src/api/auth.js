import axios from 'axios';
import api from './api';

const apiKey = import.meta.env.VITE_API_KEY; // 실제로는 Base URL

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
  return res.status;
};

// 닉네임 중복 확인
export const checkNicknameDuplicateApi = async (nickname) => {
  try {
    const res = await axios.get(`${apiKey}/api/v1/users/nickname/check?nickname=${nickname}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error(error.response.data.errors?.[0]?.message || '닉네임 형식이 잘못되었습니다.');
    }
    if (status === 409) {
      throw new Error('이미 사용중인 닉네임입니다.');
    }
    throw new Error(error.response?.data?.message || '닉네임 확인 중 오류가 발생했습니다.');
  }
};

// 아이디 중복 확인
export const checkUsernameDuplicateApi = async (username) => {
  try {
    const res = await axios.get(`${apiKey}/api/v1/users/username/check?username=${username}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error(error.response.data.errors?.[0]?.message || '아이디 형식이 잘못되었습니다.');
    }
    if (status === 409) {
      throw new Error('이미 사용중인 아이디입니다.');
    }
    throw new Error(error.response?.data?.message || '아이디 확인 중 오류가 발생했습니다.');
  }
};

// 이메일 중복 확인
export const checkEmailDuplicateApi = async (email) => {
  try {
    const res = await axios.get(`${apiKey}/api/v1/users/email/check?email=${email}`, {
      withCredentials: true,
    });
    return res.data.data;
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error(error.response.data.errors?.[0]?.message || '이메일 형식이 잘못되었습니다.');
    }
    throw new Error(error.response?.data?.message || '이메일 확인 중 오류가 발생했습니다.');
  }
};

// 인증번호 발송
export const sendEmailCodeApi = async (email) => {
  try {
    const res = await axios.post(
      `${apiKey}/api/v1/auth/email/code`,
      { email },
      { withCredentials: true }
    );
    return res.data.message || '인증번호가 발송되었습니다.';
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error(error.response.data.errors?.[0]?.message || '이메일 형식이 잘못되었습니다.');
    }
    throw new Error(error.response?.data?.message || '인증번호 발송 중 오류가 발생했습니다.');
  }
};

// 인증번호 확인
export const verifyEmailCodeApi = async (email, inputCode) => {
  try {
    const res = await axios.post(
      `${apiKey}/api/v1/auth/email/verify`,
      { email, inputCode },
      { withCredentials: true }
    );
    return res.data.message || '인증되었습니다.';
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error(
        error.response.data.errors?.[0]?.message ||
          error.response.data.message ||
          '인증번호가 일치하지 않거나 만료되었습니다.'
      );
    }
    throw new Error(error.response?.data?.message || '인증 중 오류가 발생했습니다.');
  }
};

// 회원가입
export const signupApi = async ({ username, password, nickname, email }) => {
  try {
    const res = await axios.post(
      `${apiKey}/api/v1/auth/sign-up`,
      { username, password, nickname, email },
      { withCredentials: true }
    );
    return res.data.message || '회원가입이 완료되었습니다.';
  } catch (error) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error(
        error.response.data.errors?.[0]?.message ||
          error.response.data.message ||
          '입력 정보가 유효하지 않습니다.'
      );
    }
    if (status === 409) {
      throw new Error(
        error.response.data.message || '이미 사용 중인 정보(아이디/닉네임/이메일)가 있습니다.'
      );
    }
    throw new Error(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
  }
};
