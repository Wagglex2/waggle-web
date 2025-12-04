/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { colors } from "@/styles/theme";
import techIcons from "@/data/techIcons"; 
import api from "@/api/api";

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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
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
  overflow: hidden;
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
  flex-shrink: 0;
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
  
  span {
    font-family: 'nanumB';
    padding-top: 3px;
    margin-left: 12px;
    color: ${colors.gray[400]};
    font-size: 14px;
  }
`;

const iconContainerStyle = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e0e0e0;
  margin-left: -8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &:first-of-type {margin-left: 0;}

  img {
    width: 100%;
    height: 100%; 
    object-fit: cover;
  }
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
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const defaultImgUrl =
  'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';

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

const MAX_TECH_DISPLAY = 3; 

export default function ProjectCard({ project, onUnlike }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLiked, setIsLiked] = useState(project.bookmarked);
  const [bookmarkId, setBookmarkId] = useState(project.bookmarkId);

  const isSavedPage = onUnlike !== undefined;
  const displayedPositions = project.positions?.slice(0, 3);
  const hasMorePositions = project.positions?.length > 3;

  useEffect(() => {
    setIsLiked(project.bookmarked);
    setBookmarkId(project.bookmarkId);
  }, [project]);

  const handleLikeClick = async (e) => {
    e.stopPropagation();

    if (isSavedPage) {
      onUnlike(project.id);
      return;
    }

    try {
      if (isLiked) {
        if (!bookmarkId) {
          console.error("찜 취소 실패: bookmarkId가 없습니다.");
          return;
        }
        await api.delete(`/api/v1/bookmarks/${bookmarkId}`);
        setIsLiked(false);
        setBookmarkId(null);
      } else {
        const response = await api.post(`/api/v1/bookmarks/recruitments/${project.id}`);
        const newBookmarkId = response.data.data;
        setIsLiked(true);
        setBookmarkId(newBookmarkId);
      }
    } catch (error) {
      console.error("찜 처리 중 오류 발생:", error);
      if (error.response?.status === 401) {
        alert("로그인이 필요합니다.");
      }
    }
  };
  
  const handleCardClick = () => {
    navigate(`/project-list/${project.id}`, {
      state: { prevParams: location.search }
    });
  };

  const displayedTechs = project.techStack?.slice(0, MAX_TECH_DISPLAY);
  const hiddenTechCount = project.techStack?.length - MAX_TECH_DISPLAY;

  return (
    <div css={cardStyle} onClick={handleCardClick}>
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
        {displayedPositions?.map((tag, idx) => (
          <span key={idx} css={positionTagStyle}>{tag}</span>
        ))}

        {hasMorePositions && (
          <span css={positionTagStyle}>...</span>
        )}
      </div>

      <div css={techStackIconBoxStyle}>
        {displayedTechs?.map((tech) => {
          const iconPath = techIcons[tech]; 
          
          if (!iconPath) {
             return null; 
          }

          return (
            <div key={tech} css={iconContainerStyle}>
              <img src={iconPath} alt={tech} />
            </div>
          );
        })}
        
        {hiddenTechCount > 0 && (
          <span>+{hiddenTechCount}</span>
        )}
      </div>

      <div>
        <div css={dividerStyle} />

        <div css={footerStyle}>
          <div css={profileStyle}>
            <div css={avatarStyle}>
              <img 
                src={project.authorProfileImageUrl || defaultImgUrl} 
                alt={project.author}
              />
            </div>
            <span css={nicknameStyle}>{project.author}</span>
          </div>

          <button
            onClick={handleLikeClick} 
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