/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';

const CourseField = () => {
  return (
    <div css={field}>
      <p className="field-name">과목</p>
      <div css={fieldContent('220px')}>
        <input type="text" placeholder="과목의 과제인지 알려주세요" />
      </div>
    </div>
  );
};

export default CourseField;
