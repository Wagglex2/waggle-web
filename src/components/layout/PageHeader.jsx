/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";

const pageTitleStyle = css`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  padding: 15px 0 15px 0;
  font-family: 'nanumEB';
`;

const dividerStyle = css`
  border-bottom: 1px solid ${colors.gray[100]};
  margin-bottom: 60px;
`;

export default function PageHeader({ title }) {
  return (
    <>
      <h1 css={pageTitleStyle}>{title}</h1>
      <div css={dividerStyle} />
    </>
  );
}