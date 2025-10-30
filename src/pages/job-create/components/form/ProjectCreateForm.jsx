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
        <p css={listBoxLabel}>마감일</p>
        <DeadLineField />
      </div>

      {/* 정보 박스 */}
      <div css={formListBox}>
        <p css={listBoxLabel}>정보</p>
        <DurationField />
        <MethodField />
        <GradeField />

        <div css={field}>
          <p className="field-name">포지션</p>
          <div css={fieldContent('200px', 'column')}>
            {positionState.map((prev) => (
              <div css={positionBox} key={prev.id}>
                <button
                  type="button"
                  css={deletePositionBtn}
                  onClick={() => deletePosition(prev.id)}
                >
                  삭제
                </button>
                <DropDown label="포지션" options={positionOptions} buttonWidth={'200px'} />
                <span css={separator}>:</span>
                <input type="text" placeholder="모집 인원을 입력해 주세요" />
                <span css={unit}>명</span>
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
