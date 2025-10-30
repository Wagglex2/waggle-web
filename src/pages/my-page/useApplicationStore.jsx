import { create } from 'zustand';

const sampleRows = [
  // 프로젝트 예시
  {
    id: 1,
    category: '프로젝트',
    title: '프론트엔드 개발자 구인 (React)',
    due: '2025.10.15',
    status: '대기중',
    applicant: {
      name: '짱구',
      mode: '온라인',
      year: '3학년',
      position: '프론트엔드',
      stack: 'React, TypeScript',
      detail: 'React 프로젝트 경험이 많습니다. 성실하게 참여하겠습니다.',
    },
  },
  {
    id: 2,
    category: '프로젝트',
    title: 'UX/UI 디자이너 모집',
    due: '2025.10.10',
    status: '수락됨',
    applicant: {
      name: '유리',
      mode: '온/오프라인',
      year: '4학년',
      position: 'UX/UI 디자인',
      stack: 'Figma, Adobe XD',
      detail: '사용자 중심의 디자인을 추구합니다. 포트폴리오 링크: ...',
    },
  },
  {
    id: 3,
    category: '프로젝트',
    title: '백엔드 사이드 프로젝트 (Node.js)',
    due: '2025.09.30',
    status: '거절됨',
    applicant: {
      name: '철수',
      mode: '온라인',
      year: '2학년',
      position: '백엔드',
      stack: 'Node.js, Express',
      detail: '백엔드 개발에 관심이 많아 지원합니다.',
    },
  },
  {
    id: 4,
    category: '프로젝트',
    title: '모바일 앱 개발 프로젝트',
    due: '2025.10.05',
    status: '모집종료',
    applicant: {
      name: '훈이',
      mode: '오프라인',
      year: '3학년',
      position: 'iOS 개발',
      stack: 'Swift, UIKit',
      detail: 'iOS 앱 개발 경험이 있습니다.',
    },
  },
  {
    id: 5,
    category: '프로젝트',
    title: '블록체인 기반 서비스 개발',
    due: '2025.10.20',
    status: '모집취소',
    applicant: {
      name: '맹구',
      mode: '온라인',
      year: '4학년',
      position: '풀스택',
      stack: 'Solidity, Next.js',
      detail: '블록체인 기술에 대한 이해도가 높습니다.',
    },
  },
  // 과제 예시
  {
    id: 6,
    category: '과제',
    title: '알고리즘 문제 풀이',
    due: '2025.09.28',
    status: '대기중',
    applicant: {
      name: '짱아',
      mode: '온라인',
      year: '1학년',
      detail: '알고리즘 과제를 함께 하고 싶습니다. 열심히 하겠습니다.',
    },
  },
  {
    id: 7,
    category: '과제',
    title: 'CS 스터디 과제 제출',
    due: '2025.10.01',
    status: '수락됨',
    applicant: {
      name: '흰둥이',
      mode: '온라인',
      year: '2학년',
      detail: 'CS 과목에 자신 있습니다. 함께 좋은 성적 받고 싶습니다.',
    },
  },
  {
    id: 8,
    category: '과제',
    title: '데이터 분석 과제',
    due: '2025.10.03',
    status: '모집종료',
    applicant: {
      name: '액션가면',
      mode: '오프라인',
      year: '3학년',
      detail: '데이터 분석 툴(R, Python) 사용에 능숙합니다.',
    },
  },
  // 스터디 예시
  {
    id: 9,
    category: '스터디',
    title: 'React 스터디원 모집',
    due: '2025.09.29',
    status: '거절됨',
    applicant: {
      name: '부리부리대마왕',
      mode: '온라인',
      year: '2학년',
      detail: 'React 기초를 탄탄히 다지고 싶습니다.',
    },
  },
  {
    id: 10,
    category: '스터디',
    title: '코딩테스트 준비 스터디',
    due: '2025.10.02',
    status: '모집취소',
    applicant: {
      name: '원장님',
      mode: '온/오프라인',
      year: '4학년',
      detail: '취업을 위해 코딩테스트를 꾸준히 준비하고 있습니다.',
    },
  },
  {
    id: 11,
    category: '스터디',
    title: '이펙티브 자바스크립트 스터디',
    due: '2025.10.07',
    status: '대기중',
    applicant: {
      name: '나미리',
      mode: '오프라인',
      year: '3학년',
      detail: '딥 다이브 스터디 경험 있습니다. 심도 있는 토론을 원합니다.',
    },
  },
];

export const toneByStatus = (s) =>
  s === '대기중'
    ? 'waiting'
    : s === '거절됨'
      ? 'rejected'
      : s === '수락됨'
        ? 'accepted'
        : s === '모집취소'
          ? 'cancelled'
          : 'closed';

export const useApplicationStore = create((set) => ({
  rows: sampleRows,
  modalData: null,
  removeRow: (id) => {
    if (window.confirm('정말 지원을 취소하시겠습니까?')) {
      set((state) => ({
        rows: state.rows.filter((r) => r.id !== id),
      }));
    }
  },
  openModal: (data) => set({ modalData: data }),
  closeModal: () => set({ modalData: null }),
}));
