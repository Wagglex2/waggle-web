/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../styles/theme';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const MainHeader = () => {
  return (
    <div css={container}>
      <Link to={'/'}>
        <p css={logo}>와글와글</p>
      </Link>
      <div css={searchBar}>
        <button css={dropdownBtn}>
          프로젝트
          <ArrowDropDownIcon css={dropDownIcon} />
        </button>
        <input type="text" placeholder="카테고리 선택 후 검색어를 입력하세요" />
        <SearchIcon className="search-icon" />
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
    padding-right: 37px;
  }

  .search-icon {
    position: absolute;
    right: 12px;
    top: 8px;
    color: ${colors.gray[400]};

    &:hover {
      color: #000000;
    }
  }
`;

const dropdownBtn = css`
  height: 32px;
  width: 95px;
  border-radius: 30px;
  border: none;
  background-color: ${colors.primary};
  position: absolute;
  bottom: 4px;
  left: 4px;

  padding-top: 2px;
  padding-left: 10px;

  font-size: 14px;
  font-family: 'nanumB';

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const dropDownIcon = css`
  float: right;
  color: #3b3537;
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

    &:hover {
      background-color: #ffffff;
    }
  }
`;
