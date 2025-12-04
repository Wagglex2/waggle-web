import { create } from 'zustand';
import api from '@/api/api';

const typeMap = {
  PROJECT: '프로젝트',
  ASSIGNMENT: '과제',
  STUDY: '스터디',
};

const reverseTypeMap = {
  프로젝트: 'projects',
  과제: 'assignments',
  스터디: 'studies',
};

export const usePostedJobsStore = create((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  fetchAllPosts: async () => {
    set({ loading: true, error: null });
    try {
      const requests = [
        { type: '프로젝트', promise: api.get('/api/v1/projects/me?page=0&size=100') },
        { type: '과제', promise: api.get('/api/v1/assignments/me?page=0&size=100') },
        { type: '스터디', promise: api.get('/api/v1/studies/me?page=0&size=100') },
      ];

      const results = await Promise.allSettled(
        requests.map((req) => req.promise.then((res) => ({ type: req.type, data: res.data })))
      );

      const allPosts = [];

      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          const { type, data } = result.value;

          if (data.code === 'SUCCESS') {
            const list = data.data.content || [];

            const mapped = list.map((item) => ({
              id: item.recruitmentId || item.id,
              title: item.title,
              deadline: item.deadline,
              type: type,
              originalType: item.category,
              applicants: (item.applications || []).map((app) => ({
                id: app.applicationId,
                applicantId: app.applicantId,
                name: app.nickname,
                applicationDate: app.appliedAt,
                mode: app.meetingType?.desc || app.meetingType,
                position: app.position?.desc || app.position,
                status: app.status,
                content: app.content,
                grade: app.grade,
                skills: app.skills,
              })),
            }));
            allPosts.push(...mapped);
          }
        } else {
          console.error(`Failed to fetch ${result.reason}`);
        }
      });

      set({ posts: allPosts, loading: false });
    } catch (error) {
      console.error('공고 불러오기 실패:', error);
      set({ error: '데이터를 불러오는데 실패했습니다.', loading: false });
    }
  },

  deletePost: async (postId, type) => {
    try {
      const endpointPrefix = reverseTypeMap[type];

      if (!endpointPrefix) {
        throw new Error('잘못된 공고 타입입니다.');
      }

      const response = await api.delete(`/api/v1/${endpointPrefix}/${postId}`);

      if (response.data.code === 'SUCCESS') {
        set((state) => ({
          posts: state.posts.filter((p) => p.id !== postId),
        }));
        alert('공고가 삭제되었습니다.');
      } else {
        alert(response.data.message || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  },

  acceptApplicant: async (postId, applicationId) => {
    try {
      const response = await api.post(`/api/v1/applications/${applicationId}/accept`);

      if (response.data.code === 'SUCCESS') {
        alert('수락 처리되었습니다.');
        get().fetchAllPosts();
        return true;
      } else {
        alert(response.data.message || '수락 처리에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error(error);
      alert('수락 처리 중 오류가 발생했습니다.');
      return false;
    }
  },

  rejectApplicant: async (postId, applicationId) => {
    try {
      const response = await api.post(`/api/v1/applications/${applicationId}/reject`);

      if (response.data.code === 'SUCCESS') {
        alert('거절 처리되었습니다.');
        get().fetchAllPosts();
        return true;
      } else {
        alert(response.data.message || '거절 처리에 실패했습니다.');
        return false;
      }
    } catch (error) {
      console.error(error);
      alert('거절 처리 중 오류가 발생했습니다.');

      return false;
    }
  },
}));
