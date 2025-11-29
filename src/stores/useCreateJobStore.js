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

  // 공고 수정용
  updateFromProjectResponse: (res) =>
    set({
      title: res.title,
      content: res.content,
      purpose: res.purpose,
      meetingType: res.meetingType.name,
      authorPosition: res.authorPosition,
      projectPositions: res.positions.map((item) => ({
        position: item.position.name,
        maxParticipants: item.participantInfo.maxParticipants,
      })),
      techStack: res.skills,
      grades: res.grades.map((item) => ({
        grade: item,
      })),
      startDate: res.period.startDate,
      endDate: res.period.endDate,
      deadline: res.deadline.split(' ')[0],
    }),

  updateFromHomeworkResponse: (res) =>
    set({
      title: res.title,
      content: res.content,
      maxParticipants: res.participants.maxParticipants,
      grades: res.grades.map((item) => ({
        grade: item,
      })),
      department: res.department,
      lecture: res.lecture,
      lectureCode: res.lectureCode,
      deadline: res.deadline.split(' ')[0],
    }),

  updateFromStudyResponse: (res) =>
    set({
      title: res.title,
      content: res.content,
      techStack: res.skills,
      startDate: res.period.startDate,
      endDate: res.period.endDate,
      maxParticipants: res.participants.maxParticipants,
      deadline: res.deadline.split(' ')[0],
    }),

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
