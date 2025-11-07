/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const colors = {
  primary: '#FFCC00',
  text: '#3a3a3a',
  muted: '#8f8678',
  border: '#B3B3B3',
  white: '#fff',
  placeholder: '#b5b0a8',
  success: '#28a745',
  danger: '#dc3545',
};

const SignupPage = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [nicknameFormatError, setNicknameFormatError] = useState('');
  const [passwordFormatError, setPasswordFormatError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  const [nicknameCheck, setNicknameCheck] = useState({
    status: 'idle',
    message: '',
  });

  const [emailStatus, setEmailStatus] = useState({
    status: 'idle',
    message: '',
  });

  const navigate = useNavigate();

  const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/;
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,20}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nicknameCheck.status !== 'available' || emailStatus.status !== 'success') {
      alert('필수 항목(닉네임 중복 확인, 이메일 인증)을 완료해주세요.');
      return;
    }

    if (nicknameFormatError || passwordFormatError || passwordMatchError) {
      alert('입력 항목 중 오류가 있습니다. 확인해주세요.');
      return;
    }

    if (!nickname || !email || !password || !passwordConfirm) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    try {
      const payload = { nickname, email, password };
      await axios.post('/api/signup', payload);

      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCheckDuplicate = async () => {
    if (nicknameFormatError) {
      alert('닉네임 형식을 확인해주세요. (2~10자, 한글/영어/숫자)');
      return;
    }
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    setNicknameCheck({ status: 'checking', message: '확인 중...' });
    try {
      await axios.get(`/api/check-nickname?nickname=${nickname}`);
      setNicknameCheck({
        status: 'available',
        message: '사용가능한 닉네임입니다.',
      });
    } catch (error) {
      console.error('Nickname check error:', error);
      if (error.response?.status === 409) {
        setNicknameCheck({
          status: 'taken',
          message: '이미 사용중인 닉네임입니다.',
        });
      } else {
        setNicknameCheck({
          status: 'idle',
          message: '오류가 발생했습니다. 다시 시도해주세요.',
        });
      }
    }
  };

  const handleNicknameChange = (e) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
    setNicknameCheck({ status: 'idle', message: '' });

    if (newNickname && !nicknameRegex.test(newNickname)) {
      setNicknameFormatError('2~10자, 한글/영문/숫자만 사용 가능합니다.');
    } else {
      setNicknameFormatError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailStatus({ status: 'idle', message: '' });
  };

  const handleGetAuthCode = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    setEmailStatus({ status: 'sending', message: '인증번호 발송 중...' });

    try {
      await axios.post('/api/send-auth-code', { email });
      setEmailStatus({
        status: 'sent',
        message: '인증번호가 발송되었습니다. 이메일을 확인해주세요.',
      });
    } catch (error) {
      console.error('Send auth code error:', error);
      setEmailStatus({
        status: 'idle',
        message: error.response?.data?.message || '인증번호 발송에 실패했습니다.',
      });
    }
  };

  const handleConfirmAuthCode = async () => {
    if (!authCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    setEmailStatus((prev) => ({
      ...prev,
      status: 'confirming',
      message: '인증번호 확인 중...',
    }));

    try {
      await axios.post('/api/confirm-auth-code', { email, authCode });
      setEmailStatus({ status: 'success', message: '인증되었습니다.' });
    } catch (error) {
      console.error('Confirm auth code error:', error);
      setEmailStatus({
        status: 'error',
        message: error.response?.data?.message || '인증번호가 일치하지 않습니다.',
      });
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword && !passwordRegex.test(newPassword)) {
      setPasswordFormatError('영문자, 숫자, 특수문자 포함 8~20자여야 합니다.');
    } else {
      setPasswordFormatError('');
    }

    if (passwordConfirm && newPassword !== passwordConfirm) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError('');
    }
  };

  const handlePasswordConfirmChange = (e) => {
    const newPasswordConfirm = e.target.value;
    setPasswordConfirm(newPasswordConfirm);

    if (password !== newPasswordConfirm) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordMatchError('');
    }
  };

  const isVerified = emailStatus.status === 'success' && nicknameCheck.status === 'available';

  return (
    <div css={wrap}>
      <h1 css={logo}>
        <span css={yellow}>와</span>글<span css={yellow}>와</span>글
      </h1>
      <div css={formBox}>
        <h2 css={title}>회원가입</h2>

        <form
          onSubmit={handleSubmit}
          css={css`
            display: flex;
            flex-direction: column;
            flex-grow: 1;
          `}
        >
          <div css={fieldGroup}>
            <label css={label} htmlFor="nickname">
              닉네임
            </label>
            <div css={inputWrap}>
              <input
                type="text"
                id="nickname"
                css={flexInput}
                placeholder="2~10자, 한글/영어/숫자만 사용가능"
                value={nickname}
                onChange={handleNicknameChange}
                maxLength={10}
                disabled={isVerified}
              />
              <button
                type="button"
                css={sideBtn}
                onClick={handleCheckDuplicate}
                disabled={nicknameCheck.status === 'checking' || isVerified}
              >
                {nicknameCheck.status === 'checking' ? '확인 중...' : '중복 확인'}
              </button>
            </div>
            {nicknameFormatError && (
              <div css={[messageStyle('danger'), messageWrap]}>{nicknameFormatError}</div>
            )}
            {nicknameCheck.message && (
              <div css={[messageStyle(nicknameCheck.status), messageWrap]}>
                {nicknameCheck.message}
              </div>
            )}
          </div>

          <div css={fieldGroup}>
            <label css={label} htmlFor="email">
              학교 이메일
            </label>
            <div css={inputWrap}>
              <input
                type="email"
                id="email"
                css={flexInput}
                placeholder="학교 공식 이메일 계정 입력"
                value={email}
                onChange={handleEmailChange}
                disabled={isVerified}
              />
              <button
                type="button"
                css={sideBtn}
                onClick={handleGetAuthCode}
                disabled={emailStatus.status === 'sending' || isVerified}
              >
                {emailStatus.status === 'sending' ? '전송 중...' : '인증 번호 받기'}
              </button>
            </div>
            <div css={[inputWrap, { marginTop: '8px' }]}>
              <input
                type="text"
                id="authCode"
                css={flexInput}
                placeholder="인증 번호 입력"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                disabled={isVerified}
              />
              <button
                type="button"
                css={sideBtn}
                onClick={handleConfirmAuthCode}
                disabled={emailStatus.status === 'confirming' || isVerified}
              >
                {emailStatus.status === 'confirming' ? '확인 중...' : '확인'}
              </button>
            </div>
            {emailStatus.message && (
              <div
                css={[
                  messageStyle(
                    emailStatus.status === 'success'
                      ? 'available'
                      : emailStatus.status === 'error'
                        ? 'danger'
                        : 'idle'
                  ),
                  messageWrap,
                ]}
              >
                {emailStatus.message}
              </div>
            )}
          </div>

          <div css={fieldGroup}>
            <label css={label} htmlFor="password">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              css={fixedInput}
              placeholder="영문자, 숫자, 특수문자 포함 8~20자"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordFormatError && (
              <div css={[messageStyle('danger'), messageWrap]}>{passwordFormatError}</div>
            )}
            <input
              type="password"
              id="passwordConfirm"
              css={[fixedInput, { marginTop: '8px' }]}
              placeholder="비밀번호 확인해 주세요"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
            />
            {passwordMatchError && (
              <div css={[messageStyle('danger'), messageWrap]}>{passwordMatchError}</div>
            )}
          </div>

          <div css={submitWrap}>
            <button type="submit" css={submitBtn}>
              가입하기
            </button>
            <div css={loginLink}>
              <Link to="/signin">로그인 하기</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

