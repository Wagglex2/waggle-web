/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const messageContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #888;
  font-size: 1.1rem;
  text-align: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

export default function EmptyStateMessage({ message }) {
  return (
    <div css={messageContainerStyle}>
      {message}
    </div>
  );
}