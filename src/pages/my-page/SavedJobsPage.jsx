/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { create } from 'zustand';
import ProjectCard from "@/pages/job-list/components/card/ProjectCard";
import HwCard from "@/pages/job-list/components/card/HwCard";
import StudyCard from "@/pages/job-list/components/card/StudyCard";

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  white: '#fff',
};

const pageStyles = {
  wrap: css`padding: 24px 32px; color: ${colors.text}; font-family: 'nanumR', 'NanumSquareRound', sans-serif;`,
  contentContainer: css`max-width: 1100px; margin: 0 auto;`, 
  title: css`margin: 40px 0 24px; font-size: 22px; font-family: 'nanumB', 'NanumSquareRound', sans-serif;`,
  tabs: css`display: flex; gap: 8px; margin-bottom: 24px;`,
  tabBtn: (active) => css`padding: 0 16px; height: 33px; border-radius: 10px; border: 1px solid ${colors.border}; background: ${active ? colors.tabActive : colors.white}; cursor: pointer; font-family: 'nanumB', 'NanumSquareRound', sans-serif; &:hover { background: ${active ? '' : colors.btnHover}; }`,
  gridContainer: css`display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; justify-content: start;`,
  empty: css`border: 1px dashed ${colors.border}; border-radius: 12px; padding: 48px 24px; color: ${colors.muted}; text-align: center; grid-column: 1 / -1;`,
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
  const [tab, setTab] = useState('프로젝트');
  const { projects, homeworks, studies, unlike } = useSavedJobsStore();

  const renderContent = () => {
    let items;
    let CardComponent;
    let category;

    switch (tab) {
      case '프로젝트':
        items = projects;
        CardComponent = ProjectCard;
        category = '프로젝트';
        break;
      case '과제':
        items = homeworks;
        CardComponent = HwCard;
        category = '과제';
        break;
      case '스터디':
        items = studies;
        CardComponent = StudyCard;
        category = '스터디';
        break;
      default:
        return <div css={pageStyles.empty}>찜한 공고가 없어요.</div>;
     }

    if (items.length === 0) {
      return <div css={pageStyles.empty}>찜한 공고가 없어요.</div>;
    }

    return (
      <div css={pageStyles.gridContainer}>
        {items.map((item) => (
          <CardComponent 
            key={item.id} 
            project={item} 
            onUnlike={(id) => unlike(id, category)} 
          />
        ))}
      </div>
    );
  };

  return (
    <div css={pageStyles.wrap}>
      <div css={pageStyles.contentContainer}>
        <h2 css={pageStyles.title}>❤️ 찜한 공고</h2>
        <div css={pageStyles.tabs}>
          <button css={pageStyles.tabBtn(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>프로젝트</button>
          <button css={pageStyles.tabBtn(tab === '과제')} onClick={() => setTab('과제')}>과제</button>
          <button css={pageStyles.tabBtn(tab === '스터디')} onClick={() => setTab('스터디')}>스터디</button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}