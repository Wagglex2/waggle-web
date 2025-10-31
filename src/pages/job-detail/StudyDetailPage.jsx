/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
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

const wrap = css`
  font-family: 'nanumR';
  padding: 50px 0;

  .text-green {
    color: ${colors.tertiary};
  }

  .navigation-btn {
    background-color: #fef1b2;
    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    color: ${colors.gray[400]};
    font-size: 13px;
    font-family: 'nanumB';
    padding: 10px 10px;
    margin-left: 310px;
    display: flex;
    align-items: center;
  }
`;

const mainContent = css`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
