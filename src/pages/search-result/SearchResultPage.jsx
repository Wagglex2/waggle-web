/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import ProjectCard from "@/components/card/ProjectCard";
import HwCard from "@/components/card/HwCard";
import StudyCard from "@/components/card/StudyCard";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { useDropdown } from "@/components/filter/useDropdown";
import useSearchStore from "@/stores/useSearchStore";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  dropDownButtonStyle,
  ArrowIcon,
  dropdownContainerStyle,
  dropDownMenuStyle,
  techDropDownMenuStyle,
  customCheckboxStyle,
  dropDownMenuItemStyle
} from "@/components/filter/dropdownStyles";
import { 
  purposeOptions as importedPurposeOptions, 
  positionOptions as importedPositionOptions, 
  techStackOptions as importedTechStackOptions 
} from "@/data/options";

const pageTitleStyle = css`
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  padding: 15px 0 15px 0;
  font-family: 'nanumB';
  span {
    color: ${colors.tertiary}; 
    font-family: 'nanumEB';
  }
`;

const dividerStyle = css`
  border-bottom: 1px solid ${colors.gray[100]};
  margin-bottom: 60px;
`;

const purposeOptions = ["전체", ...importedPurposeOptions];
const positionOptions = [...importedPositionOptions];
const techOptions = [...importedTechStackOptions];
const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];

const categoryMap = {
  project: "프로젝트",
  homework: "과제",
  study: "스터디",
};

const GRADE_MAP = {
  "1학년": 1,
  "2학년": 2,
  "3학년": 3,
  "4학년 이상": 4
};

