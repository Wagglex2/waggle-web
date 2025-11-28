import { create } from 'zustand';

const useCreateJobStore = create((set) => ({
  title: '',
  content: '',
  purpose: null,
  meetingType: '',
  projectPositions: [], // 프로젝트 포지션 + 포지션별 인원수
  maxParticipants: '', // 과제, 스터디 포지션 멤버 인원수
  techStack: [],
  grades: [],
  startDate: '',
  endDate: '',
  deadline: '',
  department: '',
  lecture: '',
  lectureCode: '',
  authorPosition: null,

  setTitle: (text) => set({ title: text }),

  setContent: (text) => set({ content: text }),

  setPurpose: (option) => set({ purpose: option }),

  setMeetingType: (value) => set({ meetingType: value }),

  setDeadline: (value) => set({ deadline: value }),

  setDepartment: (value) => set({ department: value }),

  setLecture: (value) => set({ lecture: value }),

  setLectureCode: (value) => set({ lectureCode: value }),

  setGrades: (updateFn) =>
    set((state) => ({
      grades: typeof updateFn === 'function' ? updateFn(state.grades) : updateFn,
    })),

  setMaxParticipants: (value) => set({ maxParticipants: value }),

  setStartDate: (value) => set({ startDate: value }),

  setEndDate: (value) => set({ endDate: value }),

  setTechStack: (updateFn) =>
    set((state) => ({
      techStack: typeof updateFn === 'function' ? updateFn(state.techStack) : updateFn,
    })),

  setAuthorPosition: (option) => set({ authorPosition: option }),

  setProjectPositions: (updateFn) =>
    set((state) => ({
      projectPositions:
        typeof updateFn === 'function' ? updateFn(state.projectPositions) : updateFn,
    })),

  reset: () =>
    set({
      title: '',
      content: '',
      purpose: '',
      meetingType: '',
      projectPositions: [],
      maxParticipants: '',
      techStack: [],
      grades: [],
      startDate: '',
      endDate: '',
      deadline: '',
      department: '',
      lecture: '',
      lectureCode: '',
      authorPosition: '',
    }),
}));

export default useCreateJobStore;
