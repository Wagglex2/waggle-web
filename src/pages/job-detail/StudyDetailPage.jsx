/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
import StudyInfo from './components/job-info/StudyInfo';
import StudyApplicationForm from './components/application-form/StudyApplicationForm';
import JobListLinkBtn from './components/JobListLinkBtn';

const StudyDetailPage = () => {
  return (
    <div css={wrap}>
      <JobListLinkBtn category={'스터디'} />
      <main css={mainContent}>
        <StudyInfo />
        <StudyApplicationForm />
      </main>
    </div>
  );
};

export default StudyDetailPage;
