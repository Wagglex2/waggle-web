import { create } from 'zustand';

const dummyProjects = [
    {
    id: 2,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드'],
    techStack: ['JAVASCRIPT', 'NEXTJS', 'NOTION'],
    author: '솔랑솔랑',
    },
    {
    id: 4,
    purposeTag: '토이프로젝트',
    methodTag: '온라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['CS', 'UNITY'],
    author: '솔랑솔랑',
    },
    {
    id: 13,
    purposeTag: '사이드프로젝트',
    methodTag: '오프라인',
    deadline: '2025.12.15까지',
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    positions: ['기획', '디자인', '프론트엔드', '백엔드'],
    techStack: ['HTML', 'VUE'],
    author: '솔랑솔랑',
  },

];
const dummyHomeworks = [
    { id: 6, purposeTag: "과제", department: "컴퓨터공학과", deadline: "2025.10.31까지", title: "운영체제 과제 같이 할 분 구해요", subjects: ["운영체제(1234)"], author: "솔랑솔랑" },
    { id: 7, purposeTag: "과제", department: "컴퓨터공학과", deadline: "2025.11.15까지", title: "운영체제 과제 같이 할 분 구해요", subjects: ["운영체제(1234)"], author: "솔랑솔랑" },
];
const dummyStudies = [
    { id: 7, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["CSS", "REACT", "FIGMA"], author: "솔랑솔랑" },
    { id: 8, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["CPP", "REACT", "FIGMA"], author: "솔랑솔랑" },
    { id: 9, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["CS", "REACT", "FIGMA"], author: "솔랑솔랑" },
    { id: 10, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["HTML", "REACT", "FIGMA"], author: "솔랑솔랑" },
    { id: 11, purposeTag: "스터디", deadline: "2025.12.15까지", title: "공부하자공부하자공부하자공부하자공부하자공부하자", techStack: ["VUE", "REACT", "FIGMA"], author: "솔랑솔랑" },
];

const useSavedJobsStore = create((set) => ({
  projects: dummyProjects,
  homeworks: dummyHomeworks,
  studies: dummyStudies,

  tab: '프로젝트',
  showClosed: false,
  currentPage: 1,

  setTab: (newTab) => set({ tab: newTab, currentPage: 1 }),
  toggleShowClosed: (toggled) => set({ showClosed: toggled, currentPage: 1 }),
  setPage: (pageNumber) => set({ currentPage: pageNumber }),
  unlike: (id, category) => set((state) => {
    if (category === '프로젝트') return { projects: state.projects.filter(p => p.id !== id) };
    if (category === '과제') return { homeworks: state.homeworks.filter(h => h.id !== id) };
    if (category === '스터디') return { studies: state.studies.filter(s => s.id !== id) };
    return state;
  }),
  reset: () => set({
    tab: '프로젝트',
    showClosed: false,
    currentPage: 1,
  }),
}));

export default useSavedJobsStore;