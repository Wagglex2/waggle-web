/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { css } from '@emotion/react';
import api from '@/api/api';

const defaultImgUrl =
  'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';

const colors = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    600: '#4b5563',
    800: '#1f2937',
    placeholder: '#666666',
  },
  roleBg: '#E8F5E9',
  roleText: '#2E7D32',
  skillBg: '#FFF9C4',
  skillText: '#F9A825',
};

const positionMap = {
  BACK_END: '백엔드',
  FRONT_END: '프론트엔드',
  FULL_STACK: '풀스택',
  DATA: '데이터',
  AI: 'AI',
  GAME: '게임',
  PLANNING: '기획',
  DESIGN: '디자인',
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
};

const UserProfileModal = ({ isOpen, onClose, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [extendedUser, setExtendedUser] = useState(null);
  const reviewsPerPage = 3;

  useEffect(() => {
    if (isOpen && user) {
      setExtendedUser(user);

      const targetId = user.applicantId || user.id || user.userId || user.recruiterId;

      if (targetId) {
        const fetchAllData = async () => {
          try {
            const userRes = await api.get(`/api/v1/users/${targetId}`);
            const userData = userRes.data.data || userRes.data;

            let reviewList = [];
            try {
              const reviewRes = await api.get(`/api/v1/users/${targetId}/reviews/received`);
              const reviewData = reviewRes.data.data || reviewRes.data;
              reviewList = reviewData.content || reviewData.reviews || [];
            } catch (reviewErr) {
              console.error(reviewErr);
            }

            setExtendedUser((prev) => ({
              ...prev,
              ...userData,
              bio: userData.shortIntro || userData.bio || userData.introduction || prev.bio,
              position: userData.positionType || userData.position || prev.position,
              skills: userData.skills || userData.tags || prev.skills,
              profileImageUrl:
                userData.profileImageUrl || userData.profileImage || prev.profileImageUrl,
              reviews: reviewList,
            }));
          } catch (err) {
            console.error(err);
          }
        };
        fetchAllData();
      }
    } else {
      setExtendedUser(null);
    }
  }, [isOpen, user]);

  if (!isOpen || !extendedUser) return null;

  const targetUser = extendedUser.user || extendedUser.member || extendedUser;

  const profileSrc =
    extendedUser.profileImageUrl ||
    targetUser.profileImageUrl ||
    targetUser.profileImage ||
    targetUser.imgUrl ||
    defaultImgUrl;

  const nickname = extendedUser.nickname || targetUser.nickname || targetUser.name || '익명';

  const bio =
    extendedUser.shortIntro ||
    extendedUser.bio ||
    extendedUser.introduction ||
    extendedUser.content ||
    targetUser.shortIntro ||
    targetUser.bio ||
    '';

  const tags =
    extendedUser.skills || extendedUser.tags || targetUser.skills || targetUser.tags || [];

  const reviews = extendedUser.reviews || [];
  const hasReviews = reviews.length > 0;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  let displayPosition = '';
  const rawPosition = extendedUser.position || targetUser.position;
  if (rawPosition) {
    if (typeof rawPosition === 'object') {
      displayPosition = rawPosition.desc || rawPosition.name;
    } else {
      displayPosition = positionMap[rawPosition] || rawPosition;
    }
  }

  return ReactDOM.createPortal(
    <div css={overlay} onClick={handleClose}>
      <div css={container} onClick={(e) => e.stopPropagation()}>
        <button css={closeButton} onClick={handleClose} aria-label="Close Profile Modal">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div css={contentWrapper}>
          <div css={profileHeader}>
            <div css={avatarSection}>
              <div className="avatar-circle">
                <img
                  src={profileSrc}
                  alt={`${nickname} Avatar`}
                  className="avatar-image"
                  onError={(e) => {
                    e.target.src = defaultImgUrl;
                  }}
                />
              </div>
              <h2 className="user-name">{nickname}</h2>
            </div>
            <div css={infoSection}>
              <div className="tag-list">
                {displayPosition && <span css={[tagBase, roleTag]}>#{displayPosition}</span>}
                {Array.isArray(tags) &&
                  tags.slice(0, 4).map((tag, idx) => {
                    const tagName = typeof tag === 'object' ? tag.name || tag.desc : tag;
                    return (
                      <span key={idx} css={[tagBase, skillTag]}>
                        #{tagName}
                      </span>
                    );
                  })}
              </div>
              <p className="user-bio">{bio}</p>
            </div>
          </div>

          <div css={divider}></div>

          <div css={reviewSection}>
            {hasReviews ? (
              <>
                <div className="review-list">
                  {currentReviews.map((review, idx) => {
                    let content = '내용 없음';
                    if (typeof review === 'string') content = review;
                    else if (review && typeof review === 'object') {
                      content =
                        review.content ||
                        review.comment ||
                        review.message ||
                        JSON.stringify(review);
                    }

                    return (
                      <div key={idx} css={reviewItem}>
                        {content}
                      </div>
                    );
                  })}
                </div>
                {totalPages > 1 && (
                  <div css={pagination}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number, index) => (
                      <React.Fragment key={number}>
                        {index > 0 && <span className="separator">|</span>}
                        <span
                          onClick={() => handlePageChange(number)}
                          className={`page-number ${currentPage === number ? 'active' : ''}`}
                        >
                          {number}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div css={emptyState}>
                <p>조회된 동료 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserProfileModal;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  padding: 16px;
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const container = css`
  position: relative;
  width: 780px;
  height: 500px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: scale(0.95);
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  @keyframes popIn {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  @media (max-width: 800px) {
    width: 95vw;
    height: 90vh;
  }
`;

const closeButton = css`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${colors.gray[400]};
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: ${colors.gray[800]};
    background-color: ${colors.gray[50]};
    transform: rotate(90deg);
  }
`;

const contentWrapper = css`
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  flex-grow: 1;
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const profileHeader = css`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }
`;

const avatarSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 120px;
  @media (max-width: 600px) {
    width: 100%;
  }
  .avatar-circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 12px;
    border: 3px solid ${colors.gray[200]};
  }
  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user-name {
    font-size: 24px;
    font-weight: 700;
    color: ${colors.gray[800]};
    margin: 0;
    font-family: 'nanumB', sans-serif;
    white-space: nowrap;
    text-align: center;

    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    display: block;
  }
`;

const infoSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 600px) {
    text-align: center;
  }
  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
    @media (max-width: 600px) {
      justify-content: center;
    }
  }
  .user-bio {
    color: ${colors.gray[600]};
    font-size: 15px;
    line-height: 1.6;
    margin: 0;
    white-space: pre-wrap;
    overflow-y: auto;
    max-height: 75px;
    text-align: left;
    @media (max-width: 600px) {
      text-align: center;
      max-height: 90px;
    }
  }
`;

const tagBase = css`
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  font-size: 13px;
  border-radius: 14px;
  font-weight: 600;
  white-space: nowrap;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-1px);
  }
`;

const roleTag = css`
  background-color: ${colors.roleBg};
  color: ${colors.roleText};
  font-weight: 700;
  border: 1px solid #c8e6c9;
`;

const skillTag = css`
  background-color: ${colors.skillBg};
  color: ${colors.skillText};
  border: 1px solid #ffecb3;
`;

const divider = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[200]};
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const reviewSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  max-height: 230px;
  overflow: hidden;
  .review-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    padding-right: 8px;
    flex-grow: 1;
  }
`;

const reviewItem = css`
  width: 100%;
  padding: 14px 18px;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 10px;
  font-size: 14px;
  color: ${colors.gray[600]};
  text-align: left;
  line-height: 1.5;
  box-sizing: border-box;
  transition: background-color 0.2s;
  cursor: default;
  &:hover {
    background-color: ${colors.gray[100]};
    border-color: ${colors.gray[300]};
  }
`;

const pagination = css`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: ${colors.gray[400]};
  font-weight: 600;
  flex-shrink: 0;
  .separator {
    color: ${colors.gray[300]};
  }
  .page-number {
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 6px;
    transition: all 0.2s;
    &:hover {
      color: ${colors.gray[800]};
      background-color: ${colors.gray[100]};
    }
    &.active {
      color: ${colors.gray[50]};
      background-color: ${colors.gray[800]};
      font-weight: 700;
      transform: scale(1.05);
    }
  }
`;

const emptyState = css`
  flex: 1;
  border: 2px dashed ${colors.gray[200]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[400]};
  font-size: 16px;
  padding: 20px;
  text-align: center;
`;
