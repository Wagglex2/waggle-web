/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { colors } from "@/styles/theme";
import { SiTypescript, SiReact, SiFigma } from 'react-icons/si';

const cardStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 20px 20px 10px 10px;
  border: 1.5px solid ${colors.gray[300]};
  background: #fff;
  padding: 15px;
  padding-bottom: 8px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;
  height: 260px;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const headerTopStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'nanumR';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
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
  padding: 2px 14px 1px 14px;
  border-radius: 18px;
  font-family: 'nanumR';
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const secondaryTagStyle = css`
  background: #DAF1DE;
  color: ${colors.gray[400]};
  font-size: 12px;
  font-weight: 400;
  padding: 2px 14px 1px 14px;
  border-radius: 18px;
  font-family: 'nanumR';
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const deadlineStyle = css`
  font-size: 12px;
  color: ${colors.gray[400]};
  padding-top: 3px;
  font-weight: 500;
  font-family: 'nanumR';
  line-height: 1.4;
`;

const titleStyle = css`
  font-size: 18px;
  font-weight: 700;
  color: ${colors.secondary};
  margin-top: -25px;
  font-family: 'nanumEB';
  line-height: 1.4;
  position: absolute;
  top: 75px;
  left: 15px;
  right: 15px;
  
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  -webkit-box-orient: vertical;
`;

const positionTagBoxStyle = css`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  position: absolute;
  top: 120px;
  left: 15px;
  right: 15px;
`;

const positionTagStyle = css`
  background: #E2E2E2;
  color: ${colors.gray[400]};
  font-size: 13px;
  font-weight: 400;
  padding: 2px 14px 1px 14px;
  border-radius: 18px;
  font-family: 'nanumR';
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const techStackIconBoxStyle = css`
  display: flex;
  align-items: center;
  padding-bottom: 6px;
  margin-top: 0px;
  position: absolute;
  top: 150px;
  left: 15px;
  right: 15px;
`;

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

const dividerStyle = css`
  border-top: 1px solid #E2E2E2;
  position: absolute;
  top: 205px; 
  left: 15px;
  right: 15px; 
`;

const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 8px;
  left: 15px;
  right: 15px;
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
  font-family: 'nanumR';
  line-height: 1.4;
`;

const HeartIcon = ({ isLiked }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isLiked ? "#FA9394" : "none"}
    stroke={isLiked ? "#FA9394" : "#B3B3B3"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

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

  const [isLiked, setIsLiked] = useState(false);

  const displayedPositions = project.positions.slice(0,3);
  const hasMorePositions = project.positions.length > 3;

  return (
    <div css={cardStyle}>
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

      <h3 css={titleStyle}>{project.title}</h3>

      <div css={positionTagBoxStyle}>
        {displayedPositions.map((tag, idx) => (
          <span key={idx} css={positionTagStyle}>{tag}</span>
        ))}

        {hasMorePositions && (
          <span css={positionTagStyle}>...</span>
        )}
      </div>

      <div css={techStackIconBoxStyle}>
        {techIcons}
      </div>

      <div>
        <div css={dividerStyle} />

        <div css={footerStyle}>
          <div css={profileStyle}>
            <div css={avatarStyle} />
            <span css={nicknameStyle}>{project.author}</span>
          </div>

          <button
            onClick={() => setIsLiked(!isLiked)}
            css={css`
              background: none;
              border: none;
              padding: 0;
              cursor: pointer;
            `}
          >
            <HeartIcon isLiked={isLiked} />
          </button>
        </div>
      </div>
    </div>
  );
}