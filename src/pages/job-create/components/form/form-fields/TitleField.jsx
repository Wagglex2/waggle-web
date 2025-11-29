/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { noLabelField } from '../fieldStyle';
const TitleField = () => {
  const { title, setTitle } = useCreateJobStore();

  return (
    <div css={noLabelField('100%')}>
      <input
        type="text"
        placeholder="공고 제목을 적어주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
};

export default TitleField;
