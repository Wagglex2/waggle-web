/** @jsxImportSource @emotion/react */
import useApplicationFormStore from '@/stores/apply/useApplicationFormStore';
import MyDetails from './application-form-fields/MyDetails';
import MyGrade from './application-form-fields/MyGrade';
import PossibleMethod from './application-form-fields/PossibleMethod';
import PossiblePosition from './application-form-fields/PossiblePosition';
import PossibleTech from './application-form-fields/PossibleTech';
import { applicationForm } from './applicationFormStyle';
import ApplyBtn from './ApplyBtn';
import { useEffect } from 'react';

const ProjectApplicationForm = () => {
  const { meetingType, grade, position, techStack, description, reset } = useApplicationFormStore();

  const payload = {
    category: 'PROJECT',
    meetingType: meetingType ?? null,
    grade: grade?.name ?? null,
    content: description?.trim() ?? '',
    position: position?.name ?? null,
    skills: Array.isArray(techStack) ? techStack.map((skill) => skill?.name).filter(Boolean) : [],
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <form css={applicationForm}>
      <h4 className="application-title text-green">[프로젝트] 지원서</h4>
      <PossibleMethod />
      <MyGrade />
      <PossiblePosition />
      <PossibleTech />
      <MyDetails />

      <ApplyBtn
        isEnabled={
          meetingType !== null &&
          grade !== null &&
          position !== null &&
          techStack.length > 0 &&
          description.trim() !== ''
        }
        data={payload}
        reset={reset}
      />
    </form>
  );
};

export default ProjectApplicationForm;
