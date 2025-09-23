/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ProjectCreateForm from '@/features/job-create/ProjectCreateForm';
import InputcheckList from '@/features/job-create/components/InputCheckList';

const ProjectCreatePage = () => {
  return (
    <div css={projectCreateContainer}>
      <header>[프로젝트] 공고 작성</header>
      <main>
        <ProjectCreateForm />
        <InputcheckList />
      </main>
    </div>
  );
};

export default ProjectCreatePage;

const projectCreateContainer = css`
  font-family: 'nanumR';
  header {
    font-size: 24px;
    font-family: 'nanumEB';
    width: 900px;
    margin: 60px auto;
  }

  main {
    display: flex;
    justify-content: center;
  }
`;
