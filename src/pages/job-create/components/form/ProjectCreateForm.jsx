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
import { useState } from 'react';

const ProjectCreateForm = () => {
  const [positionState, setPositionState] = useState([{ id: 1, position: '', personnel: '' }]);

  function addPosition() {
    setPositionState((prev) => [...prev, { id: prev.length + 1, position: '', personnel: '' }]);
  }

  function deletePosition(id) {
    setPositionState((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <form css={formContainer}>
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
              <DropDown label="포지션" options={positionOptions} buttonWidth={'200px'} />
            </div>
          </div>
        </div>

        <div css={field}>
          <div css={projectPositionfieldLabel}>
            <p>팀원 포지션</p>
            <p className="note-msg">* 본인 제외</p>
          </div>
          <div css={fieldContent('200px', 'column')}>
            {positionState.map((prev) => (
              <div css={positionBox} key={prev.id}>
                <DropDown label="포지션" options={positionOptions} buttonWidth={'200px'} />
                <span css={separator}>:</span>
                <input type="text" placeholder="모집 인원을 입력해 주세요" />
                <span css={unit}>명</span>
                <button
                  type="button"
                  css={deletePositionBtn}
                  onClick={() => deletePosition(prev.id)}
                >
                  삭제
                </button>
              </div>
            ))}
            <button type="button" css={addPosionBtn} onClick={addPosition}>
              + 포지션 추가
            </button>
          </div>
        </div>

        <TechField />
      </div>

      {/* 공고상세 박스 */}
      <div css={formListBox}>
        <p css={listBoxLabel}>공고 상세</p>
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

const addPosionBtn = css`
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
