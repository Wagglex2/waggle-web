/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import UserProfileModal from './UserProfileModal';
import api from '@/api/api';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
};

const defaultImgUrl =
  'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';

const ApplicantRow = ({ applicant, onClickName, onReject, onView }) => {
  const [userInfo, setUserInfo] = useState({
    name: applicant.name || applicant.nickname || '익명',
    profileImageUrl: defaultImgUrl,
    color: applicant.color,
  });

  useEffect(() => {
    const rawUser = applicant.user || applicant;

    const initialImg =
      rawUser.profileImageUrl || rawUser.profileImage || rawUser.avatar || rawUser.imgUrl;

    if (initialImg) {
      setUserInfo((prev) => ({ ...prev, profileImageUrl: initialImg }));
    } else {
      const targetId = rawUser.userId || rawUser.applicantId;

      if (targetId) {
        api
          .get(`/api/v1/users/${targetId}`)
          .then((res) => {
            const data = res.data.data || res.data;
            const fetchedImg =
              data.profileImageUrl || data.profileImage || data.imgUrl || defaultImgUrl;

            setUserInfo((prev) => ({
              ...prev,
              profileImageUrl: fetchedImg,
            }));
          })
          .catch(() => {});
      }
    }
  }, [applicant]);

  return (
    <div css={memberRow}>
      <div css={dot(userInfo.color)}>
        <img
          src={userInfo.profileImageUrl}
          alt={userInfo.name}
          onError={(e) => {
            e.target.src = defaultImgUrl;
          }}
        />
      </div>
      <button type="button" css={memberNameButton} onClick={(e) => onClickName(e, applicant)}>
        {userInfo.name}
      </button>
      <span css={applicationDate}>
        {applicant.applicationDate ? applicant.applicationDate.split(' ')[0] : ''}
      </span>
      <div css={memberActions}>
        <button
          css={rejectBtn}
          onClick={(e) => {
            e.stopPropagation();
            onReject(applicant.id);
          }}
        >
          거절하기
        </button>
        <button
          css={viewBtn}
          onClick={(e) => {
            e.stopPropagation();
            onView(applicant);
          }}
        >
          지원서보기
        </button>
      </div>
    </div>
  );
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
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleApplicantClick = (e, applicant) => {
    e.preventDefault();
    e.stopPropagation();

    const targetUser = applicant.user || applicant;
    const formattedUser = {
      ...applicant,
      ...targetUser,
      nickname: targetUser.nickname || targetUser.name || applicant.name,
      userId: targetUser.userId || targetUser.applicantId || targetUser.id,
      profileImageUrl: targetUser.profileImageUrl || targetUser.profileImage || defaultImgUrl,
    };

    setSelectedApplicant(formattedUser);
  };

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
              <ApplicantRow
                key={applicant.id}
                applicant={applicant}
                onClickName={handleApplicantClick}
                onReject={onRejectApplicant}
                onView={onViewApplicant}
              />
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

      {selectedApplicant && (
        <UserProfileModal
          isOpen={!!selectedApplicant}
          user={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
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
  white-space: nowrap;
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
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const memberNameButton = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-weight: 600;
  font-size: 15px;
  color: #333;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  cursor: pointer;
  text-align: left;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    text-decoration: underline;
  }
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
