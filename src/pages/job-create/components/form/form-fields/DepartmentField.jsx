/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent } from '../fieldStyle';

const DepartmentField = () => {
  const { department, setDepartment } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">학과</p>
      <div css={fieldContent('220px')}>
        <input
          type="text"
          placeholder="어떤 학과의 과제인지 알려주세요"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DepartmentField;
