/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link } from 'react-router-dom';

const MainNav = () => {
  return (
    <div css={container}>
      <div css={navBox}>
        <Link to={'/project-list'}>
          <p>프로젝트</p>
        </Link>
        <Link to={'/hw-list'}>
          <p>과제</p>
        </Link>
        <Link to={'/study-list'}>
          <p>스터디</p>
        </Link>
      </div>
      <button css={createBtn}>공고등록하기</button>
    </div>
  );
};

export default MainNav;

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid ${colors.gray[100]};
  padding: 0px 80px;
  font-family: 'nanumB';
`;

const navBox = css`
  display: flex;
  margin-top: 5px;

  p {
    font-size: 15px;
    margin-right: 50px;
  }
`;

const createBtn = css`
  height: 31px;
  width: 98px;
  font-family: 'nanumB';
  font-size: 13px;
  border-radius: 10px;
  background-color: ${colors.primary};
  border: none;
`;
