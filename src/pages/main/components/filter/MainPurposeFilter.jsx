/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';

const purposeList = ['전체', '공모전', '해커톤', '사이드프로젝트', '토이프로젝트'];

const MainPurposeFilter = () => {
  const [purpose, setPurpose] = useState('목적'); // 선택된 목적
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 필터 드롭다운 열림 여부

  // 드롭다운에서 원하는 옵션을 클릭 했을 때
  function handleDropdownOptionClick(selectedPurpose) {
    setPurpose(selectedPurpose);
    setIsDropdownOpen(false);
  }

  return (
    <div css={container}>
      <button css={filterBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <p>{purpose}</p>
        {!isDropdownOpen ? (
          <ArrowDropDownIcon css={filterIcon} />
        ) : (
          <ArrowDropUpIcon css={filterIcon} />
        )}
      </button>

      {isDropdownOpen && (
        <ul css={optionBox}>
          {purposeList.map((item, index) => (
            <li key={index} onClick={() => handleDropdownOptionClick(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
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

  p {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

    &:hover {
      background-color: #332f2f;
    }
  }
`;
