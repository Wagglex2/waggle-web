/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HomeworkCreateForm from './components/form/HomeworkCreateForm';
import InputcheckList from './components/InputCheckList';
import useCreateJobStore from '@/stores/useCreateJobStore';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/api/api';

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
    updateFromHomeworkResponse,
  } = useCreateJobStore();

  // 값이 오면 수정 없으면 최초 등록 상황
  const location = useLocation();
  const { editMode, postId } = location.state ?? '';

  // 수정 상황일 때의 기존 모집 인원 정보 기억용(수정 정보를 서버에 보낼 때 모집현황을 첨부하기 위함)
  const [prevParticipant, setPrevParticipant] = useState([]);

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
  const formattedData = {
    maxParticipants: Number(maxParticipants),
    currParticipants: prevParticipant.currParticipants,
  };
  const participantKey = editMode ? 'participants' : 'maxParticipants';
  const payload = {
    title: title.trim(),
    content: DOMPurify.sanitize(content),
    deadline: deadline.trim() + 'T09:02:38.458Z',
    department: department.trim(),
    lecture: lecture.trim(),
    lectureCode: lectureCode.trim(),
    grades: grades,
    [participantKey]: editMode ? formattedData : Number(maxParticipants),
  };

  //  공고 수정하기 기능을 위한 기존 데이터 불러오기
  useEffect(() => {
    async function getHomeworkInfo() {
      if (editMode == null) return;

      try {
        const res = await api.get(`/api/v1/assignments/${postId}`);
        updateFromHomeworkResponse(res.data.data);
        setPrevParticipant(res.data.data.participants);
      } catch (e) {
        console.error(e);
        alert(`**조회 실패** \n${e.response.data.message}`);
      }
    }
    getHomeworkInfo();
  }, []);

  // 언마운트 or 수정->등록으로 이동할 때 입력 상태 초기화
  useEffect(() => {
    reset();

    return () => {
      reset();
    };
  }, [location.pathname]);

  return (
    <div css={homeworkCreateContainer}>
      <header>[과제] 공고 작성</header>
      <main>
        <HomeworkCreateForm
          isFormValid={isFormValid}
          payload={payload}
          consent={consentState}
          setConsent={setConsentState}
          editMode={editMode}
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
