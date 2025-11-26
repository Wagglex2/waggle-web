/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';

const DepartmentField = () => {
  return (
    <div css={field}>
      <p className="field-name">학과</p>
      <div css={fieldContent('220px')}>
        <input type="text" placeholder="어떤 학과의 과제인지 알려주세요" />
      </div>
    </div>
  );
};

export default DepartmentField;
