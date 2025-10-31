/** @jsxImportSource @emotion/react */
import MyDetails from './application-form-fields/MyDetails';
import MyGrade from './application-form-fields/MyGrade';
import PossibleMethod from './application-form-fields/PossibleMethod';
import PossiblePosition from './application-form-fields/PossiblePosition';
import PossibleTech from './application-form-fields/PossibleTech';
import { applicationForm } from './applicationFormStyle';
import ApplyBtn from './ApplyBtn';

const ProjectApplicationForm = () => {
  return (
    <form css={applicationForm}>
      <h4 className="application-title text-green">[프로젝트] 지원서</h4>
      <PossibleMethod />
      <MyGrade />
      <PossiblePosition />
      <PossibleTech />
      <MyDetails />

      <ApplyBtn />
    </form>
  );
};

export default ProjectApplicationForm;
