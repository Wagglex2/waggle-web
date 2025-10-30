/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';

const CourseCodeField = () => {
  return (
    <div css={field}>
      <p className="field-name">과목코드</p>
      <div css={fieldContent('200px')}>
        <input type="text" placeholder="과제의 과목코드를 입력해 주세요" />
      </div>
    </div>
  );
};

export default CourseCodeField;
