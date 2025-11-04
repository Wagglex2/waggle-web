/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React from "react";

const addedColors = {
  yellow: {
    background: '#FFF9DC',
  },
};

export const dropDownButtonStyle = (width, isSelected) => css`
  width: ${width};
  height: 40px;
  background-color: ${isSelected ? addedColors.yellow.background : '#ffffff'};
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'nanumR';
  transition: background-color 0.2s, color 0.2s;

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:focus {
    outline: none;
  }
`;

export const arrowIconStyle = css`
  margin-left: 10px;
  color: ${colors.gray[300]};
  flex-shrink: 0;
`;

export const dropdownContainerStyle = css`
  position: relative;
  display: inline-block;
`;

export const dropDownMenuStyle = css`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 8px;
  padding: 8px;
  list-style: none;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  max-height: 300px;
  overflow-y: auto;
`;

export const techDropDownMenuStyle = css`
  ${dropDownMenuStyle};
  width: 700px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

export const customCheckboxStyle = css`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid #E0E0E0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  transition: background-color 0.2s, border-color 0.2s;

  &:checked {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    &::after {
      content: '✔';
      font-size: 14px;
      color: white; 
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const dropDownMenuItemStyle = (isSelected, isGrid = false) => css`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-family: "nanumR";
  font-size: 14px;
  white-space: nowrap;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  background-color: ${isSelected && !isGrid ? addedColors.yellow.background : 'transparent'};

  &:hover {
    background-color: ${addedColors.yellow.background};
  }
`;

export const ArrowIcon = () => (
  <svg css={arrowIconStyle} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
);