/** @jsxImportSource @emotion/react */
import { formItem, itemLabelBox, itemContent, inputBtnOption } from '../applicationFormStyle';

const PossibleMethod = () => {
  return (
    <div css={formItem}>
      <div css={itemLabelBox}>
        <p className="item-title text-green">진행방식</p>
        <p className="item-description">*참여 가능한 진행방식을 선택해 주세요</p>
      </div>
      <div css={itemContent}>
        <div css={inputBtnOption}>
          <input type="radio" name="progress-options" id="first-option" />
          <label htmlFor="first-option">온라인</label>
        </div>
        <div css={inputBtnOption}>
          <input type="radio" name="progress-options" id="second-option" />
          <label htmlFor="second-option">오프라인</label>
        </div>
        <div css={inputBtnOption}>
          <input type="radio" name="progress-options" id="third-option" />
          <label htmlFor="third-option">온/오프라인</label>
        </div>
      </div>
    </div>
  );
};

export default PossibleMethod;
