import React from 'react';
import BallpitBackground from '../components/BallpitBackground';

const ballColors = [
  0xfcd514, // 노랑
  0xfffeef, // 아이보리
  0xf7a41a, // 주황
];

function SigninPage() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#000000',
      }}
    >
      <div
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      >
        <BallpitBackground
          count={150}
          gravity={0}
          friction={0.99}
          wallBounce={0.95}
          followCursor={false}
          colors={ballColors}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <h1 style={{ color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
          로그인 페이지
        </h1>
      </div>
    </div>
  );
}

export default SigninPage;
