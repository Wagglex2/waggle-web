/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import Pagination from "@/components/common/Pagination";
import ProjectCard from "@/components/card/ProjectCard";
import HwCard from "@/components/card/HwCard";
import StudyCard from "@/components/card/StudyCard";
import { useDropdown } from "@/components/filter/useDropdown";
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

const dummyProjects = [
  {
    id: 1,
    purposeTag: "공모전",
    methodTag: "온/오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 함께할 팀원 구합니다.",
    positions: ["기획", "디자인"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 2,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다 웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다",
    positions: ["기획", "디자인", "프론트엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 3,
    purposeTag: "해커톤",
    methodTag: "온라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 4,
    purposeTag: "토이프로젝트",
    methodTag: "온라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
];

const dummyHws = [
  { 
    id: 1, grade: "1학년", 
    purposeTag: "과제", 
    department: "컴퓨터공학과", 
    subjects: ["운영체제(1234)"], 
    deadline: "2025.12.15까지", 
    title: "운영체제 과제 같이 하실 분 구해요", 
    author: "솔랑솔랑" 
  },
  { 
    id: 2, 
    grade: "2학년", 
    purposeTag: "과제", 
    department: "컴퓨터공학과", 
    subjects: ["운영체제(1234)"], 
    deadline: "2025.12.15까지", 
    title: "운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요 운영체제 과제 같이 하실 분 구해요", 
    author: "솔랑솔랑" 
  },
  { 
    id: 3, 
    grade: "3학년", 
    purposeTag: "과제", 
    department: "컴퓨터공학과", 
    subjects: ["운영체제(1234)"], 
    deadline: "2025.12.15까지", 
    title: "운영체제 과제 같이 하실 분 구해요", 
    author: "솔랑솔랑" 
  },
];

const dummyStudies = [
  { 
    id: 1, 
    purposeTag: "스터디", 
    deadline: "2025.12.15까지", 
    title: "공부하자공부하자공부하자공부하자공부하자", 
    techStack: ["TypeScript", "React", "Figma"], 
    author: "솔랑솔랑" 
  },
  { 
    id: 2, 
    purposeTag: "스터디", 
    deadline: "2025.12.15까지", 
    title: "공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자", 
    techStack: ["TypeScript", "React", "Figma"], 
    author: "솔랑솔랑" 
  },
];

const categoryMap = {
  project: "프로젝트",
  homework: "과제",
  study: "스터디",
};

export default function SearchResultPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'project';
  const query = searchParams.get('q') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState("전체");
  const [hasSelectedGrade, setHasSelectedGrade] = useState(false);
  const [selectedStudyTechs, setSelectedStudyTechs] = useState([]);
  const [selectedProjectPurpose, setSelectedProjectPurpose] = useState("전체");
  const [hasSelectedProjectPurpose, setHasSelectedProjectPurpose] = useState(false);
  const [selectedProjectTechs, setSelectedProjectTechs] = useState([]);
  const [selectedProjectPositions, setSelectedProjectPositions] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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
  const handleStudyTechSelect = (tech) => {
    setSelectedStudyTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
    setCurrentPage(1);
  };
  const handleProjectPurposeSelect = (purpose) => {
    if (hasSelectedProjectPurpose && selectedProjectPurpose === purpose) {
      setSelectedProjectPurpose("전체");
      setHasSelectedProjectPurpose(false);
    } else {
      setSelectedProjectPurpose(purpose);
      setHasSelectedProjectPurpose(true);
    }
    setOpenDropdown(null);
    setCurrentPage(1);
  };
  const handleProjectTechSelect = (tech) => {
    setSelectedProjectTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
    setCurrentPage(1);
  };
  const handleProjectPositionSelect = (position) => {
    setSelectedProjectPositions(prev => prev.includes(position) ? prev.filter(p => p !== position) : [...prev, position]);
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    let rawData;
    switch (category) {
      case 'homework': rawData = dummyHws; break;
      case 'study': rawData = dummyStudies; break;
      case 'project': default: rawData = dummyProjects; break;
    }

    let filtered = rawData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    switch (category) {
      case 'homework':
        filtered = filtered.filter(hw => 
          !hasSelectedGrade || selectedGrade === '전체' || hw.grade === selectedGrade
        );
        break;
      case 'study':
        filtered = filtered.filter(study =>
          selectedStudyTechs.length === 0 || selectedStudyTechs.every(tech => study.techStack.includes(tech))
        );
        break;
      case 'project':
        filtered = filtered.filter(project => {
          const purposeMatch = !hasSelectedProjectPurpose || selectedProjectPurpose === '전체' || project.purposeTag === selectedProjectPurpose;
          const techMatch = selectedProjectTechs.length === 0 || selectedProjectTechs.every(tech => project.techStack.includes(tech));
          const positionMatch = selectedProjectPositions.length === 0 || selectedProjectPositions.some(pos => project.positions.includes(pos));
          return purposeMatch && techMatch && positionMatch;
        });
        break;
      default: break;
    }
    return filtered;
  }, [
    category, query, 
    selectedGrade, hasSelectedGrade, 
    selectedStudyTechs, 
    selectedProjectPurpose, hasSelectedProjectPurpose, selectedProjectTechs, selectedProjectPositions
  ]);

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
      
      <CardGrid
        items={currentItems}
        itemsPerPage={itemsPerPage}
        renderCard={renderCard}
      />
      
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </PageWrapper>
  );
}