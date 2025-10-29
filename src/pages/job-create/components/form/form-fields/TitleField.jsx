/** @jsxImportSource @emotion/react */
import { noLabelField } from '../fieldStyle';

const TitleField = () => {
  return (
    <div css={noLabelField('100%')}>
      <input type="text" placeholder="공고 제목을 적어주세요" />
    </div>
  );
};

export default TitleField;
