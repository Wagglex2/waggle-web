// src/components/common/ToggleSwitch.jsx
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react"; // useState 제거
import { colors } from "@/styles/theme";

const toggleSwitchStyle = css`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  input[type="checkbox"] { opacity: 0; width: 0; height: 0; }
  span {
    position: absolute;
    cursor: pointer;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: ${colors.gray[200]};
    transition: 0.4s;
    border-radius: 34px;
  }
  span:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 5px;
    bottom: 3px; /* 중앙 정렬 (3.5px -> 3px) */
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  input:checked + span { background-color: ${colors.primary}; }
  input:checked + span:before { transform: translateX(17px); }
`;

// 1. isToggled와 onToggle을 props로 받도록 변경
const ToggleSwitch = ({ isToggled, onToggle }) => {
  // 2. 내부 useState 제거

  const handleToggle = () => {
    onToggle(!isToggled); // 3. 부모에게 변경된 상태를 알림
  };

  return (
    <label css={toggleSwitchStyle}>
      {/* 4. props로 상태 제어 */}
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span />
    </label>
  );
};

export default ToggleSwitch;