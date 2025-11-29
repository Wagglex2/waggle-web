/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import DOMPurify from 'dompurify';

const Details = ({ detail }) => {
  const safeHTML = DOMPurify.sanitize(detail);
  return (
    <div
      css={moreInfo}
      dangerouslySetInnerHTML={{ __html: safeHTML }}
      style={{ whiteSpace: 'pre-wrap' }}
    />
  );
};

export default Details;

const moreInfo = css`
  margin-top: 8px;
  white-space: pre-line;
  font-size: 14px;
  min-height: 100px;
`;
