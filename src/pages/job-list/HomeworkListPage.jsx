/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState } from "react";
import HwCard from "@/components/ListPage/HwCard"; 
import ToggleSwitch from "@/components/ListPage/ToggleSwitch";
import Pagination from "@/components/ListPage/Pagination";
import DropdownFilter from "@/components/ListPage/DropdownFilter";

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
  justify-content: center;
  gap: 18px;
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

const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];

const arrowIconStyle = css`
  color: ${colors.gray[300]};
  margin-left: 20px;
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

const dummyHws = [
  { id: 1, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 2, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 3, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 4, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 5, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 6, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 7, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 8, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 9, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 10, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 11, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 12, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 13, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 14, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 15, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
  { id: 16, purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "과제하자과제하자과제하자과제하자과제하자과제하자과제하자", author: "솔랑솔랑" },
];

export default function HwListPage() {
  const totalItems = dummyHws.length;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState("학년");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setCurrentPage(1);
    
    if (grade === "학년" || grade === "전체") {
      setFilteredHws(dummyHws);
    } else {
      const newFilteredHws = dummyHws.filter(hw => hw.grade === grade);
      setFilteredHws(newFilteredHws);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyHws.slice(startIndex, startIndex + itemsPerPage);

  const emptyCardCount = itemsPerPage - currentItems.length;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  return (
    <div css={pageContainerStyle}>
      <h1 css={pageTitleStyle}>과제</h1>
      <div css={dividerStyle} />
      
      <div css={filterSectionStyle}>
        <div css={dropDownsContainerStyle}>
          <DropdownFilter
            label={selectedGrade}
            options={gradeOptions}
            onSelect={handleGradeSelect}
          />
        </div>
        <div css={toggleContainerStyle}>
          <span css={toggleTextStyle}>마감된 공고만</span>
          <ToggleSwitch />
        </div>
      </div>
      
      <div css={gridStyle}>
        {currentItems.map((hw) => (
          <div key={hw.id} css={flexItemStyle}>
            <HwCard project={hw} />
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