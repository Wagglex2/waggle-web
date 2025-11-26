/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HexagonCard from './components/HexagonCard';
import bgImg from '../../assets/img/main-bg.png';
import MainPurposeFilter from './components/filter/MainPurposeFilter';
import MainPositionFilter from './components/filter/MainPositionFilter';
import { useState } from 'react';
import UserInfoModal from '../../layout/components/UserInfoModal';

const cardPositions = [
  // 1
  { top: '0', left: '0' },
  { top: '0', left: '453px' },
  { top: '0', left: '905px' },

  // 2
  { top: '104px', left: '226px' },
  { top: '104px', left: '679px' },

  // 3
  { top: '208px', left: '0' },
  { top: '208px', left: '453px' },
  { top: '208px', left: '905px' },

  // 4
  { top: '312px', left: '679px' },

  // 5
  { top: '416px', left: '0' },
  { top: '416px', left: '453px' },

  // 6
  { top: '520px', left: '226px' },
  { top: '520px', left: '679px' },

  // 7
  { top: '624px', left: '0' },
  { top: '624px', left: '453px' },
  { top: '624px', left: '905px' },
];

const dummyProjects = [
  {
    id: 1,
    purposeTag: '공모전',
    methodTag: '온/오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 함께할 팀원 구합니다.',
    positions: ['기획', '디자인'],
    techStack: ['TYPESCRIPT', 'REACT', 'FIGMA'],
    author: '솔랑솔랑',
  },
  {
    id: 2,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title:
      '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다 웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다',
    positions: ['기획', '디자인', '프론트엔드'],
    techStack: ['JAVASCRIPT', 'NEXT_JS', 'NOTION'],
    author: '솔랑솔랑',
  },
  {
    id: 3,
    purposeTag: '해커톤',
    methodTag: '온라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['JAVA', 'SPRING_BOOT', 'MYSQL'],
    author: '솔랑솔랑',
  },
  {
    id: 4,
    purposeTag: '토이프로젝트',
    methodTag: '온라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['CSHARP', 'UNITY'],
    author: '솔랑솔랑',
  },
  {
    id: 5,
    purposeTag: '공모전',
    methodTag: '온/오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['PYTHON', 'DJANGO', 'POSTGRESQL'],
    author: '솔랑솔랑',
  },
  {
    id: 6,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['KOTLIN', 'SPRING_BOOT', 'MYSQL', 'SWIFT', 'NODE_JS'],
    author: '솔랑솔랑',
  },
  {
    id: 7,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['SWIFT', 'NODE_JS'],
    author: '솔랑솔랑',
  },
  {
    id: 8,
    purposeTag: '사이드프로젝트',
    methodTag: '온/오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['C', 'UNREAL'],
    author: '솔랑솔랑',
  },
  {
    id: 9,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['EXPRESS', 'MONGODB'],
    author: '솔랑솔랑',
  },
  {
    id: 10,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['SCIKIT_LEARN', 'PANDAS', 'TENSORFLOW', 'PYTORCH'],
    author: '솔랑솔랑',
  },
  {
    id: 11,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['TENSORFLOW', 'PYTORCH'],
    author: '솔랑솔랑',
  },
  {
    id: 12,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['FLUTTER', 'FIGMA'],
    author: '솔랑솔랑',
  },
  {
    id: 13,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['HTML', 'VUE'],
    author: '솔랑솔랑',
  },
  {
    id: 14,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['GIT', 'GITHUBACTIONS'],
    author: '솔랑솔랑',
  },
  {
    id: 15,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['REDIS', 'DOCKER'],
    author: '솔랑솔랑',
  },
  {
    id: 16,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['JIRA', 'NOTION'],
    author: '솔랑솔랑',
  },
];

const MainPage = () => {
  const [openModal, setOpenModal] = useState(true);
  return (
    <div css={container(bgImg)}>
      <div css={text}>
        <p>꿀벌의 춤을 따라</p>
        <p>빛나는 꿈을 향해</p>
      </div>
      <div css={filterBox}>
        <MainPurposeFilter />
        <MainPositionFilter />
      </div>
      <div css={jobCardList}>
        {cardPositions.map((pos, index) => (
          <div key={index} css={cardPosition(pos.top, pos.left)}>
            <HexagonCard jobData={dummyProjects[index]} techMaxLength={4} />
          </div>
        ))}
      </div>
      {openModal && <UserInfoModal />}
    </div>
  );
};

export default MainPage;

const container = (img) => css`
  position: relative;

  background-image: url(${img});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 1300px;
  padding-bottom: 200px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(69, 68, 59, 0.76);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const text = css`
  width: 575px;
  margin: auto;
  padding: 80px 0px 90px;

  p {
    font-family: 'nanumEB';
    font-size: 40px;
    color: #ffffff;
  }

  p:first-of-type {
    /* margin-left: 225px; */
  }

  p:last-of-type {
    margin-left: 300px;
    margin-top: 20px;
  }
`;

const filterBox = css`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  position: relative;
  z-index: 100;
`;

const jobCardList = css`
  width: 1185px;
  margin: auto;
  position: relative;
`;

const cardPosition = (top, left) => css`
  position: absolute;
  top: ${top};
  left: ${left};
`;
