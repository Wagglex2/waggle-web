/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom"; 
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import StudyCard from "@/components/card/StudyCard";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { useDropdown } from "@/components/filter/useDropdown";
import useStudyStore from "@/stores/useStudyStore";
import api from '@/api/api'; 

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  dropDownButtonStyle,
  ArrowIcon,
  dropdownContainerStyle,
  techDropDownMenuStyle,
  customCheckboxStyle,
  dropDownMenuItemStyle
} from "@/components/filter/dropdownStyles";

const TECH_STACK_LIST = [
  "HTML", "CSS", "JAVASCRIPT", "JAVA", "KOTLIN", "PYTHON", "SWIFT", 
  "C", "CPP", "CSHARP", "TYPESCRIPT", "REACT", "NODE_JS", "EXPRESS", 
  "VUE_JS", "NEXT_JS", "SPRING_BOOT", "DJANGO", "PANDAS", "SCIKIT_LEARN", 
  "PYTORCH", "TENSORFLOW", "FLUTTER", "MYSQL", "REDIS", "MONGODB", 
  "POSTGRESQL", "GIT", "GITHUB", "GITHUB_ACTIONS", "FIGMA", "NOTION", 
  "JIRA", "DOCKER", "UNITY", "UNREAL"
];

const TECH_STACK_DISPLAY_MAP = {
  "HTML": "HTML", "CSS": "CSS", "JAVASCRIPT": "JavaScript", "JAVA": "Java", 
  "KOTLIN": "Kotlin", "PYTHON": "Python", "SWIFT": "Swift", 
  "C": "C", "CPP": "C++", "CSHARP": "C#", "TYPESCRIPT": "TypeScript", 
  "REACT": "React", "NODE_JS": "Node.js", "EXPRESS": "Express", 
  "VUE_JS": "Vue.js", "NEXT_JS": "Next.js", "SPRING_BOOT": "Spring Boot", 
  "DJANGO": "Django", "PANDAS": "Pandas", "SCIKIT_LEARN": "Scikit-learn", 
  "PYTORCH": "PyTorch", "TENSORFLOW": "TensorFlow", "FLUTTER": "Flutter", 
  "MYSQL": "MySQL", "REDIS": "Redis", "MONGODB": "MongoDB", 
  "POSTGRESQL": "PostgreSQL", "GIT": "Git", "GITHUB": "GitHub", 
  "GITHUB_ACTIONS": "GitHub Actions", "FIGMA": "Figma", "NOTION": "Notion", 
  "JIRA": "Jira", "DOCKER": "Docker", "UNITY": "Unity", "UNREAL": "Unreal Engine"
};

const TECH_ICON_MAP = {
  'C++': 'CPP',
  'C#': 'CSHARP', 
};

