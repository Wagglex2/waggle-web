/** @jsxImportSource @emotion/react */
import { formItem, itemLabelBox } from '../applicationFormStyle';
import DropDown from '@/components/dropdown/DropDown';

const grade = ['1학년', '2학년', '3학년', '4학년 이상'];

const MyGrade = () => {
  return (
    <div css={formItem}>
      <div css={itemLabelBox}>
        <p className="item-title text-green">학년</p>
        <p className="item-description">*본인의 현재 학년을 선택해 주세요</p>
      </div>
      <DropDown label="학년" options={grade} buttonWidth={'100%'} dropDownWidth={'100%'} />
    </div>
  );
};

export default MyGrade;
