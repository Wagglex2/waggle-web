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
import useCreateJobStore from '@/stores/useCreateJobStore';
import SubmitFormBtn from './form-fields/SubmitFormBtn';
import JobEditBtn from './form-fields/JobEditBtn';

const StudyCreateForm = ({ isFormValid, payload, consent, setConsent, editMode }) => {
  const { content, setContent } = useCreateJobStore();

  return (
    <form css={formContainer} onSubmit={(e) => e.preventDefault()}>
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
          <p className="support-msg">*스터디 정보를 입력해 주세요</p>
        </div>
        <DurationField />
        <PositionField />
        <TechField />
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
          path={{ path: 'study-list', url: 'studies' }}
          setConsent={setConsent}
        />
      ) : (
        <JobEditBtn
          isEnabled={isFormValid}
          payload={payload}
          path={{ path: 'study-list', url: 'studies' }}
          setConsent={setConsent}
        />
      )}
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
