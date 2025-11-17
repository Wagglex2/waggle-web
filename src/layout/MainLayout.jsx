/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import MainNav from './components/MainNav';
import SideBar from './components/SideBar';
import { useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const root = location.pathname.split('/').filter(Boolean)[0];

  return (
    <div>
      <MainHeader />
      <MainNav />
      {root !== 'my-page' ? (
        <Outlet />
      ) : (
        <>
          <SideBar />
          <div css={myPageLayout}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;

const myPageLayout = css`
  margin-left: 240px;
`;
