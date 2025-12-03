/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent, separator } from '../fieldStyle';

const DurationField = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">진행기간</p>
      <div css={fieldContent('200px')}>
        <input
          type="date"
          value={startDate}
          max={endDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span css={separator}>~</span>
        <input
          type="date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DurationField;
