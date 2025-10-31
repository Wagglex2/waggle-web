/** @jsxImportSource @emotion/react */
import { formItem, itemLabelBox } from '../applicationFormStyle';
import { positionOptions } from '@/data/options';
import DropDown from '@/components/dropdown/DropDown';

const PossiblePosition = () => {
  return (
    <div css={formItem}>
      <div css={itemLabelBox}>
        <p className="item-title text-green">포지션</p>
        <p className="item-description">*지원할 포지션을 선택해 주세요</p>
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
