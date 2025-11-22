import { create } from 'zustand';
import api from '@/api/api';

const categoryMap = {
  PROJECT: '프로젝트',
  ASSIGNMENT: '과제',
  STUDY: '스터디',
};

const categoryToApiEndpoint = {
  프로젝트: 'projects',
  과제: 'assignments',
  스터디: 'studies',
};

const statusMap = {
  SUBMITTED: '대기중',
  ACCEPTED: '수락됨',
  REJECTED: '거절됨',
  CANCELED: '모집취소',
  CLOSED: '모집종료',
};

function transformRecruitmentData(recruitment, category) {
  return {
    id: recruitment.recruitmentId,
    title: recruitment.title,
    content: '',
    type: categoryMap[category] || category,
    deadline: recruitment.deadline,
    applicants: (recruitment.applications || []).map((app) => ({
      id: app.applicationId,
      applicantId: app.applicantId,
      name: app.nickname,
      color: getRandomColor(),
      applicationDate: app.appliedAt,
      mode: app.meetingType?.desc || app.meetingType?.name || '미정',
      year: app.grade ? `${app.grade}학년` : '미정',
      position: app.position?.desc || app.position?.name || '',
      stack: app.skills?.map((s) => s.desc || s.name).join(', ') || '',
      detail: app.content || '',
      status: statusMap[app.status?.name] || app.status?.desc || '대기중',
    })),
  };
}

function getRandomColor() {
  const colors = ['#f5c24b', '#c9a7ff', '#8ee7f2', '#ffd482', '#ffa3b8', '#b3e5ff'];
  return colors[Math.floor(Math.random() * colors.length)];
}

export const usePostedJobsStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchAllPosts: async () => {
    set({ loading: true, error: null });

    try {
      const categories = ['프로젝트', '과제', '스터디'];
      const allPosts = [];

      for (const category of categories) {
        const endpoint = categoryToApiEndpoint[category];
        const categoryKey = Object.keys(categoryMap).find((key) => categoryMap[key] === category);

        try {
          const response = await api.get(`/api/v1/${endpoint}/me`, {
            params: {
              page: 0,
              size: 100,
            },
          });

          if (response.data.code === 'SUCCESS') {
            const recruitments = response.data.data.content || [];

            recruitments.forEach((recruitment) => {
              allPosts.push(transformRecruitmentData(recruitment, categoryKey));
            });
          }
        } catch (error) {
          console.error(`${category} 데이터 로드 실패:`, error);
        }
      }

      set({ posts: allPosts, loading: false });
    } catch (error) {
      console.error('전체 공고 목록 로드 실패:', error);
      set({
        error: error.response?.data?.message || '공고 목록을 불러오는데 실패했습니다.',
        loading: false,
        posts: [],
      });
    }
  },

  deletePost: async (postId, postType) => {
    if (!window.confirm('정말 이 공고를 삭제하시겠습니까?')) {
      return false;
    }

    try {
      const endpoint = categoryToApiEndpoint[postType];
      const response = await api.delete(`/api/v1/${endpoint}/${postId}`);

      if (response.data.code === 'SUCCESS') {
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== postId),
        }));
        alert('공고가 삭제되었습니다.');
        return true;
      } else {
        alert(response.data.message || '공고 삭제에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error('공고 삭제 실패:', error);
      alert(error.response?.data?.message || '공고 삭제에 실패했습니다.');
      return false;
    }
  },

  editPost: (postId, postType) => {
    return { postId, postType };
  },

  acceptApplicant: async (postId, applicantId) => {
    try {
      const response = await api.post(`/api/v1/applications/${applicantId}/accept`);

      if (response.data.code === 'SUCCESS') {
        alert('지원을 수락했습니다.');

        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                applicants: post.applicants.filter((app) => app.id !== applicantId),
              };
            }
            return post;
          }),
        }));

        return true;
      } else {
        alert(response.data.message || '지원 수락에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error('지원 수락 실패:', error);
      alert(error.response?.data?.message || '지원 수락에 실패했습니다.');
      return false;
    }
  },

  rejectApplicant: async (postId, applicantId) => {
    if (!window.confirm('정말 이 지원자를 거절하시겠습니까?')) {
      return false;
    }

    try {
      const response = await api.post(`/api/v1/applications/${applicantId}/reject`);

      if (response.data.code === 'SUCCESS') {
        alert('지원을 거절했습니다.');

        set((state) => ({
          posts: state.posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                applicants: post.applicants.filter((app) => app.id !== applicantId),
              };
            }
            return post;
          }),
        }));

        return true;
      } else {
        alert(response.data.message || '지원 거절에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error('지원 거절 실패:', error);
      alert(error.response?.data?.message || '지원 거절에 실패했습니다.');
      return false;
    }
  },
}));
