/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { field, fieldContent, inputBtnOption } from '../fieldStyle';
import useCreateJobStore from '@/stores/useCreateJobStore';
const GradeField = () => {
  const { grades, setGrades } = useCreateJobStore();

  function toggleGrade(value) {
    setGrades((prev) => {
      const exists = prev.some((item) => item.grade === value);

      if (exists) {
        return prev.filter((item) => item.grade !== value);
      } else {
        return [...prev, { grade: value }];
      }
    });
  }

  return (
    <div css={field}>
      <p className="field-name">학년</p>
      <div css={fieldContent('_', 'column')}>
        <main>
          <div css={inputBtnOption('57px')}>
            <input
              type="checkbox"
              id="first-option"
              checked={grades.some((item) => item.grade === 1)}
              onChange={() => toggleGrade(1)}
            />
            <label htmlFor="first-option">1학년</label>
          </div>

          <div css={inputBtnOption('57px')}>
            <input
              type="checkbox"
              id="second-option"
              checked={grades.some((item) => item.grade === 2)}
              onChange={() => toggleGrade(2)}
            />
            <label htmlFor="second-option">2학년</label>
          </div>

          <div css={inputBtnOption('57px')}>
            <input
              type="checkbox"
              id="third-option"
              checked={grades.some((item) => item.grade === 3)}
              onChange={() => toggleGrade(3)}
            />
            <label htmlFor="third-option">3학년</label>
          </div>

          <div css={inputBtnOption('57px')}>
            <input
              type="checkbox"
              id="fourth-option"
              checked={grades.some((item) => item.grade === 4)}
              onChange={() => toggleGrade(4)}
            />
            <label htmlFor="fourth-option">4학년 이상</label>
          </div>
        </main>

        <p css={supportMsg}>※ 우대하는 학년을 선택해 주세요(중복 선택 가능)</p>
      </div>
    </div>
  );
};

export default GradeField;

const supportMsg = css`
  width: 100%;
  text-align: left;
  font-size: 13px;
`;
