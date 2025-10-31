/** @jsxImportSource @emotion/react */
import { formField, fieldLabelBox } from '../applicationFormStyle';
import { techStackOptions } from '@/data/options';
import MultiSelectDropDown from '@/components/dropdown/MultiSelectDropdown';

const PossibleTech = () => {
  return (
    <div css={formField}>
      <div css={fieldLabelBox}>
        <p className="field-title text-green">기술</p>
        <p className="field-description">*사용가능한 언어 및 도구를 선택해 주세요</p>
      </div>
      <MultiSelectDropDown label="기술" options={techStackOptions} buttonWidth={'100%'} />
    </div>
  );
};

export default PossibleTech;
