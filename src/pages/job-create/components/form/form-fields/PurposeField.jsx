/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';
import DropDown from '@/components/dropdown/DropDown';
import { purposeOptions } from '@/data/options';

const PurposeField = ({ dropdownLabel }) => {
  return (
    <div css={field}>
      <p className="field-name">목적</p>
      <div css={fieldContent}>
        <DropDown label={dropdownLabel} options={purposeOptions} buttonWidth={'200px'} />
      </div>
    </div>
  );
};

export default PurposeField;
