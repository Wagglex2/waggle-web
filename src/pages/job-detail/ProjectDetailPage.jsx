/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
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
