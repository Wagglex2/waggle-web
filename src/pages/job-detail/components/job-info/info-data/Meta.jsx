/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import BookMark from './meta-items/BookMark';
import ViewCount from './meta-items/ViewCount';
import RecruiterInfo from './meta-items/RecruiterInfo';

const Meta = ({ metaData, bookMarked, setBookMark, setIsProfileOpen }) => {
  const createdAt = metaData.createdAt.split(' ');
  const deadline = metaData.deadline.split(' ');

  return (
    <div css={meta}>
      <div css={metaHeader}>
        <RecruiterInfo
          imgUrl={metaData.imgUrl}
          userId={metaData.recruiterId}
          userNickname={metaData.recruiterNickname}
          setIsProfileOpen={setIsProfileOpen}
        />
        <div className="other-info">
          <BookMark
            bookMarkState={bookMarked}
            setBookMark={setBookMark}
            recruitmentId={metaData.recruitmentId}
          />
          <ViewCount viewCount={metaData.viewCount} />
        </div>
      </div>

      <p className="posting-period">
        게시: {createdAt[0]} | 마감: {deadline[0]}
      </p>
      <h3 className="job-title text-green">{metaData.title}</h3>
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

    &:hover {
      cursor: pointer;

      .user-name {
        color: ${colors.gray[400]};
        text-decoration: underline;
      }
    }

    .user-img {
      width: 45px;
      height: 45px;
      border-radius: 100%;
      border: 1px solid ${colors.gray[300]};
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-name {
      font-family: 'nanumR';
      margin-left: 8px;
      font-size: 15px;
    }
  }

  .other-info {
    display: flex;

    .box-style {
      background: #ffffff;
      border-radius: 10px;
      height: 28px;
      color: ${colors.gray[300]};
      border: 1px solid ${colors.gray[300]};
      display: flex;
      align-items: center;
    }

    .like-btn {
      margin-right: 15px;
      font-family: 'nanumB';
      padding: 0 8px;
    }

    .view-count {
      padding: 0px 8px;

      p {
        margin: 3px 0 0 5px;
        font-size: 15px;
      }
    }
  }
`;
