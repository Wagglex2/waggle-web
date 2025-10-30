/** @jsxImportSource @emotion/react */
import { noLabelField } from '../fieldStyle';

const DeadLineField = () => {
  return (
    <div css={noLabelField('250px')}>
      <input type="date" />
    </div>
  );
};

export default DeadLineField;
