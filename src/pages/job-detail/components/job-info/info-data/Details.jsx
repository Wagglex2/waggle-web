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
  ol {
    padding-left: 25px;
  }

  /* 기본 스타일 */
  white-space: pre-wrap;
  font-size: 1em;
  line-height: 1.5;
  color: inherit;

  /* Quill size 옵션 */
  .ql-size-small {
    font-size: 0.75em !important;
  }
  .ql-size-large {
    font-size: 1.5em !important;
  }
  .ql-size-huge {
    font-size: 2.5em !important;
  }

  /* Quill font style */
  .ql-bold {
    font-weight: bold !important;
  }
  .ql-italic {
    font-style: italic !important;
  }
  .ql-underline {
    text-decoration: underline !important;
  }
  .ql-strike {
    text-decoration: line-through !important;
  }

  /* Quill alignment */
  .ql-align-center {
    text-align: center !important;
  }
  .ql-align-right {
    text-align: right !important;
  }
  .ql-align-justify {
    text-align: justify !important;
  }

  /* List 스타일 (li[data-list] 기반) */
  li[data-list='bullet'] {
    list-style-type: disc;
    margin-left: 0.2em;
    position: relative;
  }
  li[data-list='ordered'] {
    list-style-type: decimal;
    margin-left: 0.2em;
    position: relative;
  }

  /* Quill UI span 숨기기 */
  li[data-list] > .ql-ui {
    display: none;
  }

  /* Indent */
  .ql-indent-1 {
    margin-left: 1.5em !important;
  }
  .ql-indent-2 {
    margin-left: 3em !important;
  }
  .ql-indent-3 {
    margin-left: 4.5em !important;
  }

  /* 링크 */
  a {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
  }

  /* span 내부 상속 (inline style 유지) */
  span {
    font-size: inherit !important;
    line-height: inherit;
    font-weight: inherit;
    font-style: inherit;
    text-decoration: inherit;
  }
`;
