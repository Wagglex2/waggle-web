/** @jsxImportSource @emotion/react */
import MyDetails from './application-form-fields/MyDetails';
import MyGrade from './application-form-fields/MyGrade';
import PossibleMethod from './application-form-fields/PossibleMethod';
import { applicationForm } from './applicationFormStyle';
import ApplyBtn from './ApplyBtn';

const StudyApplicationForm = () => {
  return (
    <form css={applicationForm}>
      <h4 className="application-title text-green">[스터디] 지원서</h4>
      <PossibleMethod />
      <MyGrade />
      <MyDetails />

      <ApplyBtn />
    </form>
  );
};

export default StudyApplicationForm;
