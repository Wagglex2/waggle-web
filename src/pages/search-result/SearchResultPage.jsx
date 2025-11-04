/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectCard from "@/pages/job-list/components/card/ProjectCard";
import HwCard from "@/pages/job-list/components/card/HwCard";
import StudyCard from "@/pages/job-list/components/card/StudyCard";
import ToggleSwitch from "@/pages/job-list/components/ToggleSwitch";
import Pagination from "@/pages/job-list/components/Pagination";

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

const addedColors = {
  yellow: { background: "#FFF9DC" },
};

const dropDownButtonStyle = (width, isSelected) => css`
  width: ${width};
  height: 40px;
  background-color: ${isSelected ? addedColors.yellow.background : '#ffffff'};
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'nanumR';
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

const ArrowIcon = () => (
  <svg css={arrowIconStyle} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
);

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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  max-height: 300px;
  overflow-y: auto;
`;

const techDropDownMenuStyle = css`
  ${dropDownMenuStyle};
  width: 700px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const customCheckboxStyle = css`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid #E0E0E0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  transition: background-color 0.2s, border-color 0.2s;

  &:checked {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    &::after {
      content: '✔';
      font-size: 14px;
      color: white; 
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const dropDownMenuItemStyle = (isSelected, isGrid = false) => css`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-family: "nanumR";
  font-size: 14px;
  white-space: nowrap;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  background-color: ${isSelected && !isGrid ? addedColors.yellow.background : 'transparent'};

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

const dummyProjects = [
  { id: 1, purposeTag: "공모전", methodTag: "온/오프라인", deadline: "2025.12.15까지", title: "웹 어쩌구저쩌구 함께할 팀원 구합니다.", positions: ["기획", "디자인"], techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 2, purposeTag: "사이드프로젝트", methodTag: "오프라인", deadline: "2025.12.15까지", title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다 웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다", positions: ["기획", "디자인", "프론트엔드"], techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 3, purposeTag: "해커톤", methodTag: "온라인", deadline: "2025.12.15까지", title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.", positions: ["기획", "디자인", "프론트엔드", "백엔드"], techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
  { id: 4, purposeTag: "토이프로젝트", methodTag: "온라인", deadline: "2025.12.15까지", title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.", positions: ["기획", "디자인", "프론트엔드", "백엔드"], techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
];

const dummyHws = [
  { id: 1, grade: "1학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "운영체제 과제 같이 하실 분 구해요", author: "솔랑솔랑" },
  { id: 2, grade: "2학년", purposeTag: "과제", department: "컴퓨터공학과", subjects: ["운영체제(1234)"], deadline: "2025.12.15까지", title: "자료구조 과제 팀원 모집", author: "솔랑솔랑" },
];

const dummyStudies = [
  { id: 1, purposeTag: "스터디", deadline: "2025.12.15까지", title: "알고리즘 스터디원 모집", techStack: ["Java", "C/C++", "Python"], author: "솔랑솔랑" },
  { id: 2, purposeTag: "스터디", deadline: "2025.12.15까지", title: "React 심화 스터디", techStack: ["TypeScript", "React", "Next.js"], author: "솔랑솔랑" },
];

const categoryMap = {
  project: "프로젝트",
  homework: "과제",
  study: "스터디",
};

const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];
const importedPurposeOptions = ["공모전", "해커톤", "사이드프로젝트", "토이프로젝트"];
const importedPositionOptions = ["백엔드", "프론트엔드", "풀스택", "데이터", "AI", "게임", "기획", "디자인"];
const importedTechStackOptions = [
  "Java","C/C++","C#","HTML/CSS","TypeScript","JavaScript","Kotlin","Swift","Python",
  "Express","Vue.js","Next.js","React","Node.js","Spring Boot","Django","Flutter",
  "Pandas","scikit-learn","TensorFlow","PyTorch","Unity","Unreal","PostgreSQL","MySQL",
  "MongoDB","Redis","Git/GitHub","GitHub Actions","Docker","Figma","Notion","Jira"
];


const purposeOptions = ["전체", ...importedPurposeOptions];
const positionOptions = [...importedPositionOptions]; 
const techOptions = [...importedTechStackOptions];

export default function SearchResultPage() {
  const itemsPerPage = 9;
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'project';
  const query = searchParams.get('q') || ''; 

  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});
  
  const [selectedGrade, setSelectedGrade] = useState("전체");
  const [hasSelectedGrade, setHasSelectedGrade] = useState(false);
  
  const [selectedStudyTechs, setSelectedStudyTechs] = useState([]);
  
  const [selectedProjectPurpose, setSelectedProjectPurpose] = useState("전체");
  const [hasSelectedProjectPurpose, setHasSelectedProjectPurpose] = useState(false);
  const [selectedProjectTechs, setSelectedProjectTechs] = useState([]);
  const [selectedProjectPositions, setSelectedProjectPositions] = useState([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

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
    setSelectedStudyTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
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
    setSelectedProjectTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const handleProjectPositionSelect = (position) => {
    setSelectedProjectPositions(prev =>
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    let rawData;

    switch (category) {
      case 'homework':
        rawData = dummyHws;
        break;
      case 'study':
        rawData = dummyStudies;
        break;
      case 'project':
      default:
        rawData = dummyProjects;
        break;
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
      default:
        break;
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

  const emptyCardCount = itemsPerPage - currentItems.length;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  const renderCard = (item) => {
    switch (category) {
      case 'homework':
        return <HwCard project={item} />;
      case 'study':
        return <StudyCard project={item} />;
      case 'project':
      default:
        return <ProjectCard project={item} />;
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
    <div css={pageContainerStyle}>
      <h1 css={pageTitleStyle}>
        카테고리 [{categoryMap[category] || '프로젝트'}]의 <span>'{query}'</span>에 대한 검색 결과입니다.
      </h1>
      <div css={dividerStyle} />
      
      <div css={filterSectionStyle}>
        <div css={dropDownsContainerStyle}>
          {renderFilters()}
        </div>
        <div css={toggleContainerStyle}>
          <span css={toggleTextStyle}>마감된 공고만</span>
          <ToggleSwitch />
        </div>
      </div>
      
      <div css={gridStyle}>
        {currentItems.map((item) => (
          <div key={`${category}-${item.id}`} css={flexItemStyle}>
            {renderCard(item)}
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