/** @jsxImportSource @emotion/react */
import { field, fieldContent, separator, unit } from '../fieldStyle';
import DropDown from '@/components/dropdown/DropDown';

const PositionField = () => {
  return (
    <div css={field}>
      <p className="field-name">포지션</p>
      <div css={fieldContent('200px')}>
        <DropDown label="멤버" buttonWidth={'200px'} />
        <span css={separator}>:</span>
        <input type="text" placeholder="모집 인원을 입력해 주세요" />
        <span css={unit}>명</span>
      </div>
    </div>
  );
};

export default PositionField;
