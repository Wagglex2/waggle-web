/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const Details = () => {
  return (
    <div css={moreInfo}>
      {`다가오는 경산 와글와글 위윙 공모전에 출전할 팀을 꾸리고 있습니다.
              \n
              🛠️ 기술 스택
              Frontend: React, Vite
              Backend: Node.js (Express) / Spring (예정)
              DB: MySQL
              협업 툴: GitHub, Notion, Jira
              \n
            `}
    </div>
  );
};

export default Details;

const moreInfo = css`
  margin-top: 8px;
  white-space: pre-line;
  font-size: 14px;
`;
