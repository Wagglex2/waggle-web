/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useState } from 'react';
import { css } from '@emotion/react';

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

const UserProfileModal = ({ isOpen, onClose, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3; // user prop이 없거나 모달이 닫혀있으면 렌더링하지 않습니다.

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
           {' '}
      <div css={container}>
               {' '}
        <button
          css={closeButton}
          onClick={() => {
            setCurrentPage(1);
            onClose();
          }}
        >
                   {' '}
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
                        <line x1="18" y1="6" x2="6" y2="18"></line>           {' '}
            <line x1="6" y1="6" x2="18" y2="18"></line>         {' '}
          </svg>
                 {' '}
        </button>
               {' '}
        <div css={contentWrapper}>
                   {' '}
          <div css={profileHeader}>
                       {' '}
            <div css={avatarSection}>
                           {' '}
              <div className="avatar-circle">
                               {' '}
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder"></div>
                )}
                             {' '}
              </div>
                            <h2 className="user-name">{user.name}</h2>           {' '}
            </div>
                       {' '}
            <div css={infoSection}>
                           {' '}
              <div className="tag-list">
                                {user.role && <span css={[tagBase, roleTag]}>#{user.role}</span>}   
                           {' '}
                {user.tags &&
                  user.tags.map((tag, idx) => (
                    <span key={idx} css={[tagBase, skillTag]}>
                                            #{tag}                   {' '}
                    </span>
                  ))}
                             {' '}
              </div>
                            <p className="user-bio">{user.bio}</p>           {' '}
            </div>
                     {' '}
          </div>
                    <div css={divider}></div>         {' '}
          <div css={reviewSection}>
                       {' '}
            {hasReviews ? (
              <>
                               {' '}
                <div className="review-list">
                                   {' '}
                  {currentReviews.map((review, idx) => (
                    <div key={idx} css={reviewItem}>
                                            {review}                   {' '}
                    </div>
                  ))}
                                 {' '}
                </div>
                               {' '}
                <div css={pagination}>
                                   {' '}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number, index) => (
                    <React.Fragment key={number}>
                                            {index > 0 && <span className="separator">|</span>}     
                                     {' '}
                      <span
                        onClick={() => handlePageChange(number)}
                        className={`page-number ${currentPage === number ? 'active' : ''}`}
                      >
                                                {number}                     {' '}
                      </span>
                                         {' '}
                    </React.Fragment>
                  ))}
                                 {' '}
                </div>
                             {' '}
              </>
            ) : (
              <div css={emptyState}>
                                <p>조회된 동료 리뷰가 없습니다.</p>             {' '}
              </div>
            )}
                     {' '}
          </div>
                 {' '}
        </div>
             {' '}
      </div>
         {' '}
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
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  padding: 16px;
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
`;

const container = css`
  position: relative;
  width: 750px;
  height: 400px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  &:hover {
    color: ${colors.gray[600]};
  }
`;

const contentWrapper = css`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const profileHeader = css`
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
`;

const avatarSection = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 96px;
  margin-left: 10px;
  margin-top: 10px;

  .avatar-circle {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 12px;
  }

  .avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    width: 100%;
    height: 100%;
    background-color: ${colors.gray.placeholder};
  }

  .user-name {
    font-size: 20px;
    font-weight: bold;
    color: ${colors.gray[800]};
    margin: 0;
    font-family: 'nanumB', sans-serif;
    white-space: nowrap;
  }
`;

const infoSection = css`
  flex: 1;
  padding-top: 10px;
  overflow: hidden;

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 12px;
  }

  .user-bio {
    color: ${colors.gray[600]};
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
    white-space: pre-wrap;
    overflow-y: auto;
    max-height: 66px;
  }
`;

const tagBase = css`
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  font-size: 13px;
  border-radius: 12px;
  font-family: 'nanumB', sans-serif;
  white-space: nowrap;
`;

const roleTag = css`
  background-color: ${colors.roleBg};
  color: ${colors.roleText};
  font-weight: bold;
`;

const skillTag = css`
  background-color: ${colors.skillBg};
  color: ${colors.skillText};
`;

const divider = css`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray[200]};
  margin-bottom: 16px;
  flex-shrink: 0;
`;

const reviewSection = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;

  .review-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto;
    padding-right: 4px;
  }
`;

const reviewItem = css`
  width: 100%;
  padding: 12px 16px;
  background-color: ${colors.gray[50]};
  border: 1px solid ${colors.gray[200]};
  border-radius: 8px;
  font-size: 14px;
  color: ${colors.gray[600]};
  text-align: left;
  line-height: 1.4;
  box-sizing: border-box;

  &:hover {
    background-color: ${colors.gray[100]};
  }
`;

const pagination = css`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${colors.gray[400]};
  font-family: 'nanumB', sans-serif;

  .separator {
    color: ${colors.gray[300]};
  }

  .page-number {
    cursor: pointer;
    padding: 2px 6px;
    &:hover {
      color: ${colors.gray[600]};
    }
    &.active {
      color: ${colors.gray[800]};
      font-weight: bold;
      transform: scale(1.1);
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
  font-size: 14px;
`;
