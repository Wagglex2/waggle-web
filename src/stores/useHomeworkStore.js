import { create } from 'zustand';

const useHomeworkStore = create((set) => ({
  selectedGrade: "전체",
  hasSelectedGrade: false,
  currentPage: 1,

  setGrade: (grade) => set((state) => {
    const isSame = state.hasSelectedGrade && state.selectedGrade === grade;
    return {
      selectedGrade: isSame ? "전체" : grade,
      hasSelectedGrade: !isSame,
      currentPage: 1 
    };
  }),

  setPage: (pageNumber) => set({ currentPage: pageNumber }),

  reset: () => set({
    selectedGrade: "전체",
    hasSelectedGrade: false,
    currentPage: 1,
  }),
}));

export default useHomeworkStore;