/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const pageContainerStyle = css`
  max-width: 1167px;
  margin: 0 auto;
  padding: 24px;
`;

export default function PageWrapper({ children }) {
  return (
    <div css={pageContainerStyle}>
      {children}
    </div>
  );
}