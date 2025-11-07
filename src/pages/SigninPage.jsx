import React from 'react';
import BallpitBackground from '../components/BallpitBackground';

const ballColors = [
  0xffffff, //검정
  0x26422a, //초록
];

function SigninPage() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#fffef9',
      }}
    >
      <div
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
      >
        <BallpitBackground
          count={100}
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
