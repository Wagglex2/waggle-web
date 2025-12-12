/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useTeamStore } from '../../stores/useTeamStore';
import TeamCard from './components/TeamCard';
import ReviewModal from './components/ReviewModal';
import UserProfileModal from './components/UserProfileModal';
import api from '@/api/api';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const TAB_MAP = {
  프로젝트: 'PROJECT',
  과제: 'ASSIGNMENT',
  스터디: 'STUDY',
};

const MyTeamPage = () => {
  const [tab, setTab] = useState('프로젝트');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 5;

  const {
    teams,
    setTeams,
    currentUser,
    setCurrentUser,
    hoveredMember,
    setHoveredMember,
    fetchWrittenReviews,
  } = useTeamStore();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get('/api/v1/users/me');
        const userData = response.data.data || response.data;
        if (userData) {
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, [setCurrentUser]);

  useEffect(() => {
    fetchWrittenReviews();
  }, [fetchWrittenReviews]);

  useEffect(() => {
    setCurrentPage(1);
  }, [tab]);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiCategory = TAB_MAP[tab];
      if (!apiCategory) return;

      setIsLoading(true);
      try {
        const response = await api.get(
          `/api/v1/teams/me?page=${currentPage - 1}&size=${itemsPerPage}&category=${apiCategory}`
        );
        const data = response.data.data;
        setTeams(data.content || []);
        setTotalPages(data.page?.totalPages || 0);
      } catch (error) {
        setTeams([]);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [tab, currentPage, setTeams]);

  const handleCloseModal = () => {
    setHoveredMember(null);
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenMyReviews = () => {
    if (currentUser) {
      setHoveredMember(currentUser);
    }
  };

  return (
    <div css={wrap}>
      <div css={contentContainer}>
        <div css={headerArea}>
          <h2 css={title}>🧑‍🤝‍🧑 내 팀 관리</h2>
          <button css={reviewsBtn} onClick={handleOpenMyReviews}>
            💌 받은 리뷰 보기
          </button>
        </div>

        <div css={tabs}>
          <button css={tabBtn(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>
            프로젝트
          </button>
          <button css={tabBtn(tab === '과제')} onClick={() => setTab('과제')}>
            과제
          </button>
          <button css={tabBtn(tab === '스터디')} onClick={() => setTab('스터디')}>
            스터디
          </button>
        </div>

        {isLoading ? (
          <div css={empty}>데이터를 불러오는 중입니다...</div>
        ) : teams.length === 0 ? (
          <div css={empty}>해당 카테고리의 팀이 없어요.</div>
        ) : (
          <>
            <div css={teamListWrapper}>
              {teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
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
                      '&:hover': { backgroundColor: '#f5f5f5' },
                      '&.Mui-selected': {
                        backgroundColor: '#E0E0E0',
                        color: '#333',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#d0d0d0' },
                      },
                    },
                    '& .MuiPaginationItem-icon': { fontSize: '1.2rem' },
                  }}
                />
              </Stack>
            )}
          </>
        )}

        <ReviewModal />

        <UserProfileModal
          isOpen={!!hoveredMember}
          user={hoveredMember}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default MyTeamPage;

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  white: '#fff',
};

const wrap = css`
  padding: 24px 32px;
  color: ${colors.text};
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
`;

const contentContainer = css`
  max-width: 1100px;
  margin: 0 auto;
`;

const headerArea = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0 24px;
`;

const title = css`
  margin: 0;
  font-size: 22px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const reviewsBtn = css`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${colors.border};
  background: ${colors.white};
  color: ${colors.text};
  font-weight: 600;
  cursor: pointer;
  font-family: 'nanumB', sans-serif;
  transition: all 0.2s;

  &:hover {
    background: #ffcc00;
    border-color: #ffcc00;
  }
`;

const tabs = css`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const tabBtn = (active) => css`
  width: 90px;
  height: 33px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  background: ${active ? colors.tabActive : colors.white};
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  &:hover {
    background: ${active ? '' : colors.btnHover};
  }
`;

const empty = css`
  border: 1px dashed ${colors.border};
  border-radius: 12px;
  padding: 24px;
  color: ${colors.muted};
  text-align: center;
`;

const teamListWrapper = css`
  min-height: 500px;
  display: flex;
  flex-direction: column;
`;
