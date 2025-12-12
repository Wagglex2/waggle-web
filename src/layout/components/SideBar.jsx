/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
  const location = useLocation();
  const lastPath = location.pathname.split('/').filter(Boolean).pop();

  const sidebarList = [
    {
      path: '/my-page/profile',
      name: '내 프로필',
      current: 'profile',
    },
    {
      path: '/my-page/saved-job',
      name: '찜한 공고',
      current: 'saved-job',
    },
    {
      path: '/my-page/my-posted-job',
      name: '내가 올린 공고',
      current: 'my-posted-job',
    },
    {
      path: '/my-page/my-applications',
      name: '내가 지원한 공고',
      current: 'my-applications',
    },
    {
      path: '/my-page/my-team',
      name: '내 팀 관리',
      current: 'my-team',
    },
  ];

  return (
    <div css={sideBarListBox}>
      {sidebarList.map((item) => (
        <Link key={item.name} to={item.path}>
          <p css={currentCategory(item.current, lastPath)}>{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;

const sideBarListBox = css`
  position: sticky;
  top: 0;
  width: 240px;
  height: 100vh;
  border-right: 1px solid ${colors.gray[100]};
  float: left;
`;

const currentCategory = (current, lastPath) => css`
  width: 100%;
  line-height: 55px;
  padding-left: 32px;
  font-size: 14px;
  font-family: 'nanumB';
  background-color: ${current === lastPath ? '#fffceb' : '#ffffff'};
  color: ${current === lastPath ? 'black' : colors.gray[300]};

  &:hover {
    background-color: #fffceb;
    color: ${colors.secondary};
  }
`;
