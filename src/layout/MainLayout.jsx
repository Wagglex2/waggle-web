/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import MainHeader from './components/MainHeader';
import MainNav from './components/MainNav';
import SideBar from './components/SideBar';
import { useState } from 'react';
import CreateJobModal from './components/CreateJobModal';

const MainLayout = () => {
  const location = useLocation();
  const root = location.pathname.split('/').filter(Boolean)[0];

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <MainHeader />
      <MainNav setOpenModal={setOpenModal} />
      {root !== 'my-page' ? (
        <div css={mainPageLayout(root)}>
          <Outlet />
        </div>
      ) : (
        <div css={wrap}>
          <SideBar />
          <div css={myPageLayout}>
            <Outlet />
          </div>
        </div>
      )}
      <div css={footerWrap}>
        <div className="top">
          <p>와글와글</p>
        </div>
        <div className="bottom"></div>
      </div>

      {openModal && <CreateJobModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default MainLayout;

const wrap = css`
  position: relative;
`;

const mainPageLayout = (root) => css`
  padding-bottom: ${root === 'home' ? 0 : '120px'};
  min-height: 750px;
`;

const myPageLayout = css`
  margin-left: 240px;
  padding-bottom: 120px;
  min-height: 750px;
`;

const footerWrap = css`
  height: 100px;
  background-color: #858585;

  .top {
    border-bottom: 1px solid #cccccc;
    padding-top: 6px;
  }

  p {
    font-family: 'logo';
    font-size: 24px;
    color: #dddddd;
    padding-left: 80px;
  }
`;
