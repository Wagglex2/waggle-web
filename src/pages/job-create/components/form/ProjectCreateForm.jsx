/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { field, fieldContent, separator, unit } from './fieldStyle';
import Editor from '../Editor';
import { positionOptions } from '@/data/options';
import DropDown from '@/components/dropdown/DropDown';
import CategoryField from './form-fields/CategoryField';
import PurposeField from './form-fields/PurposeField';
import TitleField from './form-fields/TitleField';
import DeadLineField from './form-fields/DeadLineField';
import DurationField from './form-fields/DurationField';
import MethodField from './form-fields/MethodField';
import GradeField from './form-fields/GradeField';
import TechField from './form-fields/TechField';
import ConsentField from './form-fields/ConsentField';
import SubmitFormBtn from './form-fields/SubmitFormBtn';
import useCreateJobStore from '@/stores/useCreateJobStore';
import JobEditBtn from './form-fields/JobEditBtn';

const ProjectCreateForm = ({
  isFormValid,
  payload,
  consent,
  setConsent,
  positionState,
  setPositionState,
  editMode,
}) => {
  const {
    content,
    setContent,
    projectPositions,
    authorPosition,
    setProjectPositions,
    setAuthorPosition,
  } = useCreateJobStore();

  // 팀원 포지션 입력 필드 ui 추가용 포지션 객체 추가
  function addPositionField() {
    setPositionState((prev) => [
      ...prev,
      { id: Date.now(), position: '', personnel: '', isAdded: false, isDisable: false },
    ]);
  }

  // 사용자가 선택한 포지션을 ui용 포지션 객체의 position키 value로 삽입
  function updatePositionName(id, option) {
    setPositionState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, position: option.name } : item))
    );
  }

  // 사용자가 입력한 인원수를 ui용 포지션 객체의 personnel키 value로 삽입
  function updatePersonnel(id, count) {
    setPositionState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, personnel: count } : item))
    );
  }

  // 유저가 입력한 포지션과 인원수를 서버 전달용 데이터 projectPositions에 저장/삭제 하는 함수
  function handlePositionField(id) {
    const selectedData = positionState.find((item) => item.id === id);

    if (!selectedData.position || !selectedData.personnel) {
      return alert('**저장 실패** \n포지션과 인원을 모두 입력해주세요.');
    }

    // 삭제 버튼을 누른 경우
    if (selectedData.isAdded) {
      setPositionState((prev) => prev.filter((item) => item.id !== id));
      setProjectPositions((prev) => prev.filter((item) => item.position !== selectedData.position));
      return;
    }

    // 저장 버튼을 누른 경우
    // 1. 인원 < 1 ? 저장 불가 : 저장
    // 2. 새로운 필드 입력 후 저장 버튼을 누른 경우 -> 중복 입력 ? 저장 불가 : 저장
    const isZero = selectedData.personnel < 1 ? true : false;
    const isSamePos = projectPositions.some((item) => item.position === selectedData.position);
    if (isZero) {
      return alert('**저장 실패** \n최소 인원은 1명입니다.');
    }
    if (isSamePos) {
      return alert('**저장 실패** \n이미 입력된 포지션입니다.');
    }

    setProjectPositions((prev) => {
      return [
        ...prev,
        { position: selectedData.position, maxParticipants: Number(selectedData.personnel) },
      ];
    });

    setPositionState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isAdded: true, isDisable: true } : item))
    );
  }

  return (
    <form css={formContainer} onSubmit={(e) => e.preventDefault()}>
      {/* 공고구분 박스 */}
      <div css={formListBox}>
        <p css={listBoxLabel}>공고구분</p>
        <CategoryField categoryName={'프로젝트'} />
        <PurposeField dropdownLabel={'목적'} />
      </div>

      {/* 제목 박스 */}
      <div css={formListBox}>
        <p css={listBoxLabel}>제목</p>
        <TitleField />
      </div>

      {/* 마감일 박스*/}
      <div css={formListBox}>
        <div css={listBoxLabel}>
          <p>마감일</p>
          <p className="support-msg">*공고 마감일을 입력해 주세요</p>
        </div>
        <DeadLineField />
      </div>

      {/* 정보 박스 */}
      <div css={formListBox}>
        <div css={listBoxLabel}>
          <p>정보</p>
          <p className="support-msg">*프로젝트 정보를 입력해 주세요</p>
        </div>
        <DurationField />
        <MethodField />
        <GradeField />

        <div css={field}>
          <p className="field-name">등록자 포지션</p>
          <div css={fieldContent('200px', 'column')}>
            <div css={positionBox}>
              <DropDown
                label="포지션"
                options={positionOptions}
                buttonWidth={'200px'}
                value={authorPosition}
                onChange={setAuthorPosition}
              />
            </div>
          </div>
        </div>

        <div css={field}>
          <div css={projectPositionfieldLabel}>
            <p>팀원 포지션</p>
            <p className="note-msg">* 본인 제외</p>
          </div>
          <div css={fieldContent('200px', 'column')}>
            {positionState.map((item) => (
              <div key={item.id} css={positionBox}>
                <DropDown
                  label="포지션"
                  options={positionOptions}
                  buttonWidth="200px"
                  value={positionOptions.find((opt) => opt.name === item.position)}
                  onChange={(option) => updatePositionName(item.id, option)}
                  isDisable={item.isDisable}
                />

                <span css={separator}>:</span>

                <input
                  type="number"
                  placeholder="인원 수 입력"
                  value={item.personnel}
                  onChange={(e) => updatePersonnel(item.id, e.target.value)}
                  disabled={item.isDisable}
                />

                <span css={unit}>명</span>

                <button
                  type="button"
                  css={deletePositionBtn}
                  onClick={() => handlePositionField(item.id)}
                >
                  {item.isAdded ? '삭제' : '저장'}
                </button>
              </div>
            ))}

            <button type="button" css={addPositionBtn} onClick={addPositionField}>
              + 포지션 추가
            </button>
          </div>
        </div>

        <TechField />
      </div>

      {/* 공고상세 박스 */}
      <div css={formListBox}>
        <p css={listBoxLabel}>공고 상세</p>
        <Editor editorValue={content} onChangeEditorValue={setContent} />
      </div>

      {/* 공고등록 동의 필드 */}
      <ConsentField consent={consent} setConsent={setConsent} />

      {!editMode ? (
        <SubmitFormBtn
          isEnabled={isFormValid}
          payload={payload}
          path={{ path: 'project-list', url: 'projects' }}
          setConsent={setConsent}
        />
      ) : (
        <JobEditBtn
          isEnabled={isFormValid}
          payload={payload}
          path={{ path: 'project-list', url: 'projects' }}
          setConsent={setConsent}
        />
      )}
    </form>
  );
};

export default ProjectCreateForm;

const formContainer = css`
  width: 740px;
  height: 100%;
`;

const formListBox = css`
  margin-bottom: 52px;
`;

const listBoxLabel = css`
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

const positionBox = css`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const deletePositionBtn = css`
  padding-right: 10px;
  background: none;
  border: none;
  color: ${colors.gray[400]};
  font-family: 'nanumR';
  font-size: 14px;
`;

const addPositionBtn = css`
  background: none;
  border: none;
  color: ${colors.gray[300]};
  font-size: 13px;
  font-family: 'nanumR';
  align-self: end;
`;

const projectPositionfieldLabel = css`
  width: 118px;
  background-color: #fef7d4;
  font-size: 14px;
  font-family: 'nanumB';
  color: ${colors.gray[400]};

  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding-left: 7px;
  margin-right: 15px;
  padding-top: 14px;

  .note-msg {
    font-size: 13px;
    color: ${colors.gray[300]};
    margin-left: 7px;
  }
`;
