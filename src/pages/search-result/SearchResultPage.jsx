/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { colors } from "@/styles/theme";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "@/components/layout/PageWrapper";
import FilterBar from "@/components/layout/FilterBar";
import CardGrid from "@/components/layout/CardGrid";
import ProjectCard from "@/components/card/ProjectCard";
import HwCard from "@/components/card/HwCard";
import StudyCard from "@/components/card/StudyCard";
import EmptyStateMessage from "@/components/common/EmptyStateMessage";
import { useDropdown } from "@/components/filter/useDropdown";
import useSearchStore from "@/stores/useSearchStore";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import api from '@/api/api'; 

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
  '전체': '', '프론트엔드': 'FRONT_END', '백엔드': 'BACK_END',
  '풀스택': 'FULL_STACK', '데이터': 'DATA', 'AI': 'AI', '게임': 'GAME',
  '기획': 'PLANNER', '디자인': 'DESIGNER',
};
const positionOptions = Object.keys(POSITION_MAP).filter(k => k !== '전체');

const PURPOSE_MAP = {
  '전체': '', '공모전': 'CONTEST', '해커톤': 'HACKATHON',
  '토이프로젝트': 'TOY_PROJECT', '사이드프로젝트': 'SIDE_PROJECT',
};
const purposeOptions = Object.keys(PURPOSE_MAP);

const GRADE_MAP = {
  "1학년": 1, "2학년": 2, "3학년": 3, "4학년 이상": 4
};
const gradeOptions = ["전체", "1학년", "2학년", "3학년", "4학년 이상"];

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
  'C#': 'CSHARP' 
};

const categoryMap = {
  project: "프로젝트",
  homework: "과제",
  study: "스터디",
};

const pageTitleStyle = css`
  font-size: 22px;
  font-weight: 700;
  color: #000000;
  padding: 15px 0 15px 0;
  font-family: 'nanumB';
  span { color: ${colors.tertiary}; font-family: 'nanumEB'; }
`;

const dividerStyle = css`
  border-bottom: 1px solid ${colors.gray[100]};
  margin-bottom: 60px;
`;

