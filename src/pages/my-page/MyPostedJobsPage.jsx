/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useMemo, useState } from 'react';
import { css } from '@emotion/react';
import ApplicantModal from './components/ApplicationModal';
import PostedJobCard from './components/PostedJobCard';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  primary: '#FFCC00',
};

const samplePosts = [
  {
    id: 1,
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    content:
      '웹 애플리케이션 개발 프로젝트에 참여할 프론트엔드 개발자를 찾습니다. React, TypeScript 경험이 있으신 분 환영합니다.',
    type: '프로젝트',
    deadline: '2025.03.15',
    applicants: [
      {
        id: 'a1',
        name: '짱구',
        color: '#f5c24b',
        applicationDate: '2025.01.15 14:30',
        mode: '온라인',
        year: '3학년',
        position: '프론트',
        stack: 'ts, react, figma',
        detail: '어쩌구\n.\n.\n.\n저쩌구',
      },
      {
        id: 'a2',
        name: '짱아',
        color: '#c9a7ff',
        applicationDate: '2025.01.16 09:15',
        mode: '온라인',
        year: '4학년',
        position: '백엔드',
        stack: 'node, prisma',
        detail: '간단 자기소개와 참여 의사',
      },
      {
        id: 'a3',
        name: '맹구',
        color: '#8ee7f2',
        applicationDate: '2025.01.17 16:45',
        mode: '오프라인',
        year: '2학년',
        position: '디자인',
        stack: 'figma, ai',
        detail: '디자인 포트폴리오 보유',
      },
    ],
  },
  {
    id: 2,
    title: '알고리즘 스터디 모임',
    content:
      '매주 토요일 오후 2시에 진행하는 알고리즘 스터디입니다. 백준, 프로그래머스 문제를 함께 풀어보고 토론합니다.',
    type: '스터디',
    deadline: '2025.03.20',
    applicants: [
      {
        id: 'a4',
        name: '훈이',
        color: '#ffd482',
        applicationDate: '2025.01.18 11:20',
        mode: '온라인',
        year: '3학년',
        detail: '매주 토요일 참여 가능',
      },
      {
        id: 'a5',
        name: '유리',
        color: '#ffa3b8',
        applicationDate: '2025.01.19 13:10',
        mode: '온라인',
        year: '1학년',
        detail: '기초 알고리즘 학습 중',
      },
    ],
  },
  {
    id: 3,
    title: '운영체제 과제 같이 하실 분 구합니다.',
    content:
      '개인 포트폴리오 웹사이트를 제작하는 과제입니다. HTML, CSS, JavaScript를 활용하여 반응형 웹사이트를 만들어보세요.',
    type: '과제',
    deadline: '2025.03.25',
    applicants: [
      {
        id: 'a6',
        name: '철수',
        color: '#b3e5ff',
        applicationDate: '2025.01.20 15:30',
        mode: '오프라인',
        year: '2학년',
        detail: '과제 일정 맞춰 진행 가능',
      },
    ],
  },
];

const MyPostedJobsPage = () => {
  const [tab, setTab] = useState('프로젝트');
  const [posts, setPosts] = useState(samplePosts);
  const [open, setOpen] = useState(() => new Set());
  const [appModal, setAppModal] = useState(null);

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEdit = (postId) => {
    alert(`공고 ${postId} 수정하기`);
  };

  const handleDelete = (postId) => {
    if (window.confirm('정말 이 공고를 삭제하시겠습니까?')) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  const handleReject = (postId, applicantId) => {
    if (appModal) setAppModal(null);

    if (window.confirm('정말 이 지원자를 거절하시겠습니까?')) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              applicants: post.applicants.filter((app) => app.id !== applicantId),
            };
          }
          return post;
        })
      );
    }
  };

  const acceptApplicant = (postId, applicantId) => {
    alert('수락되었습니다.');
    setAppModal(null);
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            applicants: post.applicants.filter((app) => app.id !== applicantId),
          };
        }
        return post;
      })
    );
  };

  const handleViewApplication = (applicant, postType) => {
    setAppModal({ ...applicant, postType });
  };

  const closeModal = () => setAppModal(null);

  const filteredPosts = useMemo(() => posts.filter((p) => p.type === tab), [posts, tab]);

  const findPostIdByApplicantId = (applicantId) => {
    const post = posts.find((p) => p.applicants.some((a) => a.id === applicantId));
    return post ? post.id : null;
  };

  const handleModalReject = () => {
    if (!appModal) return;
    handleReject(findPostIdByApplicantId(appModal.id), appModal.id);
  };

  const handleModalAccept = () => {
    if (!appModal) return;
    acceptApplicant(findPostIdByApplicantId(appModal.id), appModal.id);
  };

  return (
    <div css={wrap}>
      <div css={contentContainer}>
        <h2 css={title}>📝 내가 올린 공고</h2>

        <div css={tabs}>
          <button css={tabButton(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>
            프로젝트
          </button>
          <button css={tabButton(tab === '과제')} onClick={() => setTab('과제')}>
            과제
          </button>
          <button css={tabButton(tab === '스터디')} onClick={() => setTab('스터디')}>
            스터디
          </button>
        </div>

        {filteredPosts.length === 0 && <div css={empty}>해당 카테고리의 공고가 없어요.</div>}

        {filteredPosts.map((post) => {
          const isOpen = open.has(post.id);

          return (
            <PostedJobCard
              key={post.id}
              post={post}
              isOpen={isOpen}
              onToggle={() => toggle(post.id)}
              onEdit={() => handleEdit(post.id)}
              onDelete={() => handleDelete(post.id)}
              onRejectApplicant={(applicantId) => handleReject(post.id, applicantId)}
              onViewApplicant={(applicant) => handleViewApplication(applicant, post.type)}
            />
          );
        })}
      </div>

      <ApplicantModal
        modalData={appModal}
        onClose={closeModal}
        onAcceptClick={handleModalAccept}
        onRejectClick={handleModalReject}
      />
    </div>
  );
};

export default MyPostedJobsPage;

const wrap = css`
  padding: 24px 32px;
  color: ${colors.text};
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
`;

const contentContainer = css`
  max-width: 1100px;
  margin: 0 auto;
`;

const title = css`
  margin: 40px 0 24px;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const tabs = css`
  display: flex;
  gap: 8px;
  margin: 0 0 16px;
`;

const tabButton = (isActive) => css`
  width: 90px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  background: ${isActive ? colors.tabActive : '#fff'};
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${isActive ? '' : colors.btnHover};
  }
`;

const empty = css`
  border: 1px dashed ${colors.border};
  border-radius: 12px;
  padding: 24px;
  color: ${colors.muted};
  text-align: center;
`;
