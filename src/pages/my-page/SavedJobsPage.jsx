/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from "@emotion/react";
import React, { useState, useMemo } from "react";
import { create } from 'zustand';

const colors = {
  gray: {
    100: '#f7f7f7',
    200: '#e5e5e5',
    300: '#B3B3B3',
    400: '#666666',
  },
  secondary: '#333333',
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  white: '#fff',
};

const iconStyle = css`
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  padding: 0.5px;
  margin-left: -8px;
  &:first-of-type { margin-left: 0; }
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SiTypescript = (props) => (
  <svg viewBox="0 0 128 128" css={iconStyle} {...props}>
    <path fill="#3178C6" d="M121 11.6L7.1 11.5 7 117.4l114 1z"></path>
    <path fill="#fff" d="M52.3 83.2H38.5v-9.2l12.7-12.3c2.7-2.6 4.6-4.9 5.8-6.9.8-1.5 1.2-3 1.2-4.5 0-2.8-.9-5.1-2.7-6.8-1.8-1.7-4.2-2.6-7.1-2.6-3.4 0-6.2 1.1-8.4 3.4-2.2 2.2-3.3 5-3.3 8.3H23.1c.2-5.7 2-10.6 5.5-14.7 3.5-4.1 8.2-6.1 14-6.1 5.9 0 10.7 1.9 14.4 5.6 3.7 3.7 5.6 8.5 5.6 14.4 0 4.1-1.2 7.9-3.5 11.4-1.2 1.8-3.3 4-6.3 6.6l-8.6 7.9v.3h18.1v13.9zm39.1-39.7h-28v10.1h8.7v39.1h10.6V53.6h8.7V43.5z"></path>
  </svg>
);

const SiReact = (props) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" css={iconStyle} {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
  </svg>
);

const SiFigma = (props) => (
    <svg viewBox="0 0 24 36" css={iconStyle} {...props}>
        <path d="M12 36c6.627 0 12-5.373 12-12V12C24 5.373 18.627 0 12 0S0 5.373 0 12v12c0 6.627 5.373 12 12 12z" fill="#f24e1e"></path>
        <path d="M12 24a6 6 0 01-6-6h12a6 6 0 01-6 6z" fill="#ff7262"></path>
        <path d="M12 12a6 6 0 116-6 6 6 0 01-6 6z" fill="#a259ff"></path>
        <path d="M6 12a6 6 0 016-6v12a6 6 0 01-6-6z" fill="#1abcfe"></path>
        <path d="M12 12a6 6 0 11-6 6 6 6 0 016-6z" fill="#0acf83"></path>
    </svg>
);

const HeartIcon = ({ isLiked }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "#FA9394" : "none"} stroke={isLiked ? "#FA9394" : "#B3B3B3"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const getTechIcons = (tags = []) => {
    const iconMap = {
        'TypeScript': <SiTypescript key="ts" />,
        'React': <SiReact key="react" />,
        'Figma': <SiFigma key="figma" />,
    };
    return tags.map(tag => iconMap[tag]).filter(Boolean);
};

const cardBaseStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px 20px 10px 10px;
  border: 1.5px solid ${colors.gray[300]};
  background: #fff;
  padding: 15px;
  padding-bottom: 8px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  height: 260px;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

function ProjectCard({ project, onUnlike }) {
  const techIcons = getTechIcons(project.techStack);
  const displayedPositions = project.positions.slice(0, 3);
  const hasMorePositions = project.positions.length > 3;

  return (
    <div css={cardBaseStyle}>
      <div css={css`display: flex; justify-content: space-between; align-items: center; font-family: 'nanumR', sans-serif; position: absolute; top: 15px; left: 15px; right: 15px;`}>
        <div css={css`display: flex; gap: 8px;`}>
          <span css={css`background: #FFF4C2; color: ${colors.gray[400]}; font-size: 12px; padding: 2px 14px 1px 14px; border-radius: 18px; font-family: 'nanumR', sans-serif; display: inline-flex; align-items: center;`}>{project.purposeTag}</span>
          {project.methodTag && <span css={css`background: #DAF1DE; color: ${colors.gray[400]}; font-size: 12px; padding: 2px 14px 1px 14px; border-radius: 18px; font-family: 'nanumR', sans-serif; display: inline-flex; align-items: center;`}>{project.methodTag}</span>}
        </div>
        <span css={css`font-size: 12px; color: ${colors.gray[400]}; padding-top: 3px; font-family: 'nanumR', sans-serif;`}>{project.deadline}</span>
      </div>
      <h3 css={css`
        font-size: 18px;
        font-weight: 700;
        color: ${colors.secondary};
        margin-top: -25px;
        font-family: 'nanumEB';
        line-height: 1.4;
        position: absolute;
        top: 75px;
        left: 15px;
        right: 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      `}>{project.title}</h3>
      <div css={css`display: flex; flex-wrap: nowrap; gap: 6px; position: absolute; top: 120px; left: 15px; right: 15px; overflow: hidden;`}>
        {displayedPositions.map((tag, idx) => (<span key={idx} css={css`background: #E2E2E2; color: ${colors.gray[400]}; font-size: 13px; padding: 2px 14px 1px 14px; border-radius: 18px; font-family: 'nanumR', sans-serif; flex-shrink: 0; display: inline-flex; align-items: center;`}>{tag}</span>))}
        {hasMorePositions && <span css={css`background: #E2E2E2; color: ${colors.gray[400]}; font-size: 13px; padding: 1px 14px 2px 14px; border-radius: 18px; display: inline-flex; align-items: center;`}>...</span>}
      </div>
      <div css={css`display: flex; align-items: center; position: absolute; top: 150px; left: 15px; right: 15px`}>{techIcons}</div>
      <div>
        <div css={css`border-top: 1px solid #E2E2E2; position: absolute; top: 205px; left: 15px; right: 15px;`} />
        <div css={css`display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 8px; left: 15px; right: 15px;`}>
          <div css={css`display: flex; align-items: center; gap: 8px;`}>
            <div css={css`width: 37px; height: 37px; border-radius: 50%; background-color: ${colors.gray[200]};`} />
            <span css={css`font-size: 15px; color: ${colors.gray[400]}; font-family: 'nanumR', sans-serif;`}>{project.author}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onUnlike(project.id); }} css={css`background: none; border: none; padding: 0; cursor: pointer;`}><HeartIcon isLiked={true} /></button>
        </div>
      </div>
    </div>
  );
}

