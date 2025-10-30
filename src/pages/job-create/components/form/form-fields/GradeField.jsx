/** @jsxImportSource @emotion/react */
import { field, fieldContent, inputBtnOption } from '../fieldStyle';

const GradeField = () => {
  return (
    <div css={field}>
      <p className="field-name">학년</p>
      <div css={fieldContent}>
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
      </div>
    </div>
  );
};

export default GradeField;
