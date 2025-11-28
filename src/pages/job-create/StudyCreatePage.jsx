/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StudyCreateForm from './components/form/StudyCreateForm';
import InputcheckList from './components/InputCheckList';
import useCreateJobStore from '@/stores/useCreateJobStore';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

const StudyCreatePage = () => {
  const { title, content, techStack, startDate, endDate, maxParticipants, deadline, reset } =
    useCreateJobStore();

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
    startDate.trim() !== '' &&
    endDate.trim() !== '' &&
    Number(maxParticipants) >= 1 &&
    techStack.length > 0;

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
    skills: techStack.map((item) => item.name),
    maxParticipants: Number(maxParticipants),
    period: {
      startDate: startDate,
      endDate: endDate,
    },
    deadline: deadline.trim() + 'T09:02:38.458Z',
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <div css={studyCreateContainer}>
      <header>[스터디] 공고 작성</header>
      <main>
        <StudyCreateForm
          isFormValid={isFormValid}
          payload={payload}
          consent={consentState}
          setConsent={setConsentState}
        />
        <InputcheckList
          category={'스터디'}
          title={titleInputState}
          deadline={deadlineInputState}
          info={infoInputState}
          desc={detailInputState}
        />
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
