/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const ApplyBtn = () => {
  return (
    <button css={applyBtnStyle} type="submit">
      지원하기
    </button>
  );
};

export default ApplyBtn;

const applyBtnStyle = css`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: #fef1b2;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'nanumB';
`;
