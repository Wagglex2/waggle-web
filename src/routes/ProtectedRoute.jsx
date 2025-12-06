/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import useAuthStore from '@/stores/useAuthStore';
import { colors } from '@/styles/theme';
import loadingImg from '../assets/img/loading.png';

const ProtectedRoute = ({ children }) => {
  const { accessToken, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div css={loading}>
        <div css={loadingImgBox}>
          <img src={loadingImg} />
        </div>
        <p>페이지를 불러오는 중...</p>
      </div>
    );
  }

  if (!accessToken) {
    return null; // App에서 navigate 처리됨
  }

  return children;
};

export default ProtectedRoute;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-20px);
  }
`;

const loadingImgBox = css`
  height: 250px;
  width: fit-content;
  animation: ${float} 1.2s ease-in-out infinite alternate;

  img {
    height: 100%;
    width: 100%;
  }
`;

const loading = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fffceb;

  p {
    font-family: 'nanumEB';
    font-size: 2em;
    color: ${colors.secondary};
    margin-left: 30px;
    margin-bottom: 30px;
  }
`;
