/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState } from "react";
import StudyCard from "@/components/ListPage/StudyCard";
import ToggleSwitch from "@/components/ListPage/ToggleSwitch";
import Pagination from "@/components/ListPage/Pagination";

const pageTitleStyle = css`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  padding: 15px 0 15px 0;
  font-family: 'nanumEB';
`;

const dividerStyle = css`
  border-bottom: 1px solid ${colors.gray[100]};
  margin-bottom: 60px;
`;

const gridStyle = css`
  display: flex; 
  flex-wrap: wrap; 
  gap: 18px;
  justify-content: start; 
`;

const flexItemStyle = css`
  width: 360px;
  min-height: 280px;
`;

const pageContainerStyle = css`
  max-width: 1167px;
  margin: 0 auto;
  padding: 24px;
`;

const filterSectionStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  height: 40px;
`;

const dropDownsContainerStyle = css`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const dropDownButtonStyle = css`
  width: 90px;
  height: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  color: ${colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'nanumR';
  
  span {
    white-space: nowrap;
  }
`;

const arrowIconStyle = css`
  color: ${colors.gray[300]};
  font-size: 20px;
  flex-shrink: 0;
`;

const ArrowIcon = () => (
  <svg css={arrowIconStyle} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
);

const toggleContainerStyle = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: -30px;
`;

const toggleTextStyle = css`
  color: ${colors.gray[300]};
  font-size: 14px;
  font-family: 'nanumR';
`;

const dummyStudies = [
  { id: 1, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 2, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 3, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 4, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 5, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 6, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 7, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 8, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 9, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 10, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 11, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 12, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 13, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 14, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 15, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 16, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
];

export default function StudyListPage() {
  const totalItems = dummyStudies.length;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyStudies.slice(startIndex, startIndex + itemsPerPage);

  const emptyCardCount = itemsPerPage - currentItems.length;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  return (
    <div css={pageContainerStyle}>
      <h1 css={pageTitleStyle}>스터디</h1>
      <div css={dividerStyle} />
      
      <div css={filterSectionStyle}>
        <div css={dropDownsContainerStyle}>
          <button css={dropDownButtonStyle}>
            <span>기술</span>
            <ArrowIcon />
          </button>
        </div>
        <div css={toggleContainerStyle}>
          <span css={toggleTextStyle}>마감된 공고만</span>
          <ToggleSwitch />
        </div>
      </div>
      
      <div css={gridStyle}>
        {currentItems.map((study) => (
          <div key={study.id} css={flexItemStyle}>
            <StudyCard project={study} />
          </div>
        ))}
        {emptyCards}
      </div>
      
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}