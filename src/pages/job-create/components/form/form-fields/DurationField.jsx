/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent, separator } from '../fieldStyle';

const DurationField = () => {
  const { startDate, setStartDate, endDate, setEndDate } = useCreateJobStore();

  function hadleStartDate(inputValue) {
    if (endDate !== '' && inputValue > endDate) {
      alert('시작일은 마감일보다 빨라야 합니다.');
      setStartDate('');
      return;
    }

    setStartDate(inputValue);
  }

  function handleEndDate(inputValue) {
    if (startDate !== '' && inputValue < startDate) {
      alert('마감일은 시작일보다 늦어야 합니다.');
      setEndDate('');
      return;
    }

    setEndDate(inputValue);
  }

  return (
    <div css={field}>
      <p className="field-name">진행기간</p>
      <div css={fieldContent('200px')}>
        <input type="date" value={startDate} onChange={(e) => hadleStartDate(e.target.value)} />
        <span css={separator}>~</span>
        <input type="date" value={endDate} onChange={(e) => handleEndDate(e.target.value)} />
      </div>
    </div>
  );
};

export default DurationField;
