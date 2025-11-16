/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from "@/styles/theme";
import BackgroundBlob from './assets/background-blob.png';
import LogoBlob from './assets/logo-blob.png';

const pageWrapperStyle = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  background: '#fffef9',
  overflow: 'hidden',
};

const contentWrapperStyle = {
  position: 'relative',
  zIndex: 2,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const modalContainerStyle = {
  display: 'flex',
  width: '1100px',
  height: '500px',
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  padding: '48px',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
};

const formSectionStyle = {
  flex: 3.5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingRight: '48px',
};

const logoSectionStyle = {
  flex: 6.5,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderLeft: `1px solid ${colors.gray[100]}`,
  paddingLeft: '48px',
  position: 'relative',
};

const titleStyle = {
  fontSize: '25px',
  fontFamily: 'nanumEB',
  color: colors.secondary,
  margin: '0 0 32px 0',
  textAlign: 'center',
};

const inputWrapperStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontFamily: 'nanumEB',
  color: colors.secondary,
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  border: `1px solid ${colors.gray[100]}`,
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
  fontFamily: 'nanumR',
  '&::placeholder': {
    color: colors.gray[200],
    fontFamily: 'nanumB',
  },
  '&:focus': {
    borderColor: colors.primary,
    outline: 'none',
  },
};

const errorStyle = {
  color: '#e53e3e',
  fontFamily: 'nanumR',
  fontSize: '13px',
  textAlign: 'center',
  height: '16px',
  margin: '0 0 8px 0',
};

const loginButtonStyle = {
  width: '100%',
  padding: '14px',
  background: colors.primary,
  border: 'none',
  borderRadius: '8px',
  color: colors.secondary,
  fontSize: '16px',
  fontFamily: 'nanumEB',
  cursor: 'pointer',
  marginTop: '16px',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#f0c400',
  },
};

const signupLinkStyle = {
  marginTop: '24px',
  fontSize: '14px',
  color: colors.gray[400],
  textAlign: 'center',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontFamily: 'nanumB',
  '&:hover': {
    color: colors.secondary,
  },
};

const logoTextStyle = {
  fontSize: '33px',
  fontFamily: '210 Manbalchungchun',
  fontWeight: 900,
  color: colors.secondary,
  margin: -27,
};

const logoWaggleStyle = {
  fontSize: '90px',
  fontFamily: '210 Manbalchungchun',
  fontWeight: 900,
  letterSpacing: '4px',
  'span:nth-of-type(odd)': {
    color: '#FFC21F',
  },
  'span:nth-of-type(even)': {
    color: colors.secondary,
  },
};

function SigninPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault(); 
    
    if (id.trim() === '' || password.trim() === '') {
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    if (id !== 'admin' || password !== '1234') {
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.');
      return;
    }

    setErrorMessage('');
    navigate('/');
  };

  return (
    <>
      <div css={pageWrapperStyle}>
        <img
          src={BackgroundBlob}
          alt="Background"
          css={{
            position: 'absolute',
            top: '-10vh', 
            left: '-10vw', 
            width: '800px',
            height: '1000px',
            zIndex: 1,
          }}
        />

        <div css={contentWrapperStyle}>
          <div css={modalContainerStyle}>
            <form css={formSectionStyle} onSubmit={handleLogin}>
              <h1 css={titleStyle}>로그인</h1>
              <div css={inputWrapperStyle}>
                <label css={labelStyle}>아이디</label>
                <input
                  css={inputStyle}
                  type="text"
                  placeholder="2~10자, 영문, 한영 가능"
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    setErrorMessage('');
                  }}
                />
              </div>
              <div css={inputWrapperStyle}>
                <label css={labelStyle}>비밀번호</label>
                <input
                  css={inputStyle}
                  type="password"
                  placeholder="영문, 숫자, 특수문자 포함 8~20자"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage('');
                  }}
                />
              </div>

              <p css={errorStyle}>
                {errorMessage}
              </p>

              <button css={loginButtonStyle}>
                로그인 하기
              </button>
              <a css={signupLinkStyle}>회원가입</a>
            </form>

            <div css={logoSectionStyle}>
              <img
                src={LogoBlob}
                alt="Logo"
                css={{
                  position: 'absolute',
                  right: '-200px',
                  top: '-70px',
                  width: '600px',
                  height: '600px',
                  zIndex: 1,
                }}
              />
              <div
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center', 
                  marginLeft: '-150px',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <p css={logoTextStyle}>경북 인재들이 모인 곳</p>
                <div css={logoWaggleStyle}>
                  <span>와</span>
                  <span>글</span>
                  <span>와</span>
                  <span>글</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SigninPage;