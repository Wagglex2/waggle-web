/** @jsxImportSource @emotion/react */
import MyDetails from './application-form-fields/MyDetails';
import MyGrade from './application-form-fields/MyGrade';
import PossibleMethod from './application-form-fields/PossibleMethod';
import { applicationForm } from './applicationFormStyle';
import ApplyBtn from './ApplyBtn';

const HomeworkApplicationForm = () => {
  return (
    <form css={applicationForm}>
      <h4 className="application-title text-green">[과제] 지원서</h4>
      <PossibleMethod />
      <MyGrade />
      <MyDetails />

      <div>
        <p className="warning-msg">※본인이 수강하는 과목이 맞는지 반드시 확인하세요 </p>
        <ApplyBtn />
      </div>
    </form>
  );
};

export default HomeworkApplicationForm;
