/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from "@emotion/react";
import React, { useMemo, useEffect } from "react";
import ProjectCard from "@/components/card/ProjectCard";
import HwCard from "@/components/card/HwCard";
import StudyCard from "@/components/card/StudyCard";
import ToggleSwitch from "@/components/common/ToggleSwitch"; 
import Pagination from "@/components/common/Pagination";
import { colors as themeColors } from "@/styles/theme";
import useSavedJobsStore from "@/stores/useSavedJobsStore";

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

export default function SavedJobsPage() {
  const itemsPerPage = 9;
  const { 
    projects, 
    homeworks, 
    studies, 
    tab,
    showClosed,
    currentPage,
    setTab,
    toggleShowClosed,
    setPage,
    unlike, 
    reset 
  } = useSavedJobsStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleToggle = (toggled) => {
    toggleShowClosed(toggled);
  };
  
  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredItems = useMemo(() => {
    switch (tab) {
      case '프로젝트': return projects;
      case '과제': return homeworks;
      case '스터디': return studies;
      default: return [];
    }
  }, [tab, projects, homeworks, studies]); 

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
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