/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import HwCard from "@/components/card/HwCard";
import EmptyStateMessage from "@/components/common/EmptyStateMessage"; 
import { useDropdown } from "@/components/filter/useDropdown";
import useHomeworkStore from "@/stores/useHomeworkStore";
import api from '@/api/api'; 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  dropDownButtonStyle,
  ArrowIcon,
  dropdownContainerStyle,
  dropDownMenuStyle,
  dropDownMenuItemStyle
} from "@/components/filter/dropdownStyles";

const GRADE_MAP = {
  "1학년": 1,
  "2학년": 2,
  "3학년": 3,
  "4학년 이상": 4
};
const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];

export default function HwListPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [homeworks, setHomeworks] = useState([]); 
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

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

  const isGradeActive = hasSelectedGrade && selectedGrade !== '전체';

  useEffect(() => {
    const pageParam = searchParams.get('page');
    const gradesParam = searchParams.get('grades');
    const statusParam = searchParams.get('status');

    const targetPage = pageParam ? parseInt(pageParam, 10) : 1;
    if (currentPage !== targetPage) {
      setPage(targetPage);
    }

    const targetStatus = statusParam === 'CLOSED';
    if (isClosed !== targetStatus) {
      setIsClosed(targetStatus);
    }

    const targetGradeLabel = Object.keys(GRADE_MAP).find(key => String(GRADE_MAP[key]) === gradesParam) || '전체';
    if (selectedGrade !== targetGradeLabel) {
      setGrade(targetGradeLabel);
    }

  }, [searchParams, currentPage, isClosed, selectedGrade, setPage, setGrade]);

  const handleGradeSelect = (grade) => {
    setGrade(grade);
    setOpenDropdown(null);
    
    const params = { page: 1 };
    if (grade !== '전체') {
      params.grades = GRADE_MAP[grade];
    }
    if (isClosed) {
      params.status = 'CLOSED';
    }

    setSearchParams(params, { replace: false });
  };

  const handleToggle = (newState) => {
    setIsClosed(newState);
    
    const params = { page: 1 };
    if (selectedGrade !== '전체') {
      params.grades = GRADE_MAP[selectedGrade];
    }
    if (newState) {
      params.status = 'CLOSED';
    }

    setSearchParams(params, { replace: false });
  };

  const handlePageChange = (pageNumber) => {
    const params = { page: pageNumber };
    if (selectedGrade !== '전체') {
      params.grades = GRADE_MAP[selectedGrade];
    }
    if (isClosed) {
      params.status = 'CLOSED';
    }

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchHomeworks = async () => {
      setIsLoading(true);
      try {
        const queryPage = searchParams.get('page');
        const queryGrades = searchParams.get('grades');
        const queryStatus = searchParams.get('status');

        const params = {
          page: queryPage ? parseInt(queryPage, 10) - 1 : 0,
          size: itemsPerPage,
        };

        if (queryStatus === 'CLOSED' || (!queryStatus && isClosed)) {
          params.status = 'CLOSED';
        }

        if (queryGrades) {
          params.grades = queryGrades;
        } else if (hasSelectedGrade && selectedGrade !== '전체') {
          params.grades = GRADE_MAP[selectedGrade];
        }

        const response = await api.get('/api/v1/assignments', { params });
        
        const content = response.data.data?.content || [];
        const totalPageCount = response.data.data?.page?.totalPages || response.data.data?.totalPages || 0;

        const mappedHomeworks = content.map((item) => ({
          id: item.id, 
          
          title: item.title,
          deadline: item.deadline,
          author: item.authorNickname || "익명",
          authorProfileImageUrl: item.authorProfileImageUrl,
          
          purposeTag: "과제", 

          department: item.department || "전공 무관", 
          
          subjects: item.lecture ? [item.lecture] : [], 

          grade: (item.grades && item.grades.length > 0) ? `${item.grades[0]}학년` : "학년 무관",

          bookmarked: item.bookmarked, 
          bookmarkId: item.bookmarkId, 
        }));

        setHomeworks(mappedHomeworks);
        setTotalPages(totalPageCount);

      } catch (error) {
        console.error("과제 목록 불러오기 실패:", error);
        setHomeworks([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeworks();

  }, [searchParams, isClosed, hasSelectedGrade, selectedGrade]);


  return (
    <PageWrapper>
      <PageHeader title="과제" />
      
      <FilterBar isClosed={isClosed} onToggle={handleToggle}>
        <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['grade'] = el}>
          <button css={dropDownButtonStyle("120px", isGradeActive)} onClick={() => setOpenDropdown(openDropdown === "grade" ? null : "grade")}>
            <span>{isGradeActive ? selectedGrade : "학년"}</span>
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

      {isLoading ? (
        <EmptyStateMessage message="데이터를 불러오는 중입니다." />
      ) : homeworks.length === 0 ? (
        <EmptyStateMessage message="일치하는 과제가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={homeworks}
            itemsPerPage={itemsPerPage}
            renderCard={(hw) => <HwCard project={hw} />}
          />
          
          {totalPages > 0 && (
            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => handlePageChange(value)}
              />
            </Stack>
          )}
        </>
      )}
    </PageWrapper>
  );
}