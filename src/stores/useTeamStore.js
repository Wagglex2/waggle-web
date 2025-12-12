import { create } from 'zustand';
import api from '@/api/api';

export const useTeamStore = create((set, get) => ({
  teams: [],
  open: new Set(),
  reviewedMembers: new Set(),
  reviews: new Map(),
  hoveredMember: null,
  reviewTarget: null,
  reviewText: '',

  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  setTeams: (teams) => set({ teams }),

  fetchWrittenReviews: async () => {
    try {
      const res = await api.get('/api/v1/reviews/me/written', {
        params: { page: 0, size: 100, sort: 'createdAt,DESC' },
      });

      const writtenReviews = res.data.data.content;

      set((state) => {
        const newReviewedMembers = new Set(state.reviewedMembers);
        const newReviews = new Map(state.reviews);

        writtenReviews.forEach((review) => {
          const key = `${review.teamId}_${review.revieweeId}`;
          newReviewedMembers.add(key);
          newReviews.set(key, {
            id: review.reviewId,
            content: review.content,
          });
        });

        return {
          reviewedMembers: newReviewedMembers,
          reviews: newReviews,
        };
      });
    } catch (error) {
      console.error(error);
    }
  },

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
      const existingReview = state.reviews.get(key);
      return {
        reviewTarget: { team, member },
        reviewText: existingReview ? existingReview.content : '',
      };
    }),

  closeReview: () =>
    set({
      reviewTarget: null,
      reviewText: '',
    }),

  setReviewText: (text) => set({ reviewText: text }),

  saveReview: (savedReviewId) =>
    set((state) => {
      if (!state.reviewTarget) return state;

      const { team, member } = state.reviewTarget;
      const key = `${team.id}_${member.userId}`;

      const newReviewedMembers = new Set(state.reviewedMembers);
      newReviewedMembers.add(key);

      const newReviews = new Map(state.reviews);
      newReviews.set(key, { id: savedReviewId, content: state.reviewText });

      return {
        reviewedMembers: newReviewedMembers,
        reviews: newReviews,
        reviewTarget: null,
        reviewText: '',
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
      };
    }),
}));
