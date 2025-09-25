/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState } from "react";
import ProjectCard from "@/components/ListPage/ProjectCard";
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

const dropDownButtonStyle = (width) => css`
  width: ${width};
  height: 40px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #B3B3B3;
  font-size: 16px;
  color: ${colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'nanumR';
  
  span {
    white-space: nowrap;
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
  {
    id: 1,
    purposeTag: "공모전",
    methodTag: "온/오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드", "PM", "으뱌뱌", "흠냐냐"],
    techStack: ["TypeScript", "React", "Figma"],
    author: "솔랑솔랑",
  },
  {
    id: 2,
    purposeTag: "사이드프로젝트",
    methodTag: "오프라인",
    deadline: "2025.12.15까지",
    title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.",
    positions: ["기획", "디자인", "프론트엔드", "백엔드"],
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
  const totalItems = dummyProjects.length;
  const itemsPerPage = 9;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dummyProjects.slice(startIndex, startIndex + itemsPerPage);

  const emptyCardCount = itemsPerPage - currentItems.length;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  return (
    <div css={pageContainerStyle}>
      <h1 css={pageTitleStyle}>프로젝트</h1>
      <div css={dividerStyle} />
      
      <div css={filterSectionStyle}>
        <div css={dropDownsContainerStyle}>
          <button css={dropDownButtonStyle('80px')}>
            <span>목적</span>
            <ArrowIcon />
          </button>
          <button css={dropDownButtonStyle('80px')}>
            <span>기술</span>
            <ArrowIcon />
          </button>
          <button css={dropDownButtonStyle('95px')}>
            <span>포지션</span>
            <ArrowIcon />
          </button>
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
      
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}