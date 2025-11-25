/** @jsxImportSource @emotion/react */
import { positionOptions } from '@/data/options';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

const MainPositionFilter = () => {
  const [seletedPosition, setSelectedPosition] = useState([]); //선택된 포지션 리스트
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 필터 드롭다운 열림 여부

  // 드롭다운에서 원하는 옵션을 클릭 했을 때
  function handleOptionSelect(newPosition) {
    // 포지션 배열 업데이트
    setSelectedPosition((prev) =>
      prev.includes(newPosition)
        ? prev.filter((pos) => pos !== newPosition)
        : [...prev, newPosition]
    );
  }

  return (
    <div css={container}>
      <button css={filterBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <div>
          <span className="position-name">
            {seletedPosition.length === 0 ? '포지션' : seletedPosition[0]}
          </span>
          {seletedPosition.length > 1 && <span>+{seletedPosition.length - 1}</span>}
        </div>
        {!isDropdownOpen ? (
          <ArrowDropDownIcon css={filterIcon} />
        ) : (
          <ArrowDropUpIcon css={filterIcon} />
        )}
      </button>

      {isDropdownOpen && (
        <ul css={optionBox}>
          {positionOptions.map((item) => (
            <li key={item.name} onClick={() => handleOptionSelect(item.desc)}>
              {!seletedPosition.includes(item.desc) ? (
                <CheckBoxOutlineBlankIcon className="check-box-icon" />
              ) : (
                <CheckBoxIcon className="check-box-icon" />
              )}
              <span>{item.desc}</span>
            </li>
          ))}
        </ul>
      )}
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

  .position-name {
    padding-right: 5px;
  }
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
