import { create } from 'zustand';

const sampleTeams = [
  {
    id: 't1',
    category: '프로젝트',
    title: '사이드프로젝트 팀원 구해요',
    status: '종료',
    period: '2025.06.07 ~ 2025.08.16',
    members: [
      { id: 'm1', name: '솔랑솔랑', grade: '리더', position: '프론트엔드', color: '#f5c24b' },
      { id: 'm2', name: '팔랑팔랑', grade: '멤버', position: '백엔드', color: '#c9a7ff' },
      { id: 'm3', name: '팔랑귀', grade: '멤버', position: '디자인', color: '#ffa3b8' },
    ],
  },
  {
    id: 't2',
    category: '프로젝트',
    title: '웹 프로젝트 함께할 분',
    status: '진행중',
    period: '2025.06.07 ~ 진행 중',
    members: [{ id: 'm5', name: '짱구', grade: '리더', position: '백엔드', color: '#ffd482' }],
  },
  {
    id: 't3',
    category: '과제',
    title: '운영체제 과제 같이해요',
    status: '진행중',
    period: '2025.09.01 ~ 진행 중',
    members: [{ id: 'm6', name: '유리', grade: '리더', color: '#ffb3c7' }],
  },
  {
    id: 't4',
    category: '스터디',
    title: '코테 스터디 모집',
    status: '종료',
    period: '2025.04.01 ~ 2025.06.30',
    members: [{ id: 'm7', name: '철수', grade: '리더', color: '#b3e5ff' }],
  },
];

export const currentUserId = 'm1';

export const useTeamStore = create((set) => ({
  teams: sampleTeams,
  open: new Set(),
  reviewTarget: null,
  reviewText: '',
  reviewedMembers: new Set(),
  reviews: new Map(),

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.open);
      next.has(id) ? next.delete(id) : next.add(id);
      return { open: next };
    }),

  deleteMember: (teamId, memberId) => {
    if (window.confirm('정말 팀에서 삭제하시겠습니까?')) {
      set((state) => ({
        teams: state.teams.map((team) =>
          team.id === teamId
            ? { ...team, members: team.members.filter((m) => m.id !== memberId) }
            : team
        ),
      }));
    }
  },

  openReview: (team, member) =>
    set((state) => {
      const key = `${team.id}_${member.id}`;
      return {
        reviewTarget: { team, member },
        reviewText: state.reviews.get(key) || '',
      };
    }),
  closeReview: () => set({ reviewTarget: null }),
  setReviewText: (text) => set({ reviewText: text }),
  saveReview: () =>
    set((state) => {
      if (!state.reviewTarget) return state;
      alert(`리뷰 저장: ${state.reviewTarget.member.name}\n${state.reviewText}`);
      const { team, member } = state.reviewTarget;
      const key = `${team.id}_${member.id}`;

      const newReviewedMembers = new Set(state.reviewedMembers);
      newReviewedMembers.add(key);

      const newReviews = new Map(state.reviews);
      newReviews.set(key, state.reviewText);

      return { reviewTarget: null, reviewedMembers: newReviewedMembers, reviews: newReviews };
    }),

  deleteReview: () =>
    set((state) => {
      if (!state.reviewTarget) return state;
      if (window.confirm('리뷰를 정말 삭제하시겠습니까?')) {
        const { team, member } = state.reviewTarget;
        const key = `${team.id}_${member.id}`;

        const newReviewedMembers = new Set(state.reviewedMembers);
        newReviewedMembers.delete(key);

        const newReviews = new Map(state.reviews);
        newReviews.delete(key);

        return {
          reviewTarget: null,
          reviewedMembers: newReviewedMembers,
          reviews: newReviews,
        };
      }
      return state;
    }),
}));
