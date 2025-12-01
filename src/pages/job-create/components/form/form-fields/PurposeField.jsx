/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';
import DropDown from '@/components/dropdown/DropDown';
import { purposeOptions } from '@/data/options';
import useCreateJobStore from '@/stores/useCreateJobStore';

const PurposeField = ({ dropdownLabel }) => {
  const { purpose, setPurpose } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">목적</p>
      <div css={fieldContent}>
        <DropDown
          label={dropdownLabel}
          options={purposeOptions}
          buttonWidth={'200px'}
          value={purpose}
          onChange={setPurpose}
        />
      </div>
    </div>
  );
};

export default PurposeField;
