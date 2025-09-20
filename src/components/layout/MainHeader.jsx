/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link } from 'react-router-dom';

const MainHeader = () => {
  return (
    <div>
      <div css={container}>
        <Link to={'/'}>
          <p css={logo}>와글와글</p>
        </Link>
        <div css={searchBar}>
          <button>프로젝트</button>
          <input type="text" placeholder="검색어를 입력하세요" />
        </div>
        <div css={btnBox}>
          <Link to={'/notification'}>
            <button>알림</button>
          </Link>
          <Link to={'/my-page/profile'}>
            <button>마이페이지</button>
          </Link>
          <button>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;

const container = css`
  width: 100%;
  height: 60px;
  padding: 0px 80px;
  background-color: ${colors.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const logo = css`
  color: ${colors.primary};
  font-family: 'logo';
  font-size: 33px;
  margin-top: 2px;
`;

const searchBar = css`
  position: relative;
  width: 40%;

  input {
    width: 100%;
    height: 40px;
    border-radius: 30px;
    border: 1px solid ${colors.gray[100]};
    padding-left: 105px;
  }

  button {
    height: 32px;
    width: 90px;
    border-radius: 30px;
    border: none;
    background-color: ${colors.primary};
    position: absolute;
    bottom: 4px;
    left: 4px;

    padding-top: 2px;
    padding-left: 15px;

    font-size: 14px;
    font-family: 'nanumB';
    text-align: left;
  }
`;

const btnBox = css`
  button {
    height: 30px;
    padding: 2px 10px 0px 10px;
    margin-right: 8px;
    font-family: 'nanumR';
    font-size: 12px;
    border-radius: 10px;
    border: 1px solid ${colors.gray[100]};
  }
`;
