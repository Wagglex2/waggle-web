import { create } from 'zustand';

const useApplicationFormStore = create((set) => ({
  meetingType: null,
  grade: null,
  position: null,
  techStack: [],
  description: '',

  setMeetingType: (value) => set({ meetingType: value }),

  setGrade: (option) => set({ grade: option }),

  setPosition: (option) => set({ position: option }),

  setTechStack: (updateFn) =>
    set((state) => ({
      techStack: typeof updateFn === 'function' ? updateFn(state.techStack) : updateFn,
    })),

  setDescription: (text) => set({ description: text }),

  setApplyBtnState: (value) => set({ applyBtnState: value }),

  reset: () =>
    set({
      meetingType: null,
      grade: null,
      position: null,
      techStack: [],
      description: '',
    }),
}));

export default useApplicationFormStore;
