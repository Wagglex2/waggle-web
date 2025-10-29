/** @jsxImportSource @emotion/react */
import { field, fieldContent, separator } from '../fieldStyle';

const DurationField = () => {
  return (
    <div css={field}>
      <p className="field-name">진행기간</p>
      <div css={fieldContent('200px')}>
        <input type="date" />
        <span css={separator}>~</span>
        <input type="date" />
      </div>
    </div>
  );
};

export default DurationField;
