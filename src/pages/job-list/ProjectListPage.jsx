/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import Pagination from "@/components/common/Pagination";
import ProjectCard from "@/components/card/ProjectCard";

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

const purposeOptions = ["전체", ...importedPurposeOptions];
const positionOptions = [...importedPositionOptions];
const techOptions = [...importedTechStackOptions];

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

export default function ProjectListPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  const [selectedPurpose, setSelectedPurpose] = useState("전체");
  const [hasSelectedPurpose, setHasSelectedPurpose] = useState(false);
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
    setCurrentPage(1);
  };

  const handlePositionSelect = (position) => {
    setSelectedPositions(prev =>
      prev.includes(position) ? prev.filter(p => p !== position) : [...prev, position]
    );
    setCurrentPage(1);
  };

  const filteredProjects = useMemo(() => {
    return dummyProjects.filter(project => {
      const purposeMatch = !hasSelectedPurpose || selectedPurpose === '전체' || project.purposeTag === selectedPurpose;
      const techMatch = selectedTechs.length === 0 || selectedTechs.every(tech => project.techStack.includes(tech));
      const positionMatch = selectedPositions.length === 0 || selectedPositions.some(pos => project.positions.includes(pos));
      return purposeMatch && techMatch && positionMatch;
    });
  }, [selectedPurpose, selectedTechs, selectedPositions, hasSelectedPurpose]);

  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  return (
    <PageWrapper>
      <PageHeader title="프로젝트" />
      
      <FilterBar>
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
          <button css={dropDownButtonStyle("120px", selectedPositions.length > 0)} onClick={() => setOpenDropdown(openDropdown === "position" ? null : "position")}>
            <span>{selectedPositions.length > 0 ? `포지션 ${selectedPositions.length}` : '포지션'}</span>
            <ArrowIcon />
          </button>
          {openDropdown === 'position' && (
            <ul css={dropDownMenuStyle}> 
              {positionOptions.map(option => (
                <li key={option} css={dropDownMenuItemStyle(selectedPositions.includes(option), false)} onClick={() => handlePositionSelect(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FilterBar>
      
      <CardGrid
        items={currentItems}
        itemsPerPage={itemsPerPage}
        renderCard={(project) => <ProjectCard project={project} />}
      />
      
      {totalPages > 0 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      )}
    </PageWrapper>
  );
}