/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent } from '../fieldStyle';

const CourseCodeField = () => {
  const { lectureCode, setLectureCode } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">과목코드</p>
      <div css={fieldContent('220px')}>
        <input
          type="text"
          placeholder="과제의 과목코드를 입력해 주세요"
          value={lectureCode}
          onChange={(e) => setLectureCode(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CourseCodeField;