export default function SearchResultPage() {
  const itemsPerPage = 9;
  const { openDropdown, setOpenDropdown, dropdownRefs } = useDropdown();
  const [searchParams] = useSearchParams();
  
  const category = searchParams.get('category') || 'project';
  const query = searchParams.get('q') || '';

  const [data, setData] = useState([]); 
  const [totalPages, setTotalPages] = useState(0); 
  const [isLoading, setIsLoading] = useState(false); 

  const {
    currentPage, setPage, reset,
    selectedGrade, hasSelectedGrade, setGrade,
    selectedStudyTechs, toggleStudyTech,
    selectedProjectPurpose, hasSelectedProjectPurpose, setProjectPurpose,
    selectedProjectTechs, toggleProjectTech,
    selectedProjectPositions, toggleProjectPosition
  } = useSearchStore();

  useEffect(() => {
    return () => reset();
  }, [reset]);

  useEffect(() => {
    setPage(1);
  }, [category, query, setPage]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setData([]); // ✅ 수정됨: API 호출 전 데이터를 비워주어 컴포넌트 충돌 방지
      
      try {
        let endpoint = '';
        const params = {
          page: currentPage - 1,
          size: itemsPerPage,
          q: query,
        };

        if (category === 'project') {
          endpoint = '/api/v1/projects';
          if (hasSelectedProjectPurpose && selectedProjectPurpose !== '전체') {
            params.purpose = PURPOSE_MAP[selectedProjectPurpose];
          }
          if (selectedProjectTechs.length > 0) {
            params.skills = selectedProjectTechs.join(',');
          }
          if (selectedProjectPositions.length > 0) {
            params.positions = selectedProjectPositions.map(pos => POSITION_MAP[pos]).join(',');
          }
        } else if (category === 'homework') {
          endpoint = '/api/v1/assignments';
          if (hasSelectedGrade && selectedGrade !== '전체') {
            params.grades = GRADE_MAP[selectedGrade];
          }
        } else if (category === 'study') {
          endpoint = '/api/v1/studies';
          if (selectedStudyTechs.length > 0) {
            params.skills = selectedStudyTechs.join(',');
          }
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

        const mappedData = content.map((item) => {
          const baseItem = {
            id: item.id || item.recruitmentId,
            title: item.title,
            deadline: item.deadline,
            author: item.authorNickname || "익명",
            status: item.status?.name || "RECRUITING",
          };

          if (category === 'project') {
            return {
              ...baseItem,
              purposeTag: extractValue(item.category) || "미정",
              methodTag: extractValue(item.meetingType) || "미정",
              positions: item.positions ? item.positions.map(extractValue) : [],
              techStack: item.skills ? item.skills.map(normalizeTech) : [],
            };
          } else if (category === 'homework') {
            return {
              ...baseItem,
              purposeTag: "과제",
              grade: (item.grades && item.grades.length > 0) ? `${item.grades[0]}학년` : item.grade ? `${item.grade}학년` : "학년 무관",
              department: item.department || "전공 무관",
              subjects: item.lecture ? [item.lecture] : (item.subjects || []),
            };
          } else if (category === 'study') {
            return {
              ...baseItem,
              purposeTag: "스터디",
              methodTag: extractValue(item.meetingType) || "미정",
              techStack: item.skills ? item.skills.map(normalizeTech) : [],
            };
          }
          return baseItem;
        });

        setData(mappedData);
        setTotalPages(totalPageCount);

      } catch (error) {
        console.error("검색 결과 불러오기 실패:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    category, query, currentPage, 
    selectedGrade, selectedStudyTechs, 
    selectedProjectPurpose, selectedProjectTechs, selectedProjectPositions
  ]);

  const handleGradeSelect = (grade) => { setGrade(grade); setOpenDropdown(null); setPage(1); };
  const handleStudyTechSelect = (tech) => { toggleStudyTech(tech); setPage(1); };
  const handleProjectPurposeSelect = (purpose) => { setProjectPurpose(purpose); setOpenDropdown(null); setPage(1); };
  const handleProjectTechSelect = (tech) => { toggleProjectTech(tech); setPage(1); };
  const handleProjectPositionSelect = (position) => { toggleProjectPosition(position); setPage(1); };

  const renderCard = (item) => {
    switch (category) {
      case 'homework': return <HwCard key={item.id} project={item} />;
      case 'study': return <StudyCard key={item.id} project={item} />;
      case 'project': default: return <ProjectCard key={item.id} project={item} />;
    }
  };

  const renderFilters = () => {
    switch (category) {
      case 'homework':
        return (
          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['grade'] = el}>
            <button css={dropDownButtonStyle("120px", hasSelectedGrade)} onClick={() => setOpenDropdown(openDropdown === "grade" ? null : "grade")}>
              <span>{hasSelectedGrade ? selectedGrade : "학년"}</span>
              <ArrowIcon />
            </button>
            {openDropdown === "grade" && (
              <ul css={dropDownMenuStyle}>
                {gradeOptions.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedGrade === option, false)} onClick={() => handleGradeSelect(option)}>
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
        
      case 'study':
        return (
          <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
            <button css={dropDownButtonStyle("120px", selectedStudyTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
              <span>{selectedStudyTechs.length > 0 ? `기술 ${selectedStudyTechs.length}` : '기술'}</span>
              <ArrowIcon />
            </button>
            {openDropdown === 'tech' && (
              <ul css={techDropDownMenuStyle}>
                {TECH_STACK_LIST.map(option => (
                  <li key={option} css={dropDownMenuItemStyle(selectedStudyTechs.includes(option), true)} onClick={() => handleStudyTechSelect(option)}>
                    <input type="checkbox" css={customCheckboxStyle} checked={selectedStudyTechs.includes(option)} readOnly />
                    <label>{TECH_STACK_DISPLAY_MAP[option] || option}</label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case 'project':
      default:
        return (
          <>
            <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['purpose'] = el}>
              <button css={dropDownButtonStyle("120px", hasSelectedProjectPurpose)} onClick={() => setOpenDropdown(openDropdown === "purpose" ? null : "purpose")}>
                <span>{hasSelectedProjectPurpose ? selectedProjectPurpose : '목적'}</span>
                <ArrowIcon />
              </button>
              {openDropdown === 'purpose' && (
                <ul css={dropDownMenuStyle}>
                  {purposeOptions.map(option => (
                    <li key={option} css={dropDownMenuItemStyle(selectedProjectPurpose === option, false)} onClick={() => handleProjectPurposeSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['tech'] = el}>
              <button css={dropDownButtonStyle("120px", selectedProjectTechs.length > 0)} onClick={() => setOpenDropdown(openDropdown === "tech" ? null : "tech")}>
                <span>{selectedProjectTechs.length > 0 ? `기술 ${selectedProjectTechs.length}` : '기술'}</span>
                <ArrowIcon />
              </button>
              {openDropdown === 'tech' && (
                <ul css={techDropDownMenuStyle}>
                  {TECH_STACK_LIST.map(option => (
                    <li key={option} css={dropDownMenuItemStyle(selectedProjectTechs.includes(option), true)} onClick={() => handleProjectTechSelect(option)}>
                      <input type="checkbox" css={customCheckboxStyle} checked={selectedProjectTechs.includes(option)} readOnly />
                      <label>{TECH_STACK_DISPLAY_MAP[option] || option}</label>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div css={dropdownContainerStyle} ref={el => dropdownRefs.current['position'] = el}>
              <button css={dropDownButtonStyle("120px", selectedProjectPositions.length > 0)} onClick={() => setOpenDropdown(openDropdown === "position" ? null : "position")}>
                <span>{selectedProjectPositions.length > 0 ? `포지션 ${selectedProjectPositions.length}` : '포지션'}</span>
                <ArrowIcon />
              </button>
              {openDropdown === 'position' && (
                <ul css={dropDownMenuStyle}> 
                  {positionOptions.map(option => (
                    <li key={option} css={dropDownMenuItemStyle(selectedProjectPositions.includes(option), false)} onClick={() => handleProjectPositionSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        );
    }
  };

  return (
    <PageWrapper>
      <h1 css={pageTitleStyle}>
        카테고리 [{categoryMap[category] || '프로젝트'}]의 <span>'{query}'</span>에 대한 검색 결과입니다.
      </h1>
      <div css={dividerStyle} />

      <FilterBar>
        {renderFilters()}
      </FilterBar>
  
      {isLoading ? (
        <EmptyStateMessage message="데이터를 불러오는 중입니다." />
      ) : data.length === 0 ? (
        <EmptyStateMessage message="일치하는 결과가 없습니다." />
      ) : (
        <>
          <CardGrid
            items={data}
            itemsPerPage={itemsPerPage}
            renderCard={renderCard}
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