/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState, useEffect, useRef } from 'react';

const MultiSelectDropDown = ({ label, options, value, buttonWidth, onChange, prevData }) => {
  const dropdownRef = useRef(null);
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

  // 포커스 아웃 시 드롭다운 닫힘
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div css={dropDown(buttonWidth)} ref={dropdownRef}>
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
            <li key={option.name} onClick={() => handleSelect(option)}>
              <input
                className="check"
                type="checkbox"
                checked={selected.includes(option.desc)}
                onChange={() => {}}
              />
              <p>{option.desc}</p>
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
  padding-top: 3px;
`;

const dropDownListBox = css`
  position: relative;
  z-index: 10;

  width: 600px;
  height: 350px;
  overflow-y: scroll;
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
    height: 39px;
    gap: 6px;
    margin: 6px;
    border-radius: 5px;
    font-size: 14px;
    color: #000000;

    &:hover {
      background-color: #fffceb;
      cursor: pointer;
    }

    .check {
      accent-color: ${colors.primary};
      width: 17px;
      height: 17px;
    }
  }
`;
