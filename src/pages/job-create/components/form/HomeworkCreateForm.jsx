/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import Editor from '../Editor';
import CategoryField from './form-fields/CategoryField';
import TitleField from './form-fields/TitleField';
import DeadLineField from './form-fields/DeadLineField';
import DepartmentField from './form-fields/DepartmentField';
import CourseCodeField from './form-fields/CourseCodeField';
import GradeField from './form-fields/GradeField';
import PositionField from './form-fields/PositionField';
import ConsentField from './form-fields/ConsentField';
import PurposeField from './form-fields/PurposeField';

const HomeworkCreateForm = () => {
  return (
    <form css={formContainer}>
      {/* 공고구분 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>공고구분</p>
        <CategoryField categoryName={'과제'} />
        <PurposeField dropdownLabel={'과제'} />
      </div>

      {/* 제목 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>제목</p>
        <TitleField />
      </div>

      {/* 마감일 박스 */}
      <div css={formListBox}>
        <div css={listLabel}>
          <p>마감일</p>
          <p className="support-msg">*공고 마감일을 입력해 주세요</p>
        </div>
        <DeadLineField />
      </div>

      {/* 정보 박스 */}
      <div css={formListBox}>
        <div css={listLabel}>
          <p>정보</p>
          <p className="support-msg">*과제 정보를 입력해 주세요</p>
        </div>
        <DepartmentField />
        <CourseCodeField />
        <GradeField />
        <PositionField />
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

export default HomeworkCreateForm;

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
  display: flex;
  justify-content: space-between;

  .support-msg {
    font-size: 13px;
    color: ${colors.gray[300]};
    height: 13px;
    margin-bottom: 3px;
    align-self: self-end;
    font-family: 'nanumR';
  }
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
