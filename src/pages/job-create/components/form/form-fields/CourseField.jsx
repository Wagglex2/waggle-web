/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent } from '../fieldStyle';

const CourseField = () => {
  const { lecture, setLecture } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">과목</p>
      <div css={fieldContent('220px')}>
        <input
          type="text"
          placeholder="과목의 과제인지 알려주세요"
          value={lecture}
          onChange={(e) => setLecture(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CourseField;
