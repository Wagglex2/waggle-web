import { create } from 'zustand';

const useStudyStore = create((set) => ({
  selectedTechs: [],
  currentPage: 1,

  toggleTech: (tech) => set((state) => {
    const isSelected = state.selectedTechs.includes(tech);
    const newTechs = isSelected
      ? state.selectedTechs.filter((t) => t !== tech)
      : [...state.selectedTechs, tech];
    
    return {
      selectedTechs: newTechs,
      currentPage: 1
    };
  }),

  setPage: (pageNumber) => set({ currentPage: pageNumber }),

  reset: () => set({
    selectedTechs: [],
    currentPage: 1,
  }),
}));

export default useStudyStore;