import { create } from 'zustand';
import api from '@/api/api';

const categoryMap = {
  PROJECT: '프로젝트',
  ASSIGNMENT: '과제',
  STUDY: '스터디',
};

const categoryToEnglish = {
  프로젝트: 'project',
  과제: 'assignment',
  스터디: 'study',
};

const statusMap = {
  SUBMITTED: '대기중',
  ACCEPTED: '수락됨',
  REJECTED: '거절됨',
  CANCELED: '모집취소',
  CLOSED: '모집종료',
};

export const toneByStatus = (s) =>
  s === '대기중'
    ? 'waiting'
    : s === '거절됨'
      ? 'rejected'
      : s === '수락됨'
        ? 'accepted'
        : s === '모집취소'
          ? 'cancelled'
          : 'closed';

function transformApplicationData(apiData, forcedCategory = null) {
  const categoryKey = forcedCategory || apiData.recruitmentTitle?.category;
  const finalCategory = categoryMap[categoryKey] || categoryKey || '기타';

  return {
    id: apiData.applicationId,
    recruitmentId: apiData.recruitmentId,
    category: finalCategory,
    title: apiData.recruitmentTitle,
    due: apiData.recruitmentDeadline,
    status: statusMap[apiData.status?.name] || apiData.status?.desc || '알 수 없음',
    applicant: {
      name: '나',
      mode: apiData.meetingType?.desc || '미정',
      year: apiData.grade ? `${apiData.grade}학년` : '미정',
      position: apiData.position?.desc || '',
      stack: apiData.skills?.map((s) => s.desc).join(', ') || '',
      detail: apiData.content || '',
    },
  };
}

export const useApplicationStore = create((set, get) => ({
  rows: [],
  modalData: null,
  loading: false,
  error: null,

  fetchApplications: async (category = '프로젝트') => {
    set({ loading: true, error: null });

    const apiCategory = categoryToEnglish[category] || category;
    const mapKey = Object.keys(categoryToEnglish).find(
      (key) => categoryToEnglish[key] === apiCategory
    )
      ? Object.keys(categoryMap).find((key) => categoryMap[key] === category)
      : 'PROJECT';

    try {
      const response = await api.get('/api/v1/applications/me', {
        params: {
          category: apiCategory,
          page: 0,
          size: 100,
        },
      });

      if (response.data.code === 'SUCCESS') {
        const applications = response.data.data.content.map((item) =>
          transformApplicationData(item, mapKey || category)
        );
        set({ rows: applications, loading: false });
      } else {
        set({ error: response.data.message, loading: false });
      }
    } catch (error) {
      console.error(error);
      set({
        error: error.response?.data?.message || '지원 목록을 불러오는데 실패했습니다.',
        loading: false,
      });
    }
  },

  fetchAllApplications: async () => {
    set({ loading: true, error: null });

    try {
      const categories = ['PROJECT', 'ASSIGNMENT', 'STUDY'];

      const promises = categories.map((category) =>
        api.get('/api/v1/applications/me', {
          params: { category, page: 0, size: 100 },
        })
      );

      const responses = await Promise.all(promises);

      const allApplications = responses.flatMap((response, index) => {
        if (response.data.code === 'SUCCESS') {
          const currentCategoryKey = categories[index];
          return response.data.data.content.map((item) =>
            transformApplicationData(item, currentCategoryKey)
          );
        }
        return [];
      });

      set({ rows: allApplications, loading: false });
    } catch (error) {
      console.error(error);
      set({
        error: error.response?.data?.message || '지원 목록을 불러오는데 실패했습니다.',
        loading: false,
        rows: [],
      });
    }
  },

  removeRow: async (id) => {
    if (!window.confirm('정말 지원을 취소하시겠습니까?')) {
      return;
    }

    try {
      const response = await api.delete(`/api/v1/applications/${id}`);

      if (response.data.code === 'SUCCESS') {
        set((state) => ({
          rows: state.rows.filter((r) => r.id !== id),
        }));
        alert('지원이 취소되었습니다.');
      } else {
        alert(response.data.message || '지원 취소에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || '지원 취소에 실패했습니다.');
    }
  },

  openModal: (data) => set({ modalData: data }),
  closeModal: () => set({ modalData: null }),
}));
