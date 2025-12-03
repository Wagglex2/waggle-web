import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <button onClick={() => navigate('/home')}>홈으로 돌아가기</button>
    </div>
  );
};

export default NotFoundPage;
