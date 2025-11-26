/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Details = ({ detail }) => {
  return <div css={moreInfo}>{detail}</div>;
};

export default Details;

const moreInfo = css`
  margin-top: 8px;
  white-space: pre-line;
  font-size: 14px;
  min-height: 100px;
`;