export default function StudyListPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();

  const [searchParams, setSearchParams] = useSearchParams();
  const isHistoryPushedRef = useRef(false);

  const [studies, setStudies] = useState([]); 
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // 로컬 상태로 isClosed 관리 (URL과 동기화 위해)
  const [isClosed, setIsClosed] = useState(false);

  const {
    selectedTechs,
    currentPage,
    toggleTech,
    setPage,
    reset,
  } = useStudyStore();

  // 컴포넌트 언마운트 시에만 리셋 (Cleanup)
  useEffect(() => {
    return () => reset();
  }, [reset]);

  // [1] URL 변경 시 -> 스토어 상태 동기화 (UI 체크박스 등 동기화용)
  useEffect(() => {
    const pageParam = searchParams.get('page');
    const skillsParam = searchParams.get('skills');
    const statusParam = searchParams.get('status');

    const targetPage = pageParam ? parseInt(pageParam, 10) : 1;
    if (currentPage !== targetPage) {
      setPage(targetPage);
    }

    const targetStatus = statusParam === 'CLOSED';
    if (isClosed !== targetStatus) {
      setIsClosed(targetStatus);
    }

    const targetTechs = skillsParam ? skillsParam.split(',') : [];
    // 스토어와 URL의 기술 스택이 다르면 동기화
    const isDifferent = 
      selectedTechs.length !== targetTechs.length || 
      !targetTechs.every(t => selectedTechs.includes(t));

    if (isDifferent) {
      // 기존 선택 초기화 후 URL 기준으로 다시 설정
      // (주의: reset 호출 시 page도 초기화될 수 있으므로 page는 유지 필요)
      // 여기서는 toggleTech만 사용하여 상태를 맞춥니다.
      // 1. 현재 선택된 것 중 URL에 없는 것은 해제
      selectedTechs.forEach(tech => {
        if (!targetTechs.includes(tech)) toggleTech(tech);
      });
      // 2. URL에 있는데 선택 안 된 것은 추가
      targetTechs.forEach(tech => {
        if (!selectedTechs.includes(tech)) toggleTech(tech);
      });
    }
  }, [searchParams, selectedTechs, currentPage, isClosed, setPage, toggleTech]); // 의존성 배열 주의


  // [2] API 호출 (핵심 수정 부분)
  useEffect(() => {
    const fetchStudies = async () => {
      setIsLoading(true);
      try {
        // ★ 핵심 수정: 스토어 상태(selectedTechs)보다 URL 파라미터(searchParams)를 최우선으로 사용 ★
        // 이렇게 해야 페이지 진입 시 스토어 업데이트를 기다리지 않고 바로 올바른 데이터를 가져옵니다.
        
        const queryPage = searchParams.get('page');
        const querySkills = searchParams.get('skills');
        const queryStatus = searchParams.get('status');

        const params = {
          page: queryPage ? parseInt(queryPage, 10) - 1 : 0, // URL 없으면 0페이지
          size: itemsPerPage,
        };

        // 1. 마감 여부: URL 우선, 없으면 state
        if (queryStatus === 'CLOSED' || (!queryStatus && isClosed)) {
          params.status = 'CLOSED';
        }

        // 2. 기술 스택: URL 우선, 없으면 state
        if (querySkills) {
          params.skills = querySkills;
        } else if (selectedTechs.length > 0) {
          params.skills = selectedTechs.join(',');
        }

        const response = await api.get('/api/v1/studies', { params });
        
        const content = response.data.data?.content || [];
        const totalPageCount = response.data.data?.page?.totalPages || response.data.data?.totalPages || 0;

        const mappedStudies = content.map((item) => {
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

           const techStack = item.skills ? item.skills.map(normalizeTech).filter(t => t !== "") : [];
           
           return {
            id: item.id, 
            title: item.title,
            deadline: item.deadline,
            author: item.authorNickname || "익명",
            authorProfileImageUrl: item.authorProfileImageUrl,
            purposeTag: "스터디", 
            methodTag: extractValue(item.meetingType) || "미정", 
            status: item.status?.name || "RECRUITING",
            techStack: techStack, 
            bookmarked: item.bookmarked, 
            bookmarkId: item.bookmarkId, 
          };
        });

        setStudies(mappedStudies);
        setTotalPages(totalPageCount);

      } catch (error) {
        console.error("스터디 목록 불러오기 실패:", error);
        setStudies([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudies();

  // 의존성 배열에 searchParams를 추가하여 URL이 바뀔 때마다 fetch가 실행되도록 함
  }, [searchParams, isClosed, selectedTechs]); 


  // 기술 선택 핸들러
  const handleTechSelect = (tech) => {
    toggleTech(tech); 
    
    const nextTechs = selectedTechs.includes(tech)
      ? selectedTechs.filter(t => t !== tech)
      : [...selectedTechs, tech];

    const params = { page: 1 };
    if (nextTechs.length > 0) {
      params.skills = nextTechs.join(',');
    }
    if (isClosed) {
      params.status = 'CLOSED';
    }

    if (!isHistoryPushedRef.current) {
      setSearchParams(params, { replace: false });
      isHistoryPushedRef.current = true; 
    } else {
      setSearchParams(params, { replace: true });
    }
  };

  const handleToggle = (newState) => {
    setIsClosed(newState);
    
    const params = { page: 1 };
    if (selectedTechs.length > 0) {
      params.skills = selectedTechs.join(',');
    }
    if (newState) {
      params.status = 'CLOSED';
    }

    setSearchParams(params, { replace: false });
  };

  const handleDropdownClick = () => {
    if (openDropdown === "tech") {
      setOpenDropdown(null);
    } else {
      setOpenDropdown("tech");
      isHistoryPushedRef.current = false;
    }
  };

  const handlePageChange = (pageNumber) => {
    const params = { page: pageNumber };
    if (selectedTechs.length > 0) {
      params.skills = selectedTechs.join(',');
    }
    if (isClosed) {
      params.status = 'CLOSED';
    }
    setSearchParams(params); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <PageHeader title="스터디" />
      
      <FilterBar isClosed={isClosed} onToggle={handleToggle}>
        <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
          <button css={dropDownButtonStyle("120px", selectedTechs.length > 0)} onClick={handleDropdownClick}>
            <span>{selectedTechs.length > 0 ? `기술 ${selectedTechs.length}` : '기술'}</span>
            <ArrowIcon />
          </button>
          {openDropdown === 'tech' && (
            <ul css={techDropDownMenuStyle}>
              {TECH_STACK_LIST.map(option => (
                <li key={option} css={dropDownMenuItemStyle(selectedTechs.includes(option), true)} onClick={() => handleTechSelect(option)}>
                  <input type="checkbox" css={customCheckboxStyle} checked={selectedTechs.includes(option)} readOnly />
                  <label>{TECH_STACK_DISPLAY_MAP[option] || option}</label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </FilterBar>
    
      {isLoading ? (
        <EmptyStateMessage message="데이터를 불러오는 중입니다..." />
      ) : studies.length === 0 ? (
        <EmptyStateMessage message="일치하는 스터디가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={studies}
            itemsPerPage={itemsPerPage}
            renderCard={(study) => <StudyCard project={study} />}
          />
          
          {totalPages > 0 && (
            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => handlePageChange(value)}
              />
            </Stack>
          )}
        </>
      )}
    </PageWrapper>
  );
}