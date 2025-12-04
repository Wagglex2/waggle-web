/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { colors } from '@/styles/theme';

const paginationContainerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  user-select: none;
`;

const pageNumberStyle = (isActive) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  margin: 0 4px;
  border-radius: 50%;
  font-size: 15px;
  font-weight: 500;
  font-family: 'nanumR';
  cursor: pointer;

  background-color: ${isActive ? colors.gray[400] : 'transparent'};
  color: ${isActive ? '#ffffff' : colors.gray[400]};

  &:hover {
    background-color: ${isActive ? colors.gray[400] : colors.gray[100]};
  }
`;

const navButtonStyle = css`
  background: none;
  border: none;
  font-size: 15px;
  color: ${colors.gray[300]};
  cursor: pointer;
  font-family: 'nanumR';
  display: flex;
  align-items: center;
  padding: 0 15px;

  &:disabled {
    color: ${colors.gray[100]};
    cursor: not-allowed;
  }

  span {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`;

const ArrowIcon = ({ direction }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    css={
      direction === 'next' &&
      css`
        transform: translateY(-1px);
      `
    }
  >
    {direction === 'prev' ? <path d="M15 18L9 12L15 6"></path> : <path d="M9 18L15 12L9 6"></path>}
  </svg>
);

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const pagesPerBlock = 3;
  const currentBlock = Math.ceil(currentPage / pagesPerBlock);
  const startPage = (currentBlock - 1) * pagesPerBlock + 1;
  const endPage = Math.min(startPage + pagesPerBlock - 1, totalPages);

  const displayedPages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div css={paginationContainerStyle}>
      <button
        css={navButtonStyle}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span>
          <ArrowIcon direction="prev" /> 이전
        </span>
      </button>

      {displayedPages.map((number) => (
        <div
          key={number}
          css={pageNumberStyle(number === currentPage)}
          onClick={() => onPageChange(number)}
        >
          {number}
        </div>
      ))}

      <button
        css={navButtonStyle}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span>
          다음 <ArrowIcon direction="next" />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
