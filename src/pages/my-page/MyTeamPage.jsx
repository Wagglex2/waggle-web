/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useTeamStore } from './useTeamStore';
import TeamCard from './components/TeamCard';
import ReviewModal from './components/ReviewModal';
import api from '@/api/api';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  white: '#fff',
};

const TAB_MAP = {
  프로젝트: 'PROJECT',
  과제: 'ASSIGNMENT',
  스터디: 'STUDY',
};

const MyTeamPage = () => {
  const [tab, setTab] = useState('프로젝트');

  const teams = useTeamStore((state) => state.teams);
  const setTeams = useTeamStore((state) => state.setTeams);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTeams = async () => {
      const apiCategory = TAB_MAP[tab];
      if (!apiCategory) return;

      setIsLoading(true);
      try {
        const response = await api.get(`/api/v1/teams/me?size=5&category=${apiCategory}`);

        const fetchedTeams = response.data.data.content || [];
        console.log('Fetched Teams:', fetchedTeams);
        setTeams(fetchedTeams);
      } catch (error) {
        console.error('팀 데이터 불러오기 실패:', error);
        setTeams([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, [tab, setTeams]);

  return (
    <div css={wrap}>
      <div css={contentContainer}>
        <h2 css={title}>🧑‍🤝‍🧑 내 팀 관리</h2>

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
          teams.map((team) => <TeamCard key={team.id} team={team} />)
        )}

        <ReviewModal />
      </div>
    </div>
  );
};

export default MyTeamPage;

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
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
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
