/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { colors } from "@/styles/theme";

const toggleSwitchStyle = css`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;

  input[type="checkbox"] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    bottom: 3.5px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + span {
    background-color: ${colors.primary};
  }

  input:checked + span:before {
    transform: translateX(17px);
  }
`;

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <label css={toggleSwitchStyle}>
      <input type="checkbox" checked={isToggled} onChange={handleToggle} />
      <span />
    </label>
  );
};

export default ToggleSwitch;