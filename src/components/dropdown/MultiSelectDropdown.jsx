/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState, useEffect } from 'react';

const MultiSelectDropDown = ({ label, options, value, buttonWidth, onChange, prevData }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(() => {
    return value?.map((v) => v.desc) || prevData?.map((item) => item.desc) || [];
  });

  // 스토어 값 변하면 UI 동기화
  useEffect(() => {
    if (Array.isArray(value)) {
      setSelected(value.map((v) => v.desc));
    }
  }, [value]);

  // 페이지 최초 로딩 시 prevData 반영 (value가 없을 때만)
  useEffect(() => {
    if (!value?.length && prevData?.length) {
      setSelected(prevData.map((item) => item.desc));
    }
  }, [prevData, value]);

  const handleSelect = (option) => {
    // UI 상태 업데이트
    setSelected((prev) =>
      prev.includes(option.desc)
        ? prev.filter((item) => item !== option.desc)
        : [...prev, option.desc]
    );

    // 스토어 상태 업데이트
    onChange((prev) =>
      prev.some((item) => item.name === option.name)
        ? prev.filter((item) => item.name !== option.name)
        : [...prev, option]
    );
  };

  return (
    <div css={dropDown(buttonWidth)}>
      <button type="button" onClick={() => setOpenModal(!openModal)}>
        {selected.length === 0 ? (
          label
        ) : (
          <>
            {selected.slice(0, 3).map((option) => (
              <span key={option}>{option}</span>
            ))}
            {selected.length > 3 && <span>+{selected.length - 3}개</span>}
          </>
        )}
        {openModal ? (
          <ArrowDropUpIcon css={dropDownIcon} />
        ) : (
          <ArrowDropDownIcon css={dropDownIcon} />
        )}
      </button>

      {openModal && (
        <ul css={dropDownListBox}>
          {options.map((option) => (
            <li key={option.name}>
              <input
                type="checkbox"
                checked={selected.includes(option.desc)}
                onChange={() => handleSelect(option)}
              />
              <span>{option.desc}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropDown;

const dropDown = (buttonWidth) => css`
  height: 33px;
  width: ${buttonWidth};

  button {
    width: 100%;
    height: 100%;
    text-align: left;
    padding-left: 10px;
    line-height: 30px;
    background-color: #ffffff;

    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    font-family: 'nanumR';
    font-size: 15px;
    color: ${colors.gray[300]};

    span {
      font-size: 14px;
      font-family: 'nanumB';
      padding: 5px 10px;
      margin-right: 5px;
      background-color: #fef7d4;
      border-radius: 5px;
      color: ${colors.secondary};
    }
  }
`;

const dropDownIcon = css`
  float: right;
  color: #3b3537;
  padding-top: '3px';
`;

const dropDownListBox = css`
  position: relative;
  z-index: 10;

  width: 530px;
  display: grid;
  grid-template-columns: repeat(4, 2fr);
  padding: 0px 10px;

  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  background-color: #ffffff;
  float: left;
  top: -10px;

  li {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px;
    font-size: 13px;
    color: #000000;

    input {
      accent-color: ${colors.primary};
    }
  }
`;
