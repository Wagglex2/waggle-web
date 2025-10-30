/** @jsxImportSource @emotion/react */
import { field, fieldContent, inputBtnOption } from '../fieldStyle';

const MethodField = () => {
  return (
    <div css={field}>
      <p className="field-name">진행방식</p>
      <div css={fieldContent}>
        <div css={inputBtnOption('100px')}>
          <input type="radio" name="progress-options" id="first-option" />
          <label htmlFor="first-option">온라인</label>
        </div>
        <div css={inputBtnOption('100px')}>
          <input type="radio" name="progress-options" id="second-option" />
          <label htmlFor="second-option">오프라인</label>
        </div>
        <div css={inputBtnOption('100px')}>
          <input type="radio" name="progress-options" id="third-option" />
          <label htmlFor="third-option">온/오프라인</label>
        </div>
      </div>
    </div>
  );
};

export default MethodField;
