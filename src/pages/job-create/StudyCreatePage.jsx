/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InputcheckList from '@/features/job-create/components/InputCheckList';
import StudyCreateForm from '@/features/job-create/StudyCreateForm';

const StudyCreatePage = () => {
  return (
    <div css={studyCreateContainer}>
      <header>[스터디] 공고 작성</header>
      <main>
        <StudyCreateForm />
        <InputcheckList />
      </main>
    </div>
  );
};

export default StudyCreatePage;

const studyCreateContainer = css`
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
