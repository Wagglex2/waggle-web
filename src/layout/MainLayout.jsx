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
        <Outlet />
      ) : (
        <>
          <SideBar />
          <div css={myPageLayout}>
            <Outlet />
          </div>
        </>
      )}

      {openModal && <CreateJobModal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default MainLayout;

const myPageLayout = css`
  margin-left: 240px;
`;
