import { create } from 'zustand';

const useSearchStore = create((set) => ({
  selectedGrade: "전체",
  hasSelectedGrade: false,

  selectedStudyTechs: [],

  selectedProjectPurpose: "전체",
  hasSelectedProjectPurpose: false,
  selectedProjectTechs: [],
  selectedProjectPositions: [],

  currentPage: 1,

  setGrade: (grade) => set((state) => {
    const isSame = state.hasSelectedGrade && state.selectedGrade === grade;
    return {
      selectedGrade: isSame ? "전체" : grade,
      hasSelectedGrade: !isSame,
      currentPage: 1
    };
  }),

  toggleStudyTech: (tech) => set((state) => {
    const isSelected = state.selectedStudyTechs.includes(tech);
    const newTechs = isSelected
      ? state.selectedStudyTechs.filter((t) => t !== tech)
      : [...state.selectedStudyTechs, tech];
    return { selectedStudyTechs: newTechs, currentPage: 1 };
  }),

  setProjectPurpose: (purpose) => set((state) => {
    const isSame = state.hasSelectedProjectPurpose && state.selectedProjectPurpose === purpose;
    return {
      selectedProjectPurpose: isSame ? "전체" : purpose,
      hasSelectedProjectPurpose: !isSame,
      currentPage: 1
    };
  }),

  toggleProjectTech: (tech) => set((state) => {
    const isSelected = state.selectedProjectTechs.includes(tech);
    const newTechs = isSelected
      ? state.selectedProjectTechs.filter((t) => t !== tech)
      : [...state.selectedProjectTechs, tech];
    return { selectedProjectTechs: newTechs, currentPage: 1 };
  }),

  toggleProjectPosition: (position) => set((state) => {
    const isSelected = state.selectedProjectPositions.includes(position);
    const newPositions = isSelected
      ? state.selectedProjectPositions.filter((p) => p !== position)
      : [...state.selectedProjectPositions, position];
    return { selectedProjectPositions: newPositions, currentPage: 1 };
  }),

  setPage: (pageNumber) => set({ currentPage: pageNumber }),

  reset: () => set({
    selectedGrade: "전체",
    hasSelectedGrade: false,
    selectedStudyTechs: [],
    selectedProjectPurpose: "전체",
    hasSelectedProjectPurpose: false,
    selectedProjectTechs: [],
    selectedProjectPositions: [],
    currentPage: 1,
  }),
}));

export default useSearchStore;