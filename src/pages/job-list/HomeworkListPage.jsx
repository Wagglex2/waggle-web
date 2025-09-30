/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { colors } from "@/styles/theme";
import HwCard from "@/components/ListPage/HwCard"; 
import ToggleSwitch from "@/components/ListPage/ToggleSwitch";
import Pagination from "@/components/ListPage/Pagination";

const pageTitleStyle = css`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  padding: 15px 0;
  font-family: 'nanumEB';
`;

const dividerStyle = css`
  border-bottom: 1px solid ${colors.gray[100]};
  margin-bottom: 60px;
`;

const gridStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
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

const addedColors = {
  yellow: { background: "#FFF9DC" },
};

const dropDownButtonStyle = (width, isSelected) => css`
  width: ${width};
  height: 40px;
  background-color: ${isSelected ? addedColors.yellow.background : "#ffffff"};
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: "nanumR";
  transition: background-color 0.2s, color 0.2s;
  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:focus {
    outline: none;
  }
`;

const arrowIconStyle = css`
  margin-left: 10px;
  color: ${colors.gray[300]};
  flex-shrink: 0;
`;

const dropdownContainerStyle = css`
  position: relative;
  display: inline-block;
`;

const dropDownMenuStyle = css`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 8px;
  padding: 8px;
  list-style: none;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  min-width: 150px;
`;

const dropDownMenuItemStyle = (isSelected) => css`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  font-family: "nanumR";
  font-size: 14px;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  background-color: ${isSelected ? addedColors.yellow.background : "transparent"};
  &:hover {
    background-color: ${addedColors.yellow.background};
  }
`;

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

const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];

const ArrowIcon = () => (
  <svg css={arrowIconStyle} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
);

const dummyHws = [
  { id: 1, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 2, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 3, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 4, grade: "4학년 이상", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 6, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 7, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 8, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 9, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 10, grade: "4학년 이상", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 11, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 12, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 13, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 14, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 15, grade: "4학년 이상", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 16, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
];

export default function HwListPage() {
  const itemsPerPage = 9;

  const [selectedGrade, setSelectedGrade] = useState("전체");
  const [hasSelectedGrade, setHasSelectedGrade] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGradeSelect = (grade) => {
    if (hasSelectedGrade && selectedGrade === grade) {
      setSelectedGrade("전체");
      setHasSelectedGrade(false);
    } else {
      setSelectedGrade(grade);
      setHasSelectedGrade(true);
    }
    setOpenDropdown(null);
    setCurrentPage(1);
  };

  const filteredHws = useMemo(() => {
    return dummyHws.filter(hw => {
      return !hasSelectedGrade || selectedGrade === '전체' || hw.grade === selectedGrade;
    });
  }, [selectedGrade, hasSelectedGrade]);

  const totalItems = filteredHws.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredHws.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const emptyCardCount = itemsPerPage - currentItems.length > 0 ? itemsPerPage - currentItems.length : 0;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  return (
    <div css={pageContainerStyle}>
      <h1 css={pageTitleStyle}>과제</h1>
      <div css={dividerStyle} />
      
      <div css={filterSectionStyle}>
        <div css={dropDownsContainerStyle}>
          <div css={dropdownContainerStyle} ref={dropdownRef}>
            <button css={dropDownButtonStyle("120px", hasSelectedGrade)} onClick={() => setOpenDropdown(openDropdown ? null : "grade")}>
              <span>{hasSelectedGrade ? selectedGrade : "학년"}</span>
              <ArrowIcon />
            </button>
            {openDropdown === "grade" && (
              <ul css={dropDownMenuStyle}>
                {gradeOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedGrade === option)} onClick={() => handleGradeSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
      
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}