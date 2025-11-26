/** @jsxImportSource @emotion/react */
import useApplicationFormStore from '@/stores/useApplicationFormStore';
import { formField, fieldLabelBox } from '../applicationFormStyle';
import DropDown from '@/components/dropdown/DropDown';

const gradeList = [
  { desc: '1학년', name: 1 },
  { desc: '2학년', name: 2 },
  { desc: '3학년', name: 3 },
  { desc: '4학년', name: 4 },
];

const MyGrade = () => {
  const { grade, setGrade } = useApplicationFormStore();

  return (
    <div css={formField}>
      <div css={fieldLabelBox}>
        <p className="field-title text-green">학년</p>
        <p className="field-description">*본인의 현재 학년을 선택해 주세요</p>
      </div>
      <DropDown
        label="학년"
        options={gradeList}
        buttonWidth={'100%'}
        dropDownWidth={'100%'}
        value={grade}
        onChange={setGrade}
      />
    </div>
  );
};

export default MyGrade;
