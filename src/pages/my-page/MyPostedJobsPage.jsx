/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useMemo, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { usePostedJobsStore } from '../../stores/usePostedJobsStore';
import ApplicantModal from './components/ApplicationModal';
import PostedJobCard from './components/PostedJobCard';
import UserProfileModal from './components/UserProfileModal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  primary: '#FFCC00',
};

const MyPostedJobsPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('프로젝트');
  const [open, setOpen] = useState(() => new Set());
  const [appModal, setAppModal] = useState(null);
  const [profileModal, setProfileModal] = useState({ isOpen: false, user: null });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { posts, loading, error, fetchAllPosts, deletePost, acceptApplicant, rejectApplicant } =
    usePostedJobsStore();

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  useEffect(() => {
    setOpen(new Set());
    setCurrentPage(1);
  }, [tab]);

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEdit = (postId, postType) => {
    const routes = {
      프로젝트: `/edit-project/${postId}`,
      과제: `/edit-hw/${postId}`,
      스터디: `/edit-study/${postId}`,
    };

    const target = routes[postType];
    if (target) {
      navigate(target, {
        state: {
          editMode: true,
          postId: postId,
        },
      });
    } else {
      alert('수정 페이지 경로를 찾을 수 없습니다.');
    }
  };

  const handleDelete = async (postId, postType) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deletePost(postId, postType);
    }
  };

  const handleReject = async (postId, applicantId) => {
    if (appModal) setAppModal(null);
    if (window.confirm('지원자를 거절하시겠습니까?')) {
      await rejectApplicant(postId, applicantId);
    }
  };

  const handleAccept = async (postId, applicantId) => {
    const success = await acceptApplicant(postId, applicantId);
    if (success && appModal) {
      setAppModal(null);
    }
  };

  const handleViewApplication = (applicant, postType) => {
    setAppModal({ ...applicant, postType });
  };

  const handleViewProfile = (user) => {
    setProfileModal({ isOpen: true, user });
  };

  const closeModal = () => setAppModal(null);
  const closeProfileModal = () => setProfileModal({ isOpen: false, user: null });

  const filteredPosts = useMemo(() => posts.filter((p) => p.type === tab), [posts, tab]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const findPostIdByApplicantId = (applicantId) => {
    const post = posts.find((p) => p.applicants?.some((a) => a.id === applicantId));
    return post ? post.id : null;
  };

  const handleModalReject = () => {
    if (!appModal) return;
    const postId = findPostIdByApplicantId(appModal.id);
    if (postId) {
      handleReject(postId, appModal.id);
    }
  };

  const handleModalAccept = () => {
    if (!appModal) return;
    const postId = findPostIdByApplicantId(appModal.id);
    if (postId) {
      handleAccept(postId, appModal.id);
    }
  };

  return (
    <div css={wrap}>
      <div css={contentContainer}>
        <h2 css={title}>📝 내가 올린 공고</h2>
        <div css={tabs}>
          <button css={tabButton(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>
            프로젝트
          </button>
          <button css={tabButton(tab === '과제')} onClick={() => setTab('과제')}>
            과제
          </button>
          <button css={tabButton(tab === '스터디')} onClick={() => setTab('스터디')}>
            스터디
          </button>
        </div>

        {loading && <div css={empty}>데이터를 불러오는 중...</div>}
        {error && <div css={empty}>오류: {error}</div>}
        {!loading && !error && filteredPosts.length === 0 && (
          <div css={empty}>해당 카테고리의 공고가 없어요.</div>
        )}

        {!loading && !error && (
          <>
            <div css={postListWrapper}>
              {paginatedPosts.map((post) => {
                const isOpen = open.has(post.id);

                return (
                  <PostedJobCard
                    key={post.id}
                    post={post}
                    isOpen={isOpen}
                    onToggle={() => toggle(post.id)}
                    onEdit={() => handleEdit(post.id, post.type)}
                    onDelete={() => handleDelete(post.id, post.type)}
                    onRejectApplicant={(applicantId) => handleReject(post.id, applicantId)}
                    onViewApplicant={(applicant) => handleViewApplication(applicant, post.type)}
                    onViewProfile={handleViewProfile}
                  />
                );
              })}
            </div>

            {totalPages > 0 && (
              <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontFamily: 'nanumR, sans-serif',
                      color: '#888',
                      borderRadius: '50%',
                      margin: '0 2px',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                      '&.Mui-selected': {
                        backgroundColor: '#E0E0E0',
                        color: '#333',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#d0d0d0',
                        },
                      },
                    },
                    '& .MuiPaginationItem-icon': {
                      fontSize: '1.2rem',
                    },
                  }}
                />
              </Stack>
            )}
          </>
        )}
      </div>

      <ApplicantModal
        modalData={appModal}
        onClose={closeModal}
        onAcceptClick={handleModalAccept}
        onRejectClick={handleModalReject}
      />
    </div>
  );
};

export default MyPostedJobsPage;

const wrap = css`
  padding: 24px 32px;
  color: ${colors.text};
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
`;

const contentContainer = css`
  max-width: 1100px;
  margin: 0 auto;
`;

const title = css`
  margin: 40px 0 24px;
  font-size: 22px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const tabs = css`
  display: flex;
  gap: 8px;
  margin: 0 0 16px;
`;

const tabButton = (isActive) => css`
  width: 90px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  background: ${isActive ? colors.tabActive : '#fff'};
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: ${isActive ? colors.tabActive : colors.btnHover};
  }
`;

const empty = css`
  border: 1px dashed ${colors.border};
  border-radius: 12px;
  padding: 24px;
  color: ${colors.muted};
  text-align: center;
`;

const postListWrapper = css`
  min-height: 500px;
  display: flex;
  flex-direction: column;
`;
