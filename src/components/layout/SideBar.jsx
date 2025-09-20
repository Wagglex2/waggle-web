/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div css={sideBarListBox}>
      <Link to={'/my-page/profile'}>
        <p>회원정보</p>
      </Link>
      <Link to={'/my-page/saved-job'}>
        <p>찜한 공고</p>
      </Link>
      <Link to={'/my-page/my-posted-job'}>
        <p>내가 올린 공고</p>
      </Link>
      <Link to={'/my-page/my-applications'}>
        <p>지원한 공고</p>
      </Link>
      <Link to={'/my-page/my-team'}>
        <p>내 팀 관리</p>
      </Link>
    </div>
  );
};

export default SideBar;

const sideBarListBox = css`
  width: 240px;
  height: 100vh;
  border-right: 1px solid ${colors.gray[100]};
  float: left;

  p {
    width: 100%;
    line-height: 55px;
    padding-left: 32px;
    color: ${colors.gray[300]};
    font-size: 14px;
    font-family: 'nanumB';

    &:hover {
      background-color: #fffceb;
      color: ${colors.secondary};
    }
  }
`;
