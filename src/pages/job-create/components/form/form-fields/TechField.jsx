/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';
import MultiSelectDropDown from '@/components/dropdown/MultiSelectDropdown';
import { techStackOptions } from '@/data/options';

const TechField = () => {
  return (
    <div css={field}>
      <p className="field-name">기술</p>
      <div css={fieldContent}>
        <MultiSelectDropDown label="기술" options={techStackOptions} buttonWidth={'440px'} />
      </div>
    </div>
  );
};

export default TechField;
