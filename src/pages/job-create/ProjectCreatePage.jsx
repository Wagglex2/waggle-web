/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ProjectCreateForm from './components/form/ProjectCreateForm';
import InputcheckList from './components/InputCheckList';
import useCreateJobStore from '@/stores/useCreateJobStore';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';

const ProjectCreatePage = () => {
  const {
    title,
    content,
    purpose,
    meetingType,
    projectPositions,
    techStack,
    grades,
    startDate,
    endDate,
    deadline,
    authorPosition,
    reset,
  } = useCreateJobStore();

  // 동의란 체크 상태
  const [consentState, setConsentState] = useState({
    first: false,
    sec: false,
  });

  // 공고 작성 현황 확인용 & 버튼 화성화
  const consentInputState = consentState.first && consentState.sec;
  const purposeInputState = purpose?.name;
  const titleInputState = title.trim() !== '';
  const deadlineInputState = deadline.trim() !== '';
  const detailInputState = content.replace(/<[^>]+>/g, '').trim() !== '';

  const infoInputState =
    startDate.trim() !== '' &&
    endDate.trim() !== '' &&
    meetingType.trim() !== '' &&
    grades.length > 0 &&
    authorPosition?.name &&
    projectPositions?.length > 0 &&
    techStack.length > 0;

  // 폼 제출 버튼 활성화 여부
  const isFormValid =
    consentInputState &&
    purposeInputState &&
    titleInputState &&
    deadlineInputState &&
    detailInputState &&
    infoInputState;

  // 서버 전달용 데이터
  const payload = {
    title: title.trim(),
    content: DOMPurify.sanitize(content),
    purpose: purpose?.name,
    meetingType: meetingType.trim(),
    authorPosition: authorPosition?.name,
    positions: projectPositions,
    skills: techStack.map((item) => item.name),
    grades: grades,
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
    <div css={projectCreateContainer}>
      <header>[프로젝트] 공고 작성</header>
      <main>
        <ProjectCreateForm
          isFormValid={isFormValid}
          payload={payload}
          consent={consentState}
          setConsent={setConsentState}
        />
        <InputcheckList
          category={'프로젝트'}
          purpose={purposeInputState}
          title={titleInputState}
          deadline={deadlineInputState}
          info={infoInputState}
          desc={detailInputState}
        />
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
