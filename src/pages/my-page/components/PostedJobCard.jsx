/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
};

const PostedJobCard = ({
  post,
  isOpen,
  onToggle,
  onEdit,
  onDelete,
  onRejectApplicant,
  onViewApplicant,
}) => {
  return (
    <section css={postCard}>
      <div
        css={postHeader}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        role="button"
        tabIndex="0"
        aria-expanded={isOpen}
      >
        <div css={postTitleSection}>
          <h3 css={postTitle}>{post.title}</h3>
          <div css={postActions} onClick={(e) => e.stopPropagation()}>
            <button css={editBtn} onClick={onEdit}>
              수정
            </button>
            <button css={deleteBtn} onClick={onDelete}>
              삭제
            </button>
          </div>
        </div>
        <div css={applicantInfoSection}>
          <span css={viewApplicants}>마감일 | {post.deadline}</span>
          <span css={viewApplicants}>지원자 보기</span>
        </div>
        <span css={caret(isOpen)} />
      </div>

      {isOpen && (
        <div css={postContent}>
          {post.applicants.length > 0 ? (
            post.applicants.map((applicant) => (
              <div css={memberRow} key={applicant.id}>
                <div css={dot(applicant.color)}>{applicant.avatar}</div>
                <span css={memberName}>{applicant.name}</span>
                <span css={applicationDate}>{applicant.applicationDate.split(' ')[0]}</span>
                <div css={memberActions}>
                  <button
                    css={rejectBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRejectApplicant(applicant.id);
                    }}
                  >
                    거절하기
                  </button>
                  <button
                    css={viewBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewApplicant(applicant);
                    }}
                  >
                    지원서보기
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              css={css`
                padding: 24px;
                text-align: center;
                color: ${colors.muted};
              `}
            >
              아직 지원자가 없습니다.
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default PostedJobCard;

const postCard = css`
  background: #fff;
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 16px;
`;

const postHeader = css`
  width: 100%;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  background: #fff;
  border: 0;
  border-bottom: 1px solid ${colors.border};
  cursor: pointer;
`;

const postTitleSection = css`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const postTitle = css`
  font-weight: 700;
  font-size: 18px;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
`;

const postActions = css`
  display: flex;
  gap: 8px;
`;

const editBtn = css`
  height: 27px;
  padding: 0 12px;
  border-radius: 5px;
  border: 1px solid #b3b3b3;
  background: #ffffff;
  color: #b3b3b3;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  &:hover {
    background: #f0f0f0;
  }
`;

const deleteBtn = css`
  height: 27px;
  padding: 0 12px;
  border-radius: 5px;
  border: 1px solid #b3b3b3;
  background: #ffffff;
  color: #b3b3b3;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  &:hover {
    background: #f0f0f0;
  }
`;

const applicantInfoSection = css`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-self: end;
`;

const viewApplicants = css`
  color: ${colors.muted};
  font-size: 14px;
`;

const caret = (isOpen) => css`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #26422a;
  align-self: center;
  justify-self: center;
  transition: transform 0.15s ease;
  transform: rotate(${isOpen ? 180 : 0}deg);
`;

const postContent = css`
  padding: 0;
`;

const memberRow = css`
  display: grid;
  grid-template-columns: 56px 1.5fr 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.border};
  &:last-of-type {
    border-bottom: none;
  }
`;

const dot = (bgColor) => css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${bgColor || '#e5e5e5'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
`;

const memberName = css`
  font-weight: 600;
  font-size: 15px;
  color: #333;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const applicationDate = css`
  font-size: 15px;
  color: ${colors.muted};
  text-align: center;
`;

const memberActions = css`
  display: flex;
  gap: 8px;
  justify-self: end;
`;

const rejectBtn = css`
  min-width: 104px;
  height: 35px;
  padding: 0 12px;
  border-radius: 40px;
  border: 1px solid #b3b3b3;
  background: #ffffff;
  color: #666666;
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  font-size: 15px;
  &:hover {
    background: #e3e3e3;
  }
`;

const viewBtn = css`
  min-width: 104px;
  height: 35px;
  padding: 0 12px;
  border-radius: 40px;
  border: 1px solid #b3b3b3;
  background: #fef1b2;
  color: #666666;
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  font-size: 15px;
  &:hover {
    background: #f9e89a;
  }
`;
