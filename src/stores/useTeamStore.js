import { create } from 'zustand';

export const currentUserId = '1';

export const useTeamStore = create((set) => ({
  teams: [],
  open: new Set(),
  reviewTarget: null,
  reviewText: '',
  reviewedMembers: new Set(),
  reviews: new Map(),

  // API에서 받은 팀 목록을 저장하는 액션
  setTeams: (teamsData) => set({ teams: teamsData }),

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.open);
      next.has(id) ? next.delete(id) : next.add(id);
      return { open: next };
    }),

  deleteMember: (teamId, memberId) => {
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              memberCount: team.memberCount > 0 ? team.memberCount - 1 : 0,
              members: team.members.filter((mem) => mem.userId !== memberId),
            }
          : team
      ),
    }));
  },

  openReview: (team, member) =>
    set((state) => {
      const key = `${team.id}_${member.userId}`;
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
      const { team, member } = state.reviewTarget;
      const key = `${team.id}_${member.userId}`;

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
        const key = `${team.id}_${member.userId}`;

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
