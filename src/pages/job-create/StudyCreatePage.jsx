/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StudyCreateForm from './components/form/StudyCreateForm';
import InputcheckList from './components/InputCheckList';

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
