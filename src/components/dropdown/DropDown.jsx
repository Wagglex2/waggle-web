/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';

const DropDown = ({ label, options, buttonWidth }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState(label);

  const handleSelect = (option) => {
    setSelected(option);
    setOpenModal(false);
  };

  return (
    <div css={dropDown(selected, label, buttonWidth)}>
      <button
        type="button"
        onClick={() => {
          setOpenModal(!openModal);
        }}
        disabled={label !== '목적' && label !== '포지션'}
      >
        {selected}
        {openModal ? (
          <ArrowDropUpIcon css={dropDownIcon} />
        ) : (
          <ArrowDropDownIcon css={dropDownIcon} />
        )}
      </button>

      {openModal && (
        <ul css={dropDownListBox}>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;

const dropDown = (selected, label, buttonWidth) => css`
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
    color: ${selected == label ? colors.gray[300] : '#000000'};
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

  margin-top: 5px;
  width: 200px;
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