const wrap = css`
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
  color: ${colors.text};
`;

const logo = css`
  font-family: 'logo', sans-serif;
  font-size: 70px;
  font-weight: 400;
  color: ${colors.text};
  margin-bottom: 24px;
  width: 250px;
  height: 77px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
`;

const yellow = css`
  color: ${colors.primary};
`;

const formBox = css`
  width: 760px;
  height: 780px;
  max-width: 100%;
  padding: 40px 50px;
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
`;

const title = css`
  font-size: 32px;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  font-weight: 800;
  text-align: center;
  margin-bottom: 32px;
  color: ${colors.text};
`;

const fieldGroup = css`
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const label = css`
  display: block;
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 8px;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  width: 480px;
  max-width: 100%;
`;

const inputWrap = css`
  display: flex;
  gap: 8px;
  width: 480px;
  max-width: 100%;
`;

const inputBase = css`
  height: 50px;
  padding: 0 14px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  &::placeholder {
    color: ${colors.placeholder};
  }
  &:focus {
    border-color: ${colors.primary};
  }
  &:disabled {
    background-color: #f5f5f5;
    color: ${colors.muted};
  }
`;

const flexInput = css`
  ${inputBase};
  flex-grow: 1;
  width: 100%;
`;

const fixedInput = css`
  ${inputBase};
  width: 480px;
  max-width: 100%;
`;

const sideBtn = css`
  width: 100px;
  flex-shrink: 0;
  height: 50px;
  border: none;
  border-radius: 10px;
  background: ${colors.primary};
  color: #173300;
  font-weight: 700;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  cursor: pointer;
  font-size: 14px;
  &:disabled {
    background: #f0f0f0;
    color: ${colors.muted};
    cursor: not-allowed;
  }
`;

const submitWrap = css`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const submitBtn = css`
  width: 370px;
  height: 50px;
  border: none;
  border-radius: 12px;
  background: ${colors.primary};
  color: #173300;
  font-size: 16px;
  font-weight: 700;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  cursor: pointer;
`;

const loginLink = css`
  text-align: center;
  margin-top: 20px;
  & > a {
    font-size: 14px;
    color: ${colors.muted};
    text-decoration: underline;
    &:hover {
      color: ${colors.text};
    }
  }
`;

const messageWrap = css`
  width: 480px;
  max-width: 100%;
`;

const messageStyle = (status) => css`
  font-size: 13px;
  margin-top: 8px;
  padding-left: 4px;
  color: ${status === 'available'
    ? colors.success
    : status === 'taken'
      ? colors.danger
      : status === 'danger'
        ? colors.danger
        : colors.muted};
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;
