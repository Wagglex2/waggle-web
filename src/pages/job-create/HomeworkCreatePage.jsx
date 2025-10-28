/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HomeworkCreateForm from './components/form/HomeworkCreateForm';
import InputcheckList from './components/InputCheckList';

const HomeworkCreatePage = () => {
  return (
    <div css={homeworkCreateContainer}>
      <header>[과제] 공고 작성</header>
      <main>
        <HomeworkCreateForm />
        <InputcheckList />
      </main>
    </div>
  );
};

export default HomeworkCreatePage;

const homeworkCreateContainer = css`
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
