/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useState } from 'react';
import { X, User } from 'lucide-react';
import { css } from '@emotion/react';

const colors = {
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    800: '#1f2937',
  },
  roleBg: '#E8F5E9',
  roleText: '#4CAF50',
  skillBg: '#FFF9C4',
  skillText: '#FBC02D',
  pinkBg: '#fdf2f8',
  pinkText: '#f9a8d4',
};

const UserProfileModal = ({ isOpen, onClose, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  if (!isOpen || !user) return null;

  const reviews = user.reviews || [];
  const hasReviews = reviews.length > 0;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div css={overlay}>
      <div css={container}>
        <button
          css={closeButton}
          onClick={() => {
            setCurrentPage(1);
            onClose();
          }}
        >
          <X size={24} />
        </button>

        <div css={contentWrapper}>
          <div css={profileHeader}>
            <div css={avatarSection}>
              <div className="avatar-circle">
                <div className="avatar-placeholder">
                  <User size={40} />
                </div>
              </div>
              <h2 className="user-name">{user.name}</h2>
            </div>

            <div css={infoSection}>
              <div className="tag-list">
                <span css={[tagBase, roleTag]}>#{user.role}</span>
                {user.tags.map((tag, idx) => (
                  <span key={idx} css={[tagBase, skillTag]}>
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="user-bio">{user.bio}</p>
            </div>
          </div>

          <div css={divider}></div>

          <div css={reviewSection}>
            {hasReviews ? (
              <>
                <div className="review-list">
                  {currentReviews.map((review, idx) => (
                    <div key={idx} css={reviewItem}>
                      {review}
                    </div>
                  ))}
                </div>

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
              </>
            ) : (
              <div css={emptyState}>
                <p>조회된 동료 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  padding: 16px;
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
`;

const container = css`
  position: relative;
  width: 780px;
  height: 500px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const closeButton = css`
  position: absolute;
  top: 20px;
  right: 20px;
  color: ${colors.gray[300]};
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s;

  &:hover {
    color: ${colors.gray[500]};
  }
`;

const contentWrapper = css`
  padding: 24px;
  padding-bottom: 24px;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const profileHeader = css`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
`;

const avatarSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 96px;
  margin-left: 24px;
  margin-top: 32px;

  .avatar-circle {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    border: 1px solid ${colors.gray[100]};
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    overflow: hidden;
    margin-bottom: 12px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background-color: ${colors.pinkBg};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.pinkText};
  }

  .user-name {
    font-size: 20px;
    color: ${colors.gray[800]};
    margin: 0;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  }
`;

const infoSection = css`
  flex: 1;
  padding-top: 64px;

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .user-bio {
    color: ${colors.gray[600]};
    font-size: 14px;
    line-height: 1.625;
    white-space: pre-line;
    margin: 0;
  }
`;

const tagBase = css`
  min-width: 60px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 9999px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const roleTag = css`
  background-color: ${colors.roleBg};
  color: ${colors.roleText};
`;

const skillTag = css`
  background-color: ${colors.skillBg};
  color: ${colors.skillText};
`;

const divider = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[100]};
  margin-bottom: 24px;
  flex-shrink: 0;
`;

const reviewSection = css`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;

  .review-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const reviewItem = css`
  width: 100%;
  padding: 16px;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[100]};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.gray[600]};
  text-align: center;
  cursor: default;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.gray[100]};
  }
`;

const pagination = css`
  margin-top: auto;
  padding-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${colors.gray[400]};
  letter-spacing: 0.1em;
  user-select: none;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;

  .separator {
    color: ${colors.gray[300]};
  }

  .page-number {
    cursor: pointer;
    transition:
      color 0.2s,
      transform 0.2s;

    &:hover {
      color: ${colors.gray[600]};
    }

    &.active {
      color: ${colors.gray[800]};
      transform: scale(1.1);
    }
  }
`;

const emptyState = css`
  width: 100%;
  height: 160px;
  border: 2px dashed ${colors.gray[200]};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    color: ${colors.gray[400]};
    font-size: 14px;
    margin: 0;
  }
`;