export default function SearchResultPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  const [searchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'project';
  const query = searchParams.get('q') || '';

  const [data, setData] = useState([]); 
  const [totalPages, setTotalPages] = useState(0); 
  const [isLoading, setIsLoading] = useState(false); 

  const {
    currentPage, setPage, reset,
    selectedGrade, hasSelectedGrade, setGrade,
    selectedStudyTechs, toggleStudyTech,
    selectedProjectPurpose, hasSelectedProjectPurpose, setProjectPurpose,
    selectedProjectTechs, toggleProjectTech,
    selectedProjectPositions, toggleProjectPosition
  } = useSearchStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  useEffect(() => {
    setPage(1);
  }, [category, query, setPage]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage - 1,
          size: itemsPerPage,
          keyword: query,
        };

        if (category === 'homework') {
            if (hasSelectedGrade && selectedGrade !== '전체') {
                params.grades = GRADE_MAP[selectedGrade];
            }
        } else if (category === 'study') {
            if (selectedStudyTechs.length > 0) {
                params.techStacks = selectedStudyTechs.join(',');
            }
        } else if (category === 'project') {
            if (hasSelectedProjectPurpose && selectedProjectPurpose !== '전체') {
                params.purposes = selectedProjectPurpose;
            }
            if (selectedProjectTechs.length > 0) {
                params.techStacks = selectedProjectTechs.join(',');
            }
            if (selectedProjectPositions.length > 0) {
                params.positions = selectedProjectPositions.join(',');
            }
        }

        setTimeout(() => {
            console.log("API 호출 파라미터 확인용:", params); 
            setData([]); 
            setTotalPages(0);
            setIsLoading(false); 
        }, 500);

      } catch (error) {
        console.error("오류 발생:", error);
        setData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    category, query, currentPage, 
    selectedGrade, selectedStudyTechs, 
    selectedProjectPurpose, selectedProjectTechs, selectedProjectPositions
  ]);

  const handleGradeSelect = (grade) => { setGrade(grade); setOpenDropdown(null); setPage(1); };
  const handleStudyTechSelect = (tech) => { toggleStudyTech(tech); setPage(1); };
  const handleProjectPurposeSelect = (purpose) => { setProjectPurpose(purpose); setOpenDropdown(null); setPage(1); };
  const handleProjectTechSelect = (tech) => { toggleProjectTech(tech); setPage(1); };
  const handleProjectPositionSelect = (position) => { toggleProjectPosition(position); setPage(1); };

  const renderCard = (item) => {
    switch (category) {
      case 'homework': return <HwCard project={item} />;
      case 'study': return <StudyCard project={item} />;
      case 'project': default: return <ProjectCard project={item} />;
    }
  };

  const renderFilters = () => {
    switch (category) {
      case 'homework':
        return (
          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['grade'] = el}>
            <button css={dropDownButtonStyle("120px", hasSelectedGrade)} onClick={() => setOpenDropdown(openDropdown ? null : "grade")}>
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
        );
      case 'study':
        return (
          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
            <button css={dropDownButtonStyle("120px", selectedStudyTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
              <span>{selectedStudyTechs.length > 0 ? `기술 ${selectedStudyTechs.length}` : '기술'}</span>
              <ArrowIcon />
            </button>
            {openDropdown === 'tech' && (
              <ul css={techDropDownMenuStyle}>
                {techOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedStudyTechs.includes(option), true)} onClick={() => handleStudyTechSelect(option)}>
                    <input type="checkbox" css={customCheckboxStyle} checked={selectedStudyTechs.includes(option)} readOnly />
                    <label>{option}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'project':
      default:
        return (
          <>
            <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['purpose'] = el}>
              <button css={dropDownButtonStyle("120px", hasSelectedProjectPurpose)} onClick={() => setOpenDropdown(openDropdown === "purpose" ? null : "purpose")}>
                <span>{hasSelectedProjectPurpose ? selectedProjectPurpose : '목적'}</span>
                <ArrowIcon />
              </button>
              {openDropdown === 'purpose' && (
                <ul css={dropDownMenuStyle}>
                  {purposeOptions.map(option => (
                    <li key={option} css={dropDownMenuItemStyle(selectedProjectPurpose === option, false)} onClick={() => handleProjectPurposeSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
              <button css={dropDownButtonStyle("120px", selectedProjectTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
                <span>{selectedProjectTechs.length > 0 ? `기술 ${selectedProjectTechs.length}` : '기술'}</span>
                <ArrowIcon />
              </button>
              {openDropdown === 'tech' && (
                <ul css={techDropDownMenuStyle}>
                  {techOptions.map(option => (
                    <li key={option} css={dropDownMenuItemStyle(selectedProjectTechs.includes(option), true)} onClick={() => handleProjectTechSelect(option)}>
                      <input type="checkbox" css={customCheckboxStyle} checked={selectedProjectTechs.includes(option)} readOnly />
                      <label>{option}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['position'] = el}>
              <button css={dropDownButtonStyle("120px", selectedProjectPositions.length > 0)} onClick={() => setOpenDropdown(openDropdown === "position" ? null : "position")}>
                <span>{selectedProjectPositions.length > 0 ? `포지션 ${selectedProjectPositions.length}` : '포지션'}</span>
                <ArrowIcon />
              </button>
              {openDropdown === 'position' && (
                <ul css={dropDownMenuStyle}> 
                  {positionOptions.map(option => (
                    <li key={option} css={dropDownMenuItemStyle(selectedProjectPositions.includes(option), false)} onClick={() => handleProjectPositionSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        );
    }
  }

  return (
    <PageWrapper>
      <h1 css={pageTitleStyle}>
        카테고리 [{categoryMap[category] || '프로젝트'}]의 <span>'{query}'</span>에 대한 검색 결과입니다.
      </h1>
      <div css={dividerStyle} />
      
      <FilterBar>
        {renderFilters()}
      </FilterBar>
  
      {isLoading ? (
        <EmptyStateMessage message="데이터를 불러오는 중입니다." />
      ) : data.length === 0 ? (
        <EmptyStateMessage message="일치하는 결과가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={data}
            itemsPerPage={itemsPerPage}
            renderCard={renderCard}
          />
          
          {totalPages > 0 && (
            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => {
                  setPage(value);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </Stack>
          )}
        </>
      )}
    </PageWrapper>
  );
}