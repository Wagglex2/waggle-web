/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "../../styles/theme";

import { SiTypescript, SiReact, SiFigma } from 'react-icons/si';

const iconStyle = css`
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  padding: 0.5px; 
  margin-left: -8px;
  &:first-of-type {margin-left: 0;}
  border: 1px solid #e0e0e0;
`;

// 찜하기 아이콘
const HeartIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke= {colors.gray[300]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>;


const cardStyle = css`
  display: flex;
  flex-direction: column;
  border-radius: 20px 20px 10px 10px;
  border: 1.5px solid ${colors.gray[300]};
  background: #fff;
  padding: 15px;
  padding-bottom: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const headerTopStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const tagGroupStyle = css`
  display: flex;
  gap: 8px;
`;

const primaryTagStyle = css`
  background: #FFF4C2;
  color: ${colors.gray[400]};
  font-size: 12px;
  font-weight: 400;
  padding: 2px 12px;
  border-radius: 18px;
`;

const secondaryTagStyle = css`
  background: #DAF1DE;
  color: ${colors.gray[400]};
  font-size: 12px;
  font-weight: 400;
  padding: 2px 12px;
  border-radius: 18px;
`;

const deadlineStyle = css`
  font-size: 12px;
  color: ${colors.gray[400]};
  font-weight: 500;
`;

const titleStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: #3A3637;
  margin-top: 1.2px;
  margin-bottom: 20px;
`;

const positionTagBoxStyle = css`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  margin-bottom: 14px;
`;

const positionTagStyle = css`
  background: #E2E2E2;
  color: ${colors.gray[400]};
  font-size: 13px;
  font-weight: 400;
  padding: 2.5px 12px;
  border-radius: 18px;
`;

const techStackIconBoxStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const dividerStyle = css`
  border-top: 1px solid #E2E2E2;
  margin-bottom: 8px;
`;

const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const profileStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const avatarStyle = css`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background: ${colors.gray[200]};
`;

const nicknameStyle = css`
  font-size: 15px;
  color: ${colors.gray[400]};
`;


// 더미 데이터에 맞게 기술 스택 아이콘을 매핑하는 함수
// 실제 프로젝트에서는 데이터베이스에 있는 기술 스택 정보를 가져와서 매핑해야 합니다.
const getTechIcons = (tags) => {
  const iconMap = {
    'TypeScript': <SiTypescript key="ts" color="#3178C6" css={iconStyle} />, 
    'React': <SiReact key="react" color="#61DAFB" css={iconStyle} />,       
    'Figma': <SiFigma key="figma" color="#F24E1E" css={iconStyle} />,        
  };
  return tags.map(tag => iconMap[tag]).filter(Boolean);
};

export default function ProjectCard({ project }) {
  const techIcons = getTechIcons(project.techStack);

  // 최대 4개의 포지션 태그만 표시
  const displayedPositions = project.positions.slice(0, 4);
  const hasMorePositions = project.positions.length > 4;

  return (
    <div css={cardStyle}>
      {/* 1, 2, 3: 상단 태그 및 마감일 */}
      <div css={headerTopStyle}>
        <div css={tagGroupStyle}>
          {project.purposeTag && (
            <span css={primaryTagStyle}>{project.purposeTag}</span>
          )}
          {project.methodTag && (
            <span css={secondaryTagStyle}>{project.methodTag}</span>
          )}
        </div>
        <span css={deadlineStyle}>{project.deadline}</span>
      </div>

      {/* 4: 제목 */}
      <h3 css={titleStyle}>{project.title}</h3>

      {/* 5: 포지션 태그 */}
      <div css={positionTagBoxStyle}>
        {displayedPositions.map((tag, idx) => (
          <span key={idx} css={positionTagStyle}>{tag}</span>
        ))}
        {/* 태그가 4개 이상일 경우 "..." 태그 추가 */}
        {hasMorePositions && (
          <span css={positionTagStyle}>...</span>
        )}
      </div>

      {/* 6: 기술 스택 아이콘 */}
      <div css={techStackIconBoxStyle}>
        {techIcons}
      </div>

      {/* 7: 구분선 */}
      <div css={dividerStyle} />

      {/* 8, 9: 하단 프로필 및 찜하기 */}
      <div css={footerStyle}>
        <div css={profileStyle}>
          <div css={avatarStyle} />
          <span css={nicknameStyle}>{project.author}</span>
        </div>
        <HeartIcon />
      </div>
    </div>
  );
}