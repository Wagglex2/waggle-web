/** @jsxImportSource @emotion/react */
import { positionOptions } from '@/data/options';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const MainPositionFilter = () => {
  return (
    <div css={container}>
      <button css={filterBtn}>
        <span>포지션</span>
        <ArrowDropDownIcon css={filterIcon} />
      </button>
      <ul css={optionBox}>
        {positionOptions.map((option) => (
          <li key={option}>
            <CheckBoxOutlineBlankIcon className="check-box-icon" />
            <span>{option}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPositionFilter;

const container = css`
  font-family: 'nanumR';
  color: ${colors.primary};
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

    display: flex;
    align-items: center;

    &:hover {
      background-color: #332f2f;
    }
  }

  .check-box-icon {
    margin-right: 8px;
  }
`;
