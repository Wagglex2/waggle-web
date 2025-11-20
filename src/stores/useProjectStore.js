import { create } from 'zustand';

const useProjectStore = create((set) => ({
  selectedPurpose: "전체",
  hasSelectedPurpose: false,
  selectedTechs: [],
  selectedPositions: [],
  currentPage: 1,

  setPurpose: (purpose) => set((state) => {
    const isSame = state.hasSelectedPurpose && state.selectedPurpose === purpose;
    return {
      selectedPurpose: isSame ? "전체" : purpose,
      hasSelectedPurpose: !isSame,
      currentPage: 1 
    };
  }),

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

  togglePosition: (position) => set((state) => {
    const isSelected = state.selectedPositions.includes(position);
    const newPositions = isSelected
      ? state.selectedPositions.filter((p) => p !== position)
      : [...state.selectedPositions, position];

    return {
      selectedPositions: newPositions,
      currentPage: 1
    };
  }),

  setPage: (pageNumber) => set({ currentPage: pageNumber }),

  reset: () => set({
    selectedPurpose: "전체",
    hasSelectedPurpose: false,
    selectedTechs: [],
    selectedPositions: [],
    currentPage: 1,
  }),
}));

export default useProjectStore;