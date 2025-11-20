/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import Pagination from "@/components/common/Pagination";
import StudyCard from "@/components/card/StudyCard";
import EmptyStateMessage from "../../components/common/EmptyStateMessage";
import { useDropdown } from "@/components/filter/useDropdown";

import {
  dropDownButtonStyle,
  ArrowIcon,
  dropdownContainerStyle,
  techDropDownMenuStyle,
  customCheckboxStyle,
  dropDownMenuItemStyle
} from "@/components/filter/dropdownStyles";
import { techStackOptions as importedTechStackOptions } from "@/data/options";

const techOptions = [...importedTechStackOptions];

const dummyStudies = [
  { id: 1, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자", techStack: ["TYPESCRIPT", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 2, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TYPESCRIPT", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 3, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["JAVA", "SPRINGBOOT"], author: "솔랑솔랑" },
  { id: 4, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["NODEJS", "EXPRESS"], author: "솔랑솔랑" },
  { id: 5, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["PYTHON", "DJANGO"], author: "솔랑솔랑" },
  { id: 6, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["C", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 7, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["CSS", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 8, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["CPP", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 9, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["CS", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 10, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["HTML", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 11, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["VUE", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 12, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["NEXTJS", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 13, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TYPESCRIPT", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 14, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TYPESCRIPT", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 15, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TYPESCRIPT", "REACT", "FIGMA"], author: "솔랑솔랑" },
  { id: 16, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["TYPESCRIPT", "REACT", "FIGMA"], author: "솔랑솔랑" },
];

export default function StudyListPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      selectedTechs.length === 0 || selectedTechs.some(selectedTech => {
        const searchTerms = selectedTech.split('/');
        return searchTerms.some(term => {
           let normalized = term.toUpperCase().trim();
           if (normalized === 'C++') normalized = 'CPP';
           else if (normalized === 'C#') normalized = 'CS';
           else if (normalized === 'VUE.JS' || normalized === 'VUEJS') normalized = 'VUE';
           else normalized = normalized.replace(/[\s.]/g, '');
           return study.techStack.includes(normalized);
        });
      })
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

  return (
    <PageWrapper>
      <PageHeader title="스터디" />
      
      <FilterBar>
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
      </FilterBar>
    
      {dummyStudies.length === 0 ? (
        <EmptyStateMessage message="등록된 스터디가 없습니다." />
      ) : totalItems === 0 ? (
        <EmptyStateMessage message="일치하는 스터디가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={currentItems}
            itemsPerPage={itemsPerPage}
            renderCard={(study) => <StudyCard project={study} />}
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