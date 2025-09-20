/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/layout/MainHeader';
import MainNav from '../components/layout/MainNav';
import SideBar from '../components/layout/SideBar';

const MainLayout = () => {
  return (
    <div>
      <MainHeader />
      <MainNav />
      <SideBar />
      <div
        css={css({
          marginLeft: '240px',
        })}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
