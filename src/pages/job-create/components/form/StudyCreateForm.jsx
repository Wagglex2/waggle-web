/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import Editor from '../Editor';
import CategoryField from './form-fields/CategoryField';
import PurposeField from './form-fields/PurposeField';
import TitleField from './form-fields/TitleField';
import DeadLineField from './form-fields/DeadLineField';
import DurationField from './form-fields/DurationField';
import PositionField from './form-fields/PositionField';
import TechField from './form-fields/TechField';
import ConsentField from './form-fields/ConsentField';

const StudyCreateForm = () => {
  return (
    <form css={formContainer}>
      {/* 공고구분 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>공고구분</p>
        <CategoryField categoryName={'스터디'} />
        <PurposeField dropdownLabel={'스터디'} />
      </div>

      {/* 제목 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>제목</p>
        <TitleField />
      </div>

      {/* 마감일 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>마감일</p>
        <DeadLineField />
      </div>

      {/* 정보 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>정보</p>
        <DurationField />
        <PositionField />
        <TechField />
      </div>

      {/* 공고상세 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>공고 상세</p>
        <Editor />
      </div>

      {/* 공고등록 동의 필드 */}
      <ConsentField />

      <button css={submitBtn} type="submit">
        등록하기
      </button>
    </form>
  );
};

export default StudyCreateForm;

const formContainer = css`
  width: 740px;
  height: 100%;
`;

const formListBox = css`
  margin-bottom: 52px;
`;

const listLabel = css`
  font-size: 15px;
  font-family: 'nanumB';
  border-bottom: 1px solid ${colors.gray[400]};
  padding: 3px 7px;
`;

const submitBtn = css`
  display: block;
  margin: 50px auto;
  width: 350px;
  height: 50px;

  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  background-color: #fef7d4;

  font-family: 'nanumEB';
  font-size: 15px;
  color: ${colors.secondary};
`;
