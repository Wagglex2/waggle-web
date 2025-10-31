/** @jsxImportSource @emotion/react */
import { formField, fieldLabelBox } from '../applicationFormStyle';
import { positionOptions } from '@/data/options';
import DropDown from '@/components/dropdown/DropDown';

const PossiblePosition = () => {
  return (
    <div css={formField}>
      <div css={fieldLabelBox}>
        <p className="field-title text-green">포지션</p>
        <p className="field-description">*지원할 포지션을 선택해 주세요</p>
      </div>
      <DropDown
        label="포지션"
        options={positionOptions}
        buttonWidth={'100%'}
        dropDownWidth={'100%'}
      />
    </div>
  );
};

export default PossiblePosition;
