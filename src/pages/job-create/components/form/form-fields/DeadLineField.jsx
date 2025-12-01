/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { noLabelField } from '../fieldStyle';

const DeadLineField = () => {
  const { deadline, setDeadline } = useCreateJobStore();

  return (
    <div css={noLabelField('250px')}>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
    </div>
  );
};

export default DeadLineField;
