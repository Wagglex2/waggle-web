/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from "@emotion/react";
import React, { useState, useMemo } from "react";
import { create } from 'zustand';
import ProjectCard from "@/components/card/ProjectCard";
import HwCard from "@/components/card/HwCard";
import StudyCard from "@/components/card/StudyCard";
import ToggleSwitch from "@/components/common/ToggleSwitch"; 
import Pagination from "@/components/common/Pagination";
import { colors as themeColors } from "@/styles/theme";

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  white: '#fff',
};

const cardHeight = 260;
const rowGap = 18;
const gridMinHeight = (cardHeight * 3) + (rowGap * 2);

const pageStyles = {
  wrap: css`padding: 24px 32px; color: ${colors.text}; font-family: 'nanumR', 'NanumSquareRound', sans-serif;`,
  contentContainer: css`max-width: 1100px; margin: 0 auto;`, 
  title: css`margin: 40px 0 24px; font-size: 22px; font-family: 'nanumB', 'NanumSquareRound', sans-serif;`,
  headerContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    height: 40px;
  `,
  tabs: css`display: flex; gap: 8px;`,
  tabBtn: (active) => css`padding: 0 16px; height: 33px; border-radius: 10px; border: 1px solid ${colors.border}; background: ${active ? colors.tabActive : colors.white}; cursor: pointer; font-family: 'nanumB', 'NanumSquareRound', sans-serif; &:hover { background: ${active ? '' : colors.btnHover}; }`,
  
  gridContainer: css`
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    gap: ${rowGap}px; 
    justify-content: start;
    min-height: ${gridMinHeight}px;
    align-content: start;
  `,
  
  empty: css`
    border: 1px dashed ${colors.border}; 
    border-radius: 12px; 
    padding: 48px 24px; 
    color: ${colors.muted}; 
    text-align: center; 
    grid-column: 1 / -1; 
    min-height: ${gridMinHeight}px;
    display: flex; 
    align-items: center; 
    justify-content: center;
  `,
  toggleContainer: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
  toggleText: css`
    color: ${themeColors.gray[300]};
    font-size: 14px;
    font-family: 'nanumR';
  `,
};

const dummyProjects = [
    { id: 1, purposeTag: "프로젝트", methodTag: "온/오프라인", deadline: "2025.12.15까지", title: "웹 어쩌구저쩌구 함께할 팀원 구합니다.", positions: ["기획", "디자인", "프론트엔드", "백엔드", "PM"], techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
    { id: 2, purposeTag: "프로젝트", methodTag: "오프라인", deadline: "2025.12.15까지", title: "사이드프로젝트 팀원 구합니다.", positions: ["기획", "디자인", "프론트엔드", "백엔드"], techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
    { id: 4, purposeTag: "프로젝트", methodTag: "온라인", deadline: "2025.12.15까지", title: "웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다람지렁이빨대머리스본드라이기러기차표범인간장독대나무", positions: ["프론트엔드", "백엔드"], techStack: ["TypeScript", "Figma"], author: "솔랑솔랑" },
];
const dummyHomeworks = [
    { id: 6, purposeTag: "과제", department: "컴퓨터공학과", deadline: "2025.10.31까지", title: "운영체제 과제 같이 할 분 구해요", subjects: ["운영체제(1234)"], author: "솔랑솔랑" },
    { id: 7, purposeTag: "과제", department: "컴퓨터공학과", deadline: "2025.11.15까지", title: "운영체제 과제 같이 할 분 구해요", subjects: ["운영체제(1234)"], author: "솔랑솔랑" },
];
const dummyStudies = [
    { id: 3, purposeTag: "스터디", deadline: "상시모집", title: "코딩테스트 스터디원을 모집합니다", techStack: ["React"], author: "솔랑솔랑" },
    { id: 5, purposeTag: "스터디", deadline: "2025.12.15까지", title: "코딩테스트 스터디원을 모집합니다", techStack: ["TypeScript", "React", "Figma"], author: "솔랑솔랑" },
];
const isJobClosed = (deadline) => {
  if (deadline === "상시모집") return false;
  if (!deadline.endsWith("까지")) return false; 
  try {
    const dateStr = deadline.replace("까지", "").replace(/\./g, "-");
    const deadlineDate = new Date(dateStr);
    const today = new Date();
    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return deadlineDate < today;
  } catch (e) { return false; }
};
const useSavedJobsStore = create((set) => ({
  projects: dummyProjects,
  homeworks: dummyHomeworks,
  studies: dummyStudies,
  unlike: (id, category) => set((state) => {
    if (category === '프로젝트') return { projects: state.projects.filter(p => p.id !== id) };
    if (category === '과제') return { homeworks: state.homeworks.filter(h => h.id !== id) };
    if (category === '스터디') return { studies: state.studies.filter(s => s.id !== id) };
    return state;
  }),
}));

export default function SavedJobsPage() {
  const itemsPerPage = 9;
  const [tab, setTab] = useState('프로젝트');
  const [showClosed, setShowClosed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { projects, homeworks, studies, unlike } = useSavedJobsStore();

  const handleToggle = (toggled) => {
    setShowClosed(toggled);
    setCurrentPage(1);
  };
  
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setCurrentPage(1);
  };

  const filteredItems = useMemo(() => {
    let items;
    switch (tab) {
      case '프로젝트': items = projects; break;
      case '과제': items = homeworks; break;
      case '스터디': items = studies; break;
      default: items = [];
    }
    return items.filter(item => {
      return showClosed ? isJobClosed(item.deadline) : !isJobClosed(item.deadline);
    });
  }, [tab, projects, homeworks, studies, showClosed]);

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const renderCard = (item) => {
    const category = tab;
    const CardComponent = tab === '프로젝트' ? ProjectCard : (tab === '과제' ? HwCard : StudyCard);
    
    return (
      <CardComponent 
        key={item.id} 
        project={item} 
        onUnlike={(id) => unlike(id, category)} 
      />
    );
  };

  return (
    <div css={pageStyles.wrap}>
      <div css={pageStyles.contentContainer}>
        <h2 css={pageStyles.title}>❤️ 찜한 공고</h2>
        
        <div css={pageStyles.headerContainer}>
          <div css={pageStyles.tabs}>
            <button css={pageStyles.tabBtn(tab === '프로젝트')} onClick={() => handleTabChange('프로젝트')}>프로젝트</button>
            <button css={pageStyles.tabBtn(tab === '과제')} onClick={() => handleTabChange('과제')}>과제</button>
            <button css={pageStyles.tabBtn(tab === '스터디')} onClick={() => handleTabChange('스터디')}>스터디</button>
          </div>
          
          <div css={pageStyles.toggleContainer}>
            <span css={pageStyles.toggleText}>마감된 공고만</span>
            <ToggleSwitch isToggled={showClosed} onToggle={handleToggle} />
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div css={pageStyles.empty}>찜한 공고가 없어요.</div>
        ) : (
          <div css={pageStyles.gridContainer}>
            {currentItems.map((item) => (
              renderCard(item)
            ))}
          </div>
        )}
        
        {totalPages > 0 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}