/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState, useEffect } from 'react';

const DropDown = ({
  label,
  options,
  value,
  buttonWidth,
  dropDownWidth,
  onChange,
  prevData,
  isDisable,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(prevData?.desc || label);

  useEffect(() => {
    if (prevData) setSelected(prevData.desc);
  }, [prevData]);

  useEffect(() => {
    if (!value) {
      setSelected(label);
    } else {
      setSelected(value.desc);
    }
  }, [value, label]);

  const handleSelect = (option) => {
    setSelected(option.desc);
    onChange(option);
    setOpenModal(false);
  };

  return (
    <div css={dropDownBox(buttonWidth)}>
      <button
        css={dropDownBtn(selected, label, isDisable)}
        type="button"
        onClick={() => {
          setOpenModal(!openModal);
        }}
        disabled={isDisable ?? (label !== '목적' && label !== '포지션' && label !== '학년')}
      >
        {selected}
        {openModal ? (
          <ArrowDropUpIcon css={dropDownIcon(label)} />
        ) : (
          <ArrowDropDownIcon css={dropDownIcon(label)} />
        )}
      </button>

      {openModal && (
        <ul css={dropDownListBox(dropDownWidth)}>
          {options.map((option) => (
            <li key={option.name} onClick={() => handleSelect(option)}>
              {option.desc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;

const dropDownBox = (buttonWidth) => css`
  height: 33px;
  width: ${buttonWidth};
`;

const dropDownBtn = (selected, label, disabled) => css`
  width: 100%;
  height: 100%;
  text-align: left;
  padding-left: 10px;
  line-height: 30px;
  background-color: ${label === '과제' || label === '스터디' || label === '멤버' || disabled
    ? '#eeeeee'
    : '#ffffff '};

  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  font-family: 'nanumR';
  font-size: 15px;
  color: ${selected == label ? colors.gray[300] : '#000000'};
`;

const dropDownIcon = (label) => css`
  float: right;
  color: ${label === '과제' || label === '스터디' || label === '멤버'
    ? colors.gray[300]
    : colors.secondary};
  padding-top: 4px;
`;

const dropDownListBox = (width = '200px') => css`
  position: relative;
  z-index: 10;

  margin-top: 5px;
  width: ${width};
  padding: 10px 0px;
  background-color: #ffffff;

  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  float: left;

  li {
    padding: 10px 15px;
    font-size: 13px;
    list-style-type: none;
    color: #000000;

    &:hover {
      background-color: #fffceb;
    }
  }
`;
