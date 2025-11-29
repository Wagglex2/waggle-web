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
import CourseField from './form-fields/CourseField';
import useCreateJobStore from '@/stores/useCreateJobStore';
import SubmitFormBtn from './form-fields/SubmitFormBtn';
import JobEditBtn from './form-fields/JobEditBtn';

const HomeworkCreateForm = ({ isFormValid, payload, consent, setConsent, editMode }) => {
  const { content, setContent } = useCreateJobStore();

  return (
    <form css={formContainer} onSubmit={(e) => e.preventDefault()}>
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
        <CourseField />
        <CourseCodeField />
        <GradeField />
        <PositionField />
      </div>

      {/* 공고상세 박스 */}
      <div css={formListBox}>
        <p css={listLabel}>공고 상세</p>
        <Editor editorValue={content} onChangeEditorValue={setContent} />
      </div>

      {/* 공고등록 동의 필드 */}
      <ConsentField consent={consent} setConsent={setConsent} />

      {!editMode ? (
        <SubmitFormBtn
          isEnabled={isFormValid}
          payload={payload}
          path={{ path: 'hw-list', url: 'assignments' }}
          setConsent={setConsent}
        />
      ) : (
        <JobEditBtn
          isEnabled={isFormValid}
          payload={payload}
          path={{ path: 'hw-list', url: 'assignments' }}
          setConsent={setConsent}
        />
      )}
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
