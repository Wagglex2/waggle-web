/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import RegistrantInfo from './meta-items/RegistrantInfo';
import BookMark from './meta-items/BookMark';
import ViewCount from './meta-items/ViewCount';

const Meta = () => {
  return (
    <div css={meta}>
      <div css={metaHeader}>
        <RegistrantInfo />
        <div className="other-info">
          <BookMark />
          <ViewCount />
        </div>
      </div>

      <p className="posting-period">게시:2025.12.31 - 마감: 2026.01.31</p>
      <h3 className="job-title text-green">경산 와글와글 위윙 웹 공모전 함께할 팀원 구합니다.</h3>
    </div>
  );
};

export default Meta;

const meta = css`
  .posting-period {
    font-size: 13px;
    color: ${colors.gray[300]};
    margin: 15px 0;
  }

  .job-title {
    padding-bottom: 12px;
    border-bottom: 1px solid ${colors.gray[300]};
  }
`;

const metaHeader = css`
  font-size: 13px;
  display: flex;
  justify-content: space-between;

  .user-info {
    display: flex;
    align-items: center;

    .user-img {
      width: 35px;
      height: 35px;
      border-radius: 100%;
      border: 1px solid ${colors.gray[300]};
      overflow: hidden;
    }

    .user-name {
      font-family: 'nanumB';
      margin-left: 8px;
    }
  }

  .other-info {
    display: flex;
    color: ${colors.gray[300]};

    .save-btn {
      border: none;
      background: none;
      color: ${colors.gray[300]};
    }

    .view-count {
      display: flex;
      align-items: center;

      p {
        margin: 1px 0 0 2px;
        font-family: 'nanumB';
      }
    }
  }
`;
