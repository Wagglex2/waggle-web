/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const categoryPath = {
  프로젝트: '/project-list',
  과제: '/hw-list',
  스터디: '/study-list',
};

const JobListLinkBtn = ({ category, onClick }) => {
  const navigate = useNavigate();

  // 버튼 클릭 핸들러
  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate(categoryPath[category]);
  };

  return (
    <button css={navBtn} type="button" onClick={handleClick}>
      <IoIosArrowBack />
      {category} 목록보기
    </button>
  );
};

export default JobListLinkBtn;

const navBtn = css`
  background-color: #fef1b2;
  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  color: ${colors.gray[400]};
  font-size: 13px;
  font-family: 'nanumB';
  padding: 10px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;