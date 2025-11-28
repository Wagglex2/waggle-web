/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HomeworkCreateForm from './components/form/HomeworkCreateForm';
import InputcheckList from './components/InputCheckList';
import useCreateJobStore from '@/stores/useCreateJobStore';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

const HomeworkCreatePage = () => {
  const {
    title,
    content,
    maxParticipants,
    grades,
    deadline,
    department,
    lecture,
    lectureCode,
    reset,
  } = useCreateJobStore();

  // 동의란 체크 상태
  const [consentState, setConsentState] = useState({
    first: false,
    sec: false,
  });

  // 공고 작성 현황 확인용 & 버튼 화성화
  const consentInputState = consentState.first && consentState.sec;
  const titleInputState = title.trim() !== '';
  const deadlineInputState = deadline.trim() !== '';
  const detailInputState = content.replace(/<[^>]+>/g, '').trim() !== '';

  const infoInputState =
    grades.length > 0 &&
    department.trim() !== '' &&
    lecture.trim() !== '' &&
    lectureCode.trim() !== '' &&
    Number(maxParticipants) >= 1;

  // 폼 제출 버튼 활성화 여부
  const isFormValid =
    consentInputState &&
    titleInputState &&
    deadlineInputState &&
    detailInputState &&
    infoInputState;

  // 서버 전달용 데이터
  const payload = {
    title: title.trim(),
    content: DOMPurify.sanitize(content),
    deadline: deadline.trim() + 'T09:02:38.458Z',
    department: department.trim(),
    lecture: lecture.trim(),
    lectureCode: lectureCode.trim(),
    grades: grades,
    maxParticipants: Number(maxParticipants),
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div css={homeworkCreateContainer}>
      <header>[과제] 공고 작성</header>
      <main>
        <HomeworkCreateForm
          isFormValid={isFormValid}
          payload={payload}
          consent={consentState}
          setConsent={setConsentState}
        />
        <InputcheckList
          category={'과제'}
          title={titleInputState}
          deadline={deadlineInputState}
          info={infoInputState}
          desc={detailInputState}
        />
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
