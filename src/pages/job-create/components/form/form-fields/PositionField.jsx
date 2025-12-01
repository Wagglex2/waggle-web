/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent, separator, unit } from '../fieldStyle';
import DropDown from '@/components/dropdown/DropDown';
const PositionField = () => {
  const { maxParticipants, setMaxParticipants } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">포지션</p>
      <div css={fieldContent('205px')}>
        <DropDown label="멤버" buttonWidth={'200px'} />
        <span css={separator}>:</span>
        <input
          type="number"
          placeholder="모집 인원을 입력해 주세요"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value ?? '')}
        />
        <span css={unit}>명</span>
      </div>
    </div>
  );
};

export default PositionField;
