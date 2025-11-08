/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const MainPurposeFilter = () => {
  return (
    <div css={container}>
      <button css={filterBtn}>
        <span>목적</span>
        <ArrowDropDownIcon css={filterIcon} />
      </button>
      <ul css={optionBox}>
        <li>공모전</li>
        <li>해커톤</li>
        <li>사이드프로젝트</li>
        <li>토이프로젝트</li>
      </ul>
    </div>
  );
};

export default MainPurposeFilter;

const container = css`
  font-family: 'nanumR';
  color: ${colors.primary};
  margin-right: 16px;
`;

const filterBtn = css`
  width: 170px;
  height: 45px;
  border-radius: 30px;
  border: 3px solid ${colors.secondary};
  background-color: rgb(58, 54, 55, 0.9);

  text-align: left;
  font-family: 'nanumB';
  font-size: 17px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  color: ${colors.primary};
`;

const filterIcon = css`
  float: right;
  font-size: 35px;
  padding-top: '3px';
`;

const optionBox = css`
  position: absolute;
  top: 35px;

  padding: 10px 0;
  width: 170px;
  border-radius: 30px;
  border: 3px solid ${colors.secondary};
  background-color: rgb(58, 54, 55, 0.97);
  overflow: hidden;

  li {
    list-style-type: none;
    padding: 10px 15px;
    font-size: 15px;

    &:hover {
      background-color: #332f2f;
    }
  }
`;
