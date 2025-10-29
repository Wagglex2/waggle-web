/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { colors } from "@/styles/theme";
import ProjectCard from "@/pages/job-list/components/card/ProjectCard";
import ToggleSwitch from "@/components/ListPage/ToggleSwitch";
import Pagination from "@/pages/job-list/components/Pagination";

const importedPurposeOptions = ["공모전", "해커톤", "사이드프로젝트", "토이프로젝트"];
const importedPositionOptions = ["백엔드", "프론트엔드", "풀스택", "데이터", "AI", "게임", "기획", "디자인"];
const importedTechStackOptions = [
  "Java","C/C++","C#","HTML/CSS","TypeScript","JavaScript","Kotlin","Swift","Python",
  "Express","Vue.js","Next.js","React","Node.js","Spring Boot","Django","Flutter",
  "Pandas","scikit-learn","TensorFlow","PyTorch","Unity","Unreal","PostgreSQL","MySQL",
  "MongoDB","Redis","Git/GitHub","GitHub Actions","Docker","Figma","Notion","Jira"
];

const purposeOptions = ["전체", ...importedPurposeOptions];
const positionOptions = ["전체", ...importedPositionOptions];
const techOptions = [...importedTechStackOptions];

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

const addedColors = {
  yellow: {
    background: '#FFF9DC',
  },
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

const ArrowIcon = () => (
  <svg css={arrowIconStyle} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
  </svg>
);

export default function ProjectListPage() {
  const itemsPerPage = 9;

  const [selectedPurpose, setSelectedPurpose] = useState("전체");
  const [hasSelectedPurpose, setHasSelectedPurpose] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("전체");
  const [hasSelectedPosition, setHasSelectedPosition] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown] && !dropdownRefs.current[openDropdown].contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  const handlePurposeSelect = (purpose) => {
    if (hasSelectedPurpose && selectedPurpose === purpose) {
      setSelectedPurpose("전체");
      setHasSelectedPurpose(false);
    } else {
      setSelectedPurpose(purpose);
      setHasSelectedPurpose(true);
    }
    setOpenDropdown(null);
    setCurrentPage(1);
  };

  const handleTechSelect = (tech) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const handlePositionSelect = (position) => {
    if (hasSelectedPosition && selectedPosition === position) {
      setSelectedPosition("전체");
      setHasSelectedPosition(false);
    } else {
      setSelectedPosition(position);
      setHasSelectedPosition(true);
    }
    setOpenDropdown(null);
    setCurrentPage(1);
  };

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
  {
    id: 5,
    purposeTag: "공모전",
    methodTag: "온/오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 6,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 7,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 8,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 9,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 10,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 11,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 12,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 13,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 14,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 15,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 16,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
];

  const filteredProjects = useMemo(() => {
    return dummyProjects.filter(project => {
      const purposeMatch = !hasSelectedPurpose || selectedPurpose === '전체' || project.purposeTag === selectedPurpose;
      const techMatch = selectedTechs.length === 0 || selectedTechs.every(tech => project.techStack.includes(tech));
      const positionMatch = !hasSelectedPosition || selectedPosition === '전체' || project.positions.includes(selectedPosition);
      return purposeMatch && techMatch && positionMatch;
    });
  }, [selectedPurpose, selectedTechs, selectedPosition, hasSelectedPurpose, hasSelectedPosition]);

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const emptyCardCount = itemsPerPage - currentItems.length > 0 ? itemsPerPage - currentItems.length : 0;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  return (
    <div css={pageContainerStyle}>
      <h1 css={pageTitleStyle}>프로젝트</h1>
      <div css={dividerStyle} />

      <div css={filterSectionStyle}>
        <div css={dropDownsContainerStyle}>
          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['purpose'] = el}>
            <button css={dropDownButtonStyle("120px", hasSelectedPurpose)} onClick={() => setOpenDropdown(openDropdown === "purpose" ? null : "purpose")}>
              <span>{hasSelectedPurpose ? selectedPurpose : '목적'}</span>
              <ArrowIcon />
            </button>
            {openDropdown === 'purpose' && (
              <ul css={dropDownMenuStyle}>
                {purposeOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedPurpose === option, false)} onClick={() => handlePurposeSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
            <button css={dropDownButtonStyle("120px", selectedTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
              <span>{selectedTechs.length > 0 ? `기술 ${selectedTechs.length}` : '기술'}</span>
              <ArrowIcon />
            </button>
            {openDropdown === 'tech' && (
              <ul css={techDropDownMenuStyle}>
                {techOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedTechs.includes(option), true)} onClick={() => handleTechSelect(option)}>
                    <input type="checkbox" css={customCheckboxStyle} checked={selectedTechs.includes(option)} readOnly />
                    <label>{option}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['position'] = el}>
            <button css={dropDownButtonStyle("120px", hasSelectedPosition)} onClick={() => setOpenDropdown(openDropdown === "position" ? null : "position")}>
              <span>{hasSelectedPosition ? selectedPosition : '포지션'}</span>
              <ArrowIcon />
            </button>
            {openDropdown === 'position' && (
              <ul css={dropDownMenuStyle}>
                {positionOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedPosition === option, false)} onClick={() => handlePositionSelect(option)}>
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
        {currentItems.map((project) => (
          <div key={project.id} css={flexItemStyle}>
            <ProjectCard project={project} />
          </div>
        ))}
        {emptyCards}
      </div>

      {totalPages > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      )}
    </div>
  );
}