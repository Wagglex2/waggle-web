/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import ToggleSwitch from "@/components/common/ToggleSwitch";

const filterSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  height: 40px;
`;

const dropDownsContainerStyle = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const toggleContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: -30px; 
`;

const toggleTextStyle = css`
  color: ${colors.gray[300]};
  font-size: 14px;
  font-family: 'nanumR';
`;

export default function FilterBar({ children, isClosed, onToggle }) {
  return (
    <div css={filterSectionStyle}>
      <div css={dropDownsContainerStyle}>
        {children}
      </div>
      <div css={toggleContainerStyle}>
        <span css={toggleTextStyle}>마감된 공고만</span>

        <ToggleSwitch isToggled={isClosed} onToggle={onToggle} />
      </div>
    </div>
  );
}