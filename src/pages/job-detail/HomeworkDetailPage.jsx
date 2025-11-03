/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
import HomeworkInfo from './components/job-info/HomeworkInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import HomeworkApplicationForm from './components/application-form/HomeworkApplicationForm';

const HomeworkDetailPage = () => {
  return (
    <div css={wrap}>
      <JobListLinkBtn category={'과제'} />
      <main css={mainContent}>
        <HomeworkInfo />
        <HomeworkApplicationForm />
      </main>
    </div>
  );
};

export default HomeworkDetailPage;
