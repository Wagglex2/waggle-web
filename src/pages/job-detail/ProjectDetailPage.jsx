/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import ProjectInfo from './components/job-info/ProjectInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import ProjectApplicationForm from './components/application-form/ProjectApplicationForm';

const positions = [
  {
    name: 'FRONTEND',
    desc: '프론트엔드',
    maxParticipants: 3,
    currentParticipants: 1,
  },
  {
    name: 'BACKEND',
    desc: '백엔드',
    maxParticipants: 2,
    currentParticipants: 2,
  },
  {
    name: 'DESIGNER',
    desc: '디자이너',
    maxParticipants: 2,
    currentParticipants: 1,
  },
  {
    name: 'PM',
    desc: 'PM',
    maxParticipants: 1,
    currentParticipants: 1,
  },
  {
    name: 'MOBILE',
    desc: '모바일',
    maxParticipants: 2,
    currentParticipants: 0,
  },
];

const ProjectDetailPage = () => {
  return (
    <div css={wrap}>
      <JobListLinkBtn category={'프로젝트'} />
      <main css={mainContent}>
        <ProjectInfo positions={positions} />
        <ProjectApplicationForm />
      </main>
    </div>
  );
};

export default ProjectDetailPage;

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
