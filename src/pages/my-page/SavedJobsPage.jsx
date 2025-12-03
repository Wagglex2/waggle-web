/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import ProjectCard from "@/components/card/ProjectCard";
import HwCard from "@/components/card/HwCard";
import StudyCard from "@/components/card/StudyCard";
import ToggleSwitch from "@/components/common/ToggleSwitch"; 
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { colors } from "@/styles/theme";
import useSavedJobsStore from "@/stores/useSavedJobsStore";
import api from '@/api/api'; 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const cardHeight = 260;
const rowGap = 18;
const gridMinHeight = (cardHeight * 3) + (rowGap * 2);

const pageStyles = {
  wrap: css`padding: 24px 32px; color: ${colors.text}; font-family: 'nanumR', 'NanumSquareRound', sans-serif;`,
  contentContainer: css`max-width: 1100px; margin: 0 auto;`, 
  title: css`margin: 40px 0 24px; font-size: 22px; font-family: 'nanumB', 'NanumSquareRound', sans-serif;`,
  headerContainer: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    height: 40px;
  `,
  tabs: css`display: flex; gap: 8px;`,
  tabBtn: (active) => css`padding: 0 16px; height: 33px; border-radius: 10px; border: 1px solid #eee6d6; background: ${active ? '#FEF1B2' : '#fff'}; cursor: pointer; font-family: 'nanumB', 'NanumSquareRound', sans-serif; &:hover { background: ${active ? '' : '#fcfbf8'}; }`,
  
  gridContainer: css`
    display: grid; 
    grid-template-columns: repeat(3, 1fr);
    gap: ${rowGap}px; 
    justify-content: start;
    min-height: ${gridMinHeight}px;
    align-content: start;
  `,
  
  toggleContainer: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
  `,
  toggleText: css`
    color: ${colors.gray[300]};
    font-size: 14px;
    font-family: 'nanumR';
  `,
};

const TECH_ICON_MAP = {
  'C++': 'CPP', 'C#': 'CSHARP'
};

export default function SavedJobsPage() {
  const itemsPerPage = 9;
  
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    tab, showClosed, currentPage, 
    setTab, toggleShowClosed, setPage, reset 
  } = useSavedJobsStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handleToggle = (toggled) => {
    toggleShowClosed(toggled);
    setPage(1);
  };
  
  const handleTabChange = (newTab) => {
    setItems([]); 
    setTab(newTab);
    setPage(1);
  };

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchSavedJobs = async () => {
    setIsLoading(true);
    try {
      let endpoint = '';
      if (tab === '프로젝트') endpoint = '/api/v1/projects/bookmarks';
      else if (tab === '과제') endpoint = '/api/v1/assignments/bookmarks';
      else if (tab === '스터디') endpoint = '/api/v1/studies/bookmarks';

      const params = {
        page: currentPage - 1,
        size: itemsPerPage,
      };

      if (showClosed) {
        params.status = 'CLOSED';
      }

      const response = await api.get(endpoint, { params });
      const content = response.data.data?.content || [];
      const totalPageCount = response.data.data?.page?.totalPages || response.data.data?.totalPages || 0;

      const extractValue = (data) => {
        if (!data) return null;
        if (typeof data === 'object') return data.desc || data.name;
        return data;
      };

      const normalizeTech = (tech) => {
        if (!tech) return "";
        let rawName = (typeof tech === 'object' ? tech.name : tech) || "";
        if (typeof rawName !== 'string') return "";
        
        rawName = rawName.toString().toUpperCase(); 
        if (TECH_ICON_MAP[rawName]) return TECH_ICON_MAP[rawName];
        return rawName.replace(/\s+/g, '_'); 
      };

      const mappedItems = content.map(item => {
        const baseItem = {
          id: item.id, 
          title: item.title,
          deadline: item.deadline,
          author: item.authorNickname || "익명",
          purposeTag: extractValue(item.category) || extractValue(item.purpose) || "기타",
          status: extractValue(item.status) || "RECRUITING",
          
          bookmarked: true, 
          bookmarkId: item.bookmarkId, 
        };

        if (tab === '프로젝트') {
          return {
            ...baseItem,
            methodTag: extractValue(item.meetingType) || "미정",
            positions: item.positions ? item.positions.map(extractValue) : [],
            techStack: item.skills ? item.skills.map(normalizeTech) : [],
          };
        } else if (tab === '과제') {
          return {
            ...baseItem,
            grade: item.grade ? `${item.grade}학년` : "학년 무관",
            department: item.department || "전공 무관",
            subjects: item.lecture ? [item.lecture] : (item.subjects || []),
          };
        } else if (tab === '스터디') {
          return {
            ...baseItem,
            methodTag: extractValue(item.meetingType) || "미정", 
            techStack: item.skills ? item.skills.map(normalizeTech) : [],
          };
        }
        return baseItem;
      });

      setItems(mappedItems);
      setTotalPages(totalPageCount);

    } catch (error) {
      console.error("찜 목록 불러오기 실패:", error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [tab, currentPage, showClosed]);


  const handleUnlike = async (id) => {
    const targetItem = items.find(item => item.id === id);
    
    if (!targetItem || !targetItem.bookmarkId) {
        console.error("취소할 bookmarkId를 찾을 수 없습니다.");
        return;
    }

    if (!window.confirm("찜을 취소하시겠습니까?")) return;

    try {
      await api.delete(`/api/v1/bookmarks/${targetItem.bookmarkId}`);
      
      alert("찜이 취소되었습니다.");
      fetchSavedJobs(); 

    } catch (error) {
      console.error("찜 취소 실패:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const renderCard = (item) => {
    if (tab === '프로젝트') {
      return <ProjectCard key={item.id} project={item} onUnlike={() => handleUnlike(item.id)} />;
    } else if (tab === '과제') {
      return <HwCard key={item.id} project={item} onUnlike={() => handleUnlike(item.id)} />;
    } else if (tab === '스터디') {
      return <StudyCard key={item.id} project={item} onUnlike={() => handleUnlike(item.id)} />;
    }
    return null;
  };

  return (
    <div css={pageStyles.wrap}>
      <div css={pageStyles.contentContainer}>
        <h2 css={pageStyles.title}>❤️ 찜한 공고</h2>
        
        <div css={pageStyles.headerContainer}>
          <div css={pageStyles.tabs}>
            <button css={pageStyles.tabBtn(tab === '프로젝트')} onClick={() => handleTabChange('프로젝트')}>프로젝트</button>
            <button css={pageStyles.tabBtn(tab === '과제')} onClick={() => handleTabChange('과제')}>과제</button>
            <button css={pageStyles.tabBtn(tab === '스터디')} onClick={() => handleTabChange('스터디')}>스터디</button>
          </div>
          
          <div css={pageStyles.toggleContainer}>
            <span css={pageStyles.toggleText}>마감된 공고만</span>
            <ToggleSwitch isToggled={showClosed} onToggle={handleToggle} />
          </div>
        </div>

        {isLoading ? (
           <EmptyStateMessage message="데이터를 불러오는 중입니다." />
        ) : items.length === 0 ? (
          <EmptyStateMessage message="찜한 공고가 없습니다." />
        ) : (
          <div css={pageStyles.gridContainer}>
            {items.map((item) => renderCard(item))}
          </div>
        )}
        
        {items.length > 0 && totalPages > 0 && (
          <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        )}
      </div>
    </div>
  );
}