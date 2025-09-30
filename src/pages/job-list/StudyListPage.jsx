/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState, useRef, useEffect, useMemo } from "react";
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

const addedColors = {
  yellow: {
    background: '#FFF9DC',
    checkbox: '#FCD514',
  },
  text: {
    selected: '#3B3537',
  }
};

const dropDownButtonStyle = (width, isSelected) => css`
  width: ${width};
  height: 40px;
  background-color: ${isSelected ? addedColors.yellow.background : '#ffffff'};
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  color: ${isSelected ? addedColors.text.selected : colors.gray[400]};
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

const techDropDownMenuStyle = css`
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
  width: 700px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
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
    background-color: ${addedColors.yellow.checkbox};
    border-color: ${addedColors.yellow.checkbox};
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

const dropDownMenuItemStyle = (isSelected) => css`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-family: "nanumR";
  font-size: 14px;
  white-space: nowrap;
  color: ${isSelected ? addedColors.text.selected : colors.gray[400]};
  background-color: ${isSelected ? addedColors.yellow.background : 'transparent'};

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

const importedTechStackOptions = [
  "Java","C/C++","C#","HTML/CSS","TypeScript","JavaScript","Kotlin","Swift","Python",
  "Express","Vue.js","Next.js","React","Node.js","Spring Boot","Django","Flutter",
  "Pandas","scikit-learn","TensorFlow","PyTorch","Unity","Unreal","PostgreSQL","MySQL",
  "MongoDB","Redis","Git/GitHub","GitHub Actions","Docker","Figma","Notion","Jira"
];

const techOptions = [...importedTechStackOptions];

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
  const itemsPerPage = 9;

  const [selectedTechs, setSelectedTechs] = useState([]);
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

  const handleTechSelect = (tech) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const filteredStudies = useMemo(() => {
    return dummyStudies.filter(study =>
      selectedTechs.length === 0 || selectedTechs.every(tech => study.techStack.includes(tech))
    );
  }, [selectedTechs]);

  const totalItems = filteredStudies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredStudies.slice(startIndex, startIndex + itemsPerPage);

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
          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
            <button css={dropDownButtonStyle("120px", selectedTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
              <span>{selectedTechs.length > 0 ? `기술 ${selectedTechs.length}` : '기술'}</span>
              <ArrowIcon />
            </button>
            {openDropdown === 'tech' && (
              <ul css={techDropDownMenuStyle}>
                {techOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedTechs.includes(option))} onClick={() => handleTechSelect(option)}>
                    <input type="checkbox" css={customCheckboxStyle} checked={selectedTechs.includes(option)} readOnly />
                    <label>{option}</label>
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
        {currentItems.map((study) => (
          <div key={study.id} css={flexItemStyle}>
            <StudyCard project={study} />
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