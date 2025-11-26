/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { field, fieldContent, inputBtnOption } from '../fieldStyle';

const GradeField = () => {
  return (
    <div css={field}>
      <p className="field-name">학년</p>
      <div css={fieldContent('_', 'column')}>
        <main>
          <div css={inputBtnOption('57px')}>
            <input type="checkbox" id="first-option" />
            <label htmlFor="first-option">1학년</label>
          </div>
          <div css={inputBtnOption('57px')}>
            <input type="checkbox" id="second-option" />
            <label htmlFor="second-option">2학년</label>
          </div>
          <div css={inputBtnOption('57px')}>
            <input type="checkbox" id="third-option" />
            <label htmlFor="third-option">3학년</label>
          </div>
          <div css={inputBtnOption('57px')}>
            <input type="checkbox" id="fourth-option" />
            <label htmlFor="fourth-option">4학년 이상</label>
          </div>
        </main>
        <p css={supportMsg}>※ 우대하는 학년을 선택해 주세요(중복 선택 가능)</p>
      </div>
    </div>
  );
};

export default GradeField;

const supportMsg = css`
  width: 100%;
  text-align: left;
  font-size: 13px;
`;
