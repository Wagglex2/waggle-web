import { create } from 'zustand';

export const useTeamStore = create((set) => ({
  teams: [],
  open: new Set(),
  reviewedMembers: new Set(),
  reviews: new Map(),
  hoveredMember: null,
  reviewTarget: null,
  reviewText: '',
  currentUserNickname: null,
  currentReviewId: null,

  setCurrentUserNickname: (nickname) => set({ currentUserNickname: nickname }),

  setTeams: (teams) => set({ teams }),

  toggle: (id) =>
    set((state) => {
      const newOpen = new Set(state.open);
      if (newOpen.has(id)) {
        newOpen.delete(id);
      } else {
        newOpen.add(id);
      }
      return { open: newOpen };
    }),

  setHoveredMember: (member) => set({ hoveredMember: member }),

  deleteMember: (teamId, memberId) =>
    set((state) => ({
      teams: state.teams.map((team) =>
        team.id === teamId
          ? {
              ...team,
              members: team.members.filter((m) => String(m.userId) !== String(memberId)),
              memberCount: team.memberCount - 1,
            }
          : team
      ),
    })),

  openReview: (team, member) =>
    set((state) => {
      const key = `${team.id}_${member.userId}`;
      const savedData = state.reviews.get(key) || { content: '', reviewId: null };
      return {
        reviewTarget: { team, member },
        reviewText: savedData.content,
        currentReviewId: savedData.reviewId,
      };
    }),

  closeReview: () =>
    set({
      reviewTarget: null,
      reviewText: '',
      currentReviewId: null,
    }),

  setReviewText: (text) => set({ reviewText: text }),

  saveReview: (newReviewId) =>
    set((state) => {
      if (!state.reviewTarget) return state;

      const { team, member } = state.reviewTarget;
      const key = `${team.id}_${member.userId}`;

      const newReviewedMembers = new Set(state.reviewedMembers);
      newReviewedMembers.add(key);

      const newReviews = new Map(state.reviews);
      newReviews.set(key, {
        content: state.reviewText,
        reviewId: newReviewId || state.currentReviewId,
      });

      return {
        reviewedMembers: newReviewedMembers,
        reviews: newReviews,
        reviewTarget: null,
        reviewText: '',
        currentReviewId: null,
      };
    }),

  deleteReview: () =>
    set((state) => {
      if (!state.reviewTarget) return state;

      const { team, member } = state.reviewTarget;
      const key = `${team.id}_${member.userId}`;

      const newReviewedMembers = new Set(state.reviewedMembers);
      newReviewedMembers.delete(key);

      const newReviews = new Map(state.reviews);
      newReviews.delete(key);

      return {
        reviewedMembers: newReviewedMembers,
        reviews: newReviews,
        reviewTarget: null,
        reviewText: '',
        currentReviewId: null,
      };
    }),
}));
