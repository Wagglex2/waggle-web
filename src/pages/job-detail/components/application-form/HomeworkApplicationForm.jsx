/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import MyDetails from './application-form-fields/MyDetails';
import MyGrade from './application-form-fields/MyGrade';
import PossibleMethod from './application-form-fields/PossibleMethod';
import { applicationForm } from './applicationFormStyle';
import ApplyBtn from './ApplyBtn';
import useApplicationFormStore from '@/stores/apply/useApplicationFormStore';
import { useEffect } from 'react';

const HomeworkApplicationForm = () => {
  const { meetingType, grade, description, reset } = useApplicationFormStore();

  const payload = {
    category: 'ASSIGNMENT',
    meetingType: meetingType ?? null,
    grade: grade?.name ?? null,
    content: description?.trim() ?? '',
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <form css={applicationForm}>
      <h4 className="application-title text-green">[과제] 지원서</h4>
      <PossibleMethod />
      <MyGrade />
      <MyDetails />

      <div>
        <p css={warningMsgStyle}>※본인이 수강하는 과목이 맞는지 반드시 확인하세요 </p>
        <ApplyBtn
          isEnabled={meetingType !== null && grade !== null && description.trim() !== ''}
          data={payload}
          reset={reset}
        />
      </div>
    </form>
  );
};

export default HomeworkApplicationForm;

const warningMsgStyle = css`
  color: #c00000;
  font-size: 13px;
  text-align: center;
  margin-bottom: 8px;
`;
