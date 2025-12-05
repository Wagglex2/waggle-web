/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { colors } from '@/styles/theme';
import BackgroundBlob from './assets/background-blob.png';
import LogoBlob from './assets/logo-blob.png';
import useAuthStore from '@/stores/useAuthStore';
import { signinApi } from '@/api/auth';

function SigninPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [idError, setIdError] = useState('');       
  const [pwError, setPwError] = useState('');       
  const [submitError, setSubmitError] = useState(''); 

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (event) => {
    event.preventDefault();
    
    setIdError('');
    setPwError('');
    setSubmitError('');

    let isValid = true;
    const idRegex = /^[a-zA-Z0-9]{4,10}$/;
    if (id.trim() === '') {
      setIdError('아이디를 입력해주세요.');
      isValid = false;
    } else if (!idRegex.test(id)) {
      setIdError('아이디는 4~10자의 영문 및 숫자만 사용 가능합니다.');
      isValid = false;
    }

    const pwRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (password.trim() === '') {
      setPwError('비밀번호를 입력해주세요.');
      isValid = false;
    } else if (!pwRegex.test(password)) {
      setPwError('비밀번호는 8~20자의 영문, 숫자, 특수문자를 포함해야 합니다.');
      isValid = false;
    }

    if (!isValid) return;

    try {
      const accessToken = await signinApi({
        username: id,
        password,
      });

      login(accessToken); 
      console.log('✨로그인 성공✨');
      navigate('/home');

    } catch (error) {
      if (error.response && error.response.status === 401) {
         setSubmitError('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else {
         setSubmitError(error.message || '로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
                  css={inputStyle(idError)}
                  type="text"
                  placeholder="아이디를 입력해 주세요."
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                    if (idError) setIdError('');
                  }}
                />
                {idError && <p css={fieldErrorStyle}>{idError}</p>}
              </div>

              <div css={inputWrapperStyle}>
                <label css={labelStyle}>비밀번호</label>

                <div css={{ position: 'relative' }}>
                  <input
                    css={inputStyle(pwError)}
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (pwError) setPwError('');
                    }}
                  />
                  
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    css={eyeIconButtonStyle}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {pwError && <p css={fieldErrorStyle}>{pwError}</p>}
              </div>

              <p css={submitErrorStyle}>{submitError}</p>

              <button css={loginButtonStyle}>로그인 하기</button>
              <p css={signupLinkStyle} onClick={() => navigate('/signup')}>
                회원가입
              </p>
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

const eyeIconButtonStyle = {
  position: 'absolute',
  top: '50%',
  right: '12px',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: colors.gray[400],
  display: 'flex',
  alignItems: 'center',
  padding: 0,
  zIndex: 10,
  '&:hover': {
    color: colors.secondary,
  },
};

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
  minHeight: '80px', 
};

const labelStyle = {
  display: 'block',
  fontSize: '14px',
  fontFamily: 'nanumEB',
  color: colors.secondary,
  marginBottom: '8px',
};

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '12px 40px 12px 12px', 
  border: `1px solid ${hasError ? '#e53e3e' : colors.gray[100]}`,
  borderRadius: '8px',
  fontSize: '14px',
  boxSizing: 'border-box',
  fontFamily: 'nanumR',
  '&::placeholder': {
    color: colors.gray[200],
    fontFamily: 'nanumB',
  },
  '&:focus': {
    borderColor: hasError ? '#e53e3e' : colors.primary,
    outline: 'none',
  },
  '&::-ms-reveal': {
    display: 'none',
  },
  '&::-ms-clear': {
    display: 'none',
  },
});

const fieldErrorStyle = {
  color: '#e53e3e',
  fontSize: '12px',
  fontFamily: 'nanumR',
  marginTop: '6px',
  marginLeft: '2px',
};

const submitErrorStyle = {
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
  marginTop: '8px',
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