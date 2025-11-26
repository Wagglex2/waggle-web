/** @jsxImportSource @emotion/react */
import useApplicationFormStore from '@/stores/useApplicationFormStore';
import MyDetails from './application-form-fields/MyDetails';
import MyGrade from './application-form-fields/MyGrade';
import PossibleMethod from './application-form-fields/PossibleMethod';
import { applicationForm } from './applicationFormStyle';
import ApplyBtn from './ApplyBtn';
import { useEffect } from 'react';

const StudyApplicationForm = () => {
  const { meetingType, grade, description, reset } = useApplicationFormStore();

  const payload = {
    category: 'STUDY',
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
      <h4 className="application-title text-green">[스터디] 지원서</h4>
      <PossibleMethod />
      <MyGrade />
      <MyDetails />

      <ApplyBtn
        isEnabled={meetingType !== null && grade !== null && description.trim() !== ''}
        data={payload}
        reset={reset}
      />
    </form>
  );
};

export default StudyApplicationForm;
