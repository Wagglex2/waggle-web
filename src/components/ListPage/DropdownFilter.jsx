/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { colors } from "@/styles/theme";
import { EditCalendar } from "@mui/icons-material";

const dropDownButtonStyle = (isOpen, isSelected) => css`
  width: 120px;
  height: 40px;
  background-color: ${isSelected ? '#FFF9DC' : '#ffffff'};
  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  font-size: 16px;
  color: ${colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'nanumR';
  position: relative;
  
  span {
    white-space: nowrap;
  }
`;

const dropDownMenuStyle = css`
  position: absolute;
  top: 45px;
  left: 0;
  width: 120px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${colors.gray[100]};
  z-index: 100;
  padding: 8px 0;
  font-family: 'nanumR';
  font-size: 14px;
  list-style-type: none;
`;

const dropDownOptionStyle = (isSelected) => css`
  padding: 10px 12px;
  cursor: pointer;
  color: ${isSelected ? colors.secondary : colors.gray[300]};
  background-color: ${isSelected ? '#FFF9DC' : 'transparent'};
  &:hover {
    background-color: #FFF9DC;
  }
`;

const ArrowIcon = ({ direction, isOpen }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    css={css`
      color: ${colors.gray[300]};
      transform: ${isOpen ? "rotate(180deg)" : "rotate(0deg)"};
      transition: transform 0.2s ease-in-out;
    `}
  >
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
);

const DropdownFilter = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };
  
  return (
    <div css={css({ position: "relative" })}>
      <button css={dropDownButtonStyle(isOpen)} onClick={handleToggle}>
        <span>{selectedOption}</span>
        <ArrowIcon isOpen={isOpen} />
      </button>

      {isOpen && (
        <ul css={dropDownMenuStyle}>
          {options.map((option, index) => (
            <li
              key={index}
              css={dropDownOptionStyle(option === selectedOption)}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;