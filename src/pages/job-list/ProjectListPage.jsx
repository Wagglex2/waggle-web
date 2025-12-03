/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import PageHeader from "@/components/layout/PageHeader";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import ProjectCard from "@/components/card/ProjectCard";
import EmptyStateMessage from "@/components/common/EmptyStateMessage"; 
import { useDropdown } from "@/components/filter/useDropdown";
import useProjectStore from "@/stores/useProjectStore";
import api from '@/api/api'; 
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  dropDownButtonStyle,
  ArrowIcon,
  dropdownContainerStyle,
  dropDownMenuStyle,
  techDropDownMenuStyle,
  customCheckboxStyle,
  dropDownMenuItemStyle
} from "@/components/filter/dropdownStyles";

const POSITION_MAP = {
  '전체': '',
  '프론트엔드': 'FRONT_END',
  '백엔드': 'BACK_END',
  '풀스택': 'FULL_STACK',
  '데이터': 'DATA',
  'AI': 'AI',
  '게임': 'GAME',
  '기획': 'PLANNER',
  '디자인': 'DESIGNER',
};
const positionOptions = Object.keys(POSITION_MAP).filter(k => k !== '전체');

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
  'CSHARP': 'CSHARP', 
  'CPP': 'CPP',
};

const PURPOSE_MAP = {
  '전체': '',
  '공모전': 'CONTEST',
  '해커톤': 'HACKATHON',
  '토이프로젝트': 'TOY_PROJECT',
  '사이드프로젝트': 'SIDE_PROJECT',
};
const purposeOptions = Object.keys(PURPOSE_MAP);


export default function ProjectListPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();

  const [projects, setProjects] = useState([]); 
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const {
    selectedPurpose,
    hasSelectedPurpose,
    selectedTechs,
    selectedPositions,
    currentPage,
    setPurpose,
    toggleTech,
    togglePosition,
    setPage,
    reset
  } = useProjectStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const handlePurposeClick = (option) => {
    setPurpose(option);
    setOpenDropdown(null);
    setPage(1); 
  };

  const handleToggle = (newState) => {
    setIsClosed(newState); 
    setPage(1);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const params = {
          page: currentPage - 1,
          size: itemsPerPage,
        };

        if (isClosed) {
          params.status = 'CLOSED';
        }

        if (hasSelectedPurpose && selectedPurpose !== '전체') {
          params.purpose = PURPOSE_MAP[selectedPurpose];
        }

        if (selectedTechs.length > 0) {
          params.skills = selectedTechs.join(',');
        }

        if (selectedPositions.length > 0) {
          const posParams = selectedPositions
            .map(pos => POSITION_MAP[pos])
            .join(',');
          params.positions = posParams;
        }

        const response = await api.get('/api/v1/projects', { params });
        
        const content = response.data.data?.content || [];
        const totalPageCount = response.data.data?.page?.totalPages || response.data.data?.totalPages || 0;

        const mappedProjects = content.map((item) => {
           const extractValue = (data) => {
             if (!data) return null;
             if (typeof data === 'object') return data.desc || data.name;
             return data;
           };

           const normalizeTech = (tech) => {
              if (!tech) return "";
              let rawName = (typeof tech === 'object' ? tech.name : tech) || "";
              rawName = rawName.toString().toUpperCase(); 
              if (TECH_ICON_MAP[rawName]) return TECH_ICON_MAP[rawName];
              return rawName; 
           };

           const techStack = item.skills ? item.skills.map(normalizeTech).filter(t => t !== "") : [];
           
           return {
            id: item.id,
            title: item.title,
            deadline: item.deadline,
            author: item.authorNickname,
            authorProfileImageUrl: item.authorProfileImageUrl,
            purposeTag: extractValue(item.category) || "미정", 
            methodTag: extractValue(item.meetingType) || "미정",
            status: item.status?.name || "RECRUITING",
            positions: item.positions ? item.positions.map(extractValue).filter(p => p) : [], 
            techStack: techStack,

            bookmarked: item.bookmarked, 
            bookmarkId: item.bookmarkId, 
          };
        });

        setProjects(mappedProjects);
        setTotalPages(totalPageCount);

      } catch (error) {
        console.error("프로젝트 목록 불러오기 실패:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();

  }, [currentPage, selectedPurpose, selectedTechs, selectedPositions, hasSelectedPurpose, setPage, isClosed]);


  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <PageWrapper>
      <PageHeader title="프로젝트" />
      
      <FilterBar isClosed={isClosed} onToggle={handleToggle}>
        <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['purpose'] = el}>
          <button css={dropDownButtonStyle("120px", hasSelectedPurpose)} onClick={() => setOpenDropdown(openDropdown === "purpose" ? null : "purpose")}>
            <span>{hasSelectedPurpose ? selectedPurpose : '목적'}</span>
            <ArrowIcon />
          </button>
          {openDropdown === 'purpose' && (
            <ul css={dropDownMenuStyle}>
              {purposeOptions.map(option => (
                <li key={option} css={dropDownMenuItemStyle(selectedPurpose === option, false)} onClick={() => handlePurposeClick(option)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
          <button css={dropDownButtonStyle("120px", selectedTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
            <span>{selectedTechs.length > 0 ? `기술 ${selectedTechs.length}` : '기술'}</span>
            <ArrowIcon />
          </button>
          {openDropdown === 'tech' && (
            <ul css={techDropDownMenuStyle}>
              {TECH_STACK_LIST.map(option => (
                <li key={option} css={dropDownMenuItemStyle(selectedTechs.includes(option), true)} onClick={() => { toggleTech(option); setPage(1); }}>
                  <input type="checkbox" css={customCheckboxStyle} checked={selectedTechs.includes(option)} readOnly />
                  <label>{TECH_STACK_DISPLAY_MAP[option] || option}</label>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['position'] = el}>
          <button css={dropDownButtonStyle("120px", selectedPositions.length > 0)} onClick={() => setOpenDropdown(openDropdown === "position" ? null : "position")}>
            <span>{selectedPositions.length > 0 ? `포지션 ${selectedPositions.length}` : '포지션'}</span>
            <ArrowIcon />
          </button>
          {openDropdown === 'position' && (
            <ul css={dropDownMenuStyle}> 
              {positionOptions.map(option => (
                <li key={option} css={dropDownMenuItemStyle(selectedPositions.includes(option), false)} onClick={() => { togglePosition(option); setPage(1); }}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </FilterBar>

      {isLoading ? (
        <EmptyStateMessage message="데이터를 불러오는 중입니다." />
      ) : projects.length === 0 ? (
        <EmptyStateMessage message="일치하는 프로젝트가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={projects}
            itemsPerPage={itemsPerPage}
            renderCard={(project) => <ProjectCard project={project} />}
          />
          
          {totalPages > 0 && (
            <Stack spacing={2} sx={{ alignItems: 'center', mt: 4, mb: 4 }}>
              <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={(_, value) => {
                  setPage(value);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            </Stack>
          )}
        </>
      )}
    </PageWrapper>
  );
}