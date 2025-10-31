/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const JobListLinkBtn = ({ category }) => {
  return (
    <Link to="/hw-list">
      <button css={navBtn} type="button">
        <IoIosArrowBack />
        {category} 목록보기
      </button>
    </Link>
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
  margin-left: 310px;
  display: flex;
  align-items: center;
`;
