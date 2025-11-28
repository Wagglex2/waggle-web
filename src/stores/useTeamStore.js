// useTeamStore.js 파일 (가정)
import { create } from 'zustand';

export const currentUserId = 1; // 예시 ID

export const useTeamStore = create((set) => ({
  teams: [],
  open: new Set(),
  reviewedMembers: new Set(),
  hoveredMember: null, // 💡 새 상태 추가
  reviewModalData: null,

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

  // 💡 새 액션 추가
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
  openReview: (team, member) => set({ reviewModalData: { team, member } }),
  closeReview: () => set({ reviewModalData: null }),
  markAsReviewed: (teamId, memberId) =>
    set((state) => {
      const newReviewedMembers = new Set(state.reviewedMembers);
      newReviewedMembers.add(`${teamId}_${memberId}`);
      return { reviewedMembers: newReviewedMembers };
    }),
}));