function HomeworkCard({ project, onUnlike }) {
  const displayedSubjects = project.subjects ? project.subjects.slice(0, 4) : [];
  const hasMoreSubjects = project.subjects ? project.subjects.length > 4 : false;
  
  return (
    <div css={cardBaseStyle}>
      <div css={css`display: flex; justify-content: space-between; align-items: center; font-family: 'nanumR'; position: absolute; top: 15px; left: 15px; right: 15px;`}>
        <div css={css`display: flex; gap: 8px;`}>
            {project.purposeTag && <span css={css`background: #CCEAEE; color: ${colors.gray[400]}; font-size: 12px; padding: 2px 14px 1px 14px; border-radius: 18px; display: inline-flex; align-items: center;`}>{project.purposeTag}</span>}
            {project.department && <span css={css`background: #DAF1DE; color: ${colors.gray[400]}; font-size: 12px; padding: 2px 14px 1px 14px; border-radius: 18px; display: inline-flex; align-items: center;`}>{project.department}</span>}
        </div>
        <span css={css`font-size: 12px; color: ${colors.gray[400]};`}>{project.deadline}</span>
      </div>
      <h3 css={css`font-size: 18px; font-weight: 700; color: ${colors.secondary}; font-family: 'nanumEB'; line-height: 1.4; position: absolute; top: 60px; left: 15px; right: 15px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;`}>{project.title}</h3>
      {project.subjects && (
        <div css={css`display: flex; flex-wrap: nowrap; gap: 6px; position: absolute; top: 170px; left: 15px; right: 15px;`}>
          {displayedSubjects.map((subject, idx) => (<span key={idx} css={css`background: #E2E2E2; color: ${colors.gray[400]}; font-size: 13px; padding: 2px 14px 1px 14px; border-radius: 18px; display: inline-flex; align-items: center;`}>{subject}</span>))}
          {hasMoreSubjects && <span css={css`background: #E2E2E2; color: ${colors.gray[400]}; font-size: 13px; padding: 2px 14px 1px 14px; border-radius: 18px; display: inline-flex; align-items: center;`}>...</span>}
        </div>
      )}
        <div>
        <div css={css`border-top: 1px solid #E2E2E2; position: absolute; top: 205px; left: 15px; right: 15px;`} />
        <div css={css`display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 8px; left: 15px; right: 15px;`}>
          <div css={css`display: flex; align-items: center; gap: 8px;`}>
            <div css={css`width: 37px; height: 37px; border-radius: 50%; background: ${colors.gray[200]};`} />
            <span css={css`font-size: 15px; color: ${colors.gray[400]}; font-family: 'nanumR', sans-serif;`}>{project.author}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onUnlike(project.id); }} css={css`background: none; border: none; padding: 0; cursor: pointer;`}><HeartIcon isLiked={true} /></button>
        </div>
      </div>
    </div>
  );
}

function StudyCard({ project, onUnlike }) {
  const techIcons = getTechIcons(project.techStack);

  return (
    <div css={cardBaseStyle}>
      <div css={css`display: flex; justify-content: space-between; align-items: center; font-family: 'nanumR'; position: absolute; top: 15px; left: 15px; right: 15px;`}>
          <div css={css`display: flex; gap: 8px;`}>
              {project.purposeTag && (<span css={css`background: #FFDFDF; color: ${colors.gray[400]}; font-size: 12px; padding: 2px 14px 1px 14px; border-radius: 18px; display: inline-flex; align-items: center;`}>{project.purposeTag}</span>)}
          </div>
          <span css={css`font-size: 12px; color: ${colors.gray[400]};`}>{project.deadline}</span>
      </div>
      <h3 css={css`font-size: 18px; font-weight: 700; color: ${colors.secondary}; font-family: 'nanumEB'; line-height: 1.4; position: absolute; top: 60px; left: 15px; right: 15px; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;`}>{project.title}</h3>
      {project.techStack && (<div css={css`display: flex; align-items: center; position: absolute; top: 150px; left: 15px; right: 15px;`}>{techIcons}</div>)}
      <div css={css`border-top: 1px solid #E2E2E2; position: absolute; top: 205px; left: 15px; right: 15px;`} />
      <div css={css`display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 8px; left: 15px; right: 15px;`}>
          <div css={css`display: flex; align-items: center; gap: 8px;`}>
              <div css={css`width: 37px; height: 37px; border-radius: 50%; background: ${colors.gray[200]};`} />
              <span css={css`font-size: 15px; color: ${colors.gray[400]}; font-family: 'nanumR', sans-serif;`}>{project.author}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onUnlike(project.id); }} css={css`background: none; border: none; padding: 0; cursor: pointer;`}><HeartIcon isLiked={true} /></button>
      </div>
    </div>
  );
}

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
        CardComponent = HomeworkCard;
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

