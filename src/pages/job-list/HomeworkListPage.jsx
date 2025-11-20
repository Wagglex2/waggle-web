/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import React, { useMemo, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import Pagination from "@/components/common/Pagination";
import HwCard from "@/components/card/HwCard";
import EmptyStateMessage from "@/components/common/EmptyStateMessage"; 
import { useDropdown } from "@/components/filter/useDropdown";
import useHomeworkStore from "@/stores/useHomeworkStore";

import {
  dropDownButtonStyle,
  ArrowIcon,
  dropdownContainerStyle,
  dropDownMenuStyle,
  dropDownMenuItemStyle
} from "@/components/filter/dropdownStyles";

const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];

const dummyHws = [
  { id: 1, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 2, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 3, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 4, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 6, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 7, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 8, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 9, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 10, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 11, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 12, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 13, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 14, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 15, grade: "3학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 16, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
];

export default function HwListPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  
  const {
    selectedGrade,
    hasSelectedGrade,
    currentPage,
    setGrade,
    setPage,
    reset
  } = useHomeworkStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleGradeSelect = (grade) => {
    setGrade(grade);
    setOpenDropdown(null);
  };

  const filteredHws = useMemo(() => {
    return dummyHws.filter(hw => {
      return !hasSelectedGrade || selectedGrade === '전체' || hw.grade === selectedGrade;
    });
  }, [selectedGrade, hasSelectedGrade]);

  const totalItems = filteredHws.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredHws.slice(startIndex, startIndex + itemsPerPage);

  return (
    <PageWrapper>
      <PageHeader title="과제" />
      
      <FilterBar>
        <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['grade'] = el}>
          <button css={dropDownButtonStyle("120px", hasSelectedGrade)} onClick={() => setOpenDropdown(openDropdown === "grade" ? null : "grade")}>
            <span>{hasSelectedGrade ? selectedGrade : "학년"}</span>
            <ArrowIcon />
          </button>
          {openDropdown === "grade" && (
            <ul css={dropDownMenuStyle}>
              {gradeOptions.map(option => (
                <li key={option} css={dropDownMenuItemStyle(selectedGrade === option, false)} onClick={() => handleGradeSelect(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FilterBar>

      {dummyHws.length === 0 ? (
        <EmptyStateMessage message="등록된 과제가 없습니다." />
      ) : totalItems === 0 ? (
        <EmptyStateMessage message="일치하는 과제가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={currentItems}
            itemsPerPage={itemsPerPage}
            renderCard={(hw) => <HwCard project={hw} />}
          />
          
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </PageWrapper>
  );
}