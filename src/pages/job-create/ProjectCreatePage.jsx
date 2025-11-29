/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ProjectCreateForm from './components/form/ProjectCreateForm';
import InputcheckList from './components/InputCheckList';
import useCreateJobStore from '@/stores/useCreateJobStore';
import DOMPurify from 'dompurify';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '@/api/api';
import { mergePositionData } from '@/util/mergePositionData';

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
    updateFromProjectResponse,
  } = useCreateJobStore();

  // 값이 오면 수정 없으면 최초 등록 상황
  const location = useLocation();
  const { editMode, postId } = location.state ?? '';

  // 수정 상황일 때의 기존 position 상태 기억용(수정 정보를 서버에 보낼 때 모집현황을 첨부하기 위함)
  const [prevPos, setPrevPos] = useState([]);

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
  const formattedData = mergePositionData(prevPos, projectPositions);
  const payload = {
    title: title.trim(),
    content: DOMPurify.sanitize(content),
    purpose: purpose?.name,
    meetingType: meetingType.trim(),
    authorPosition: authorPosition?.name,
    positions: editMode ? formattedData : projectPositions,
    skills: techStack.map((item) => item.name),
    grades: grades,
    period: {
      startDate: startDate,
      endDate: endDate,
    },
    deadline: deadline.trim() + 'T09:02:38.458Z',
  };

  //  공고 수정하기 기능을 위한 기존 데이터 불러오기
  useEffect(() => {
    async function getProjectInfo() {
      if (editMode == null) return;

      try {
        const res = await api.get(`/api/v1/projects/${postId}`);
        updateFromProjectResponse(res.data.data);
        setPrevPos(res.data.data.positions);
      } catch (e) {
        console.error(e);
        alert(`**조회 실패** \n${e.response.data.message}`);
      }
    }
    getProjectInfo();
  }, []);

  // ui용 position 입력 상태
  const initPositionState = [
    { id: 1, position: '', personnel: '', isAdded: false, isDisable: false },
  ];
  const [positionState, setPositionState] = useState(initPositionState);

  // 수정 시 positionState를 유저가 기존에 입력한 값으로 초기화
  const initializedRef = useRef(false);
  useEffect(() => {
    if (!editMode) return;
    if (projectPositions.length === 0) return;
    if (initializedRef.current) return;

    setPositionState(
      projectPositions.map((item, idx) => ({
        id: Date.now() + idx,
        position: item.position,
        personnel: item.maxParticipants,
        isAdded: true,
        isDisable: true,
      }))
    );

    initializedRef.current = true;
  }, [editMode, projectPositions]);

  // 언마운트 or 수정->등록으로 이동할 때 입력 상태 초기화
  useEffect(() => {
    setPositionState(initPositionState);
    reset();

    return () => {
      reset();
    };
  }, [location.pathname]);

  return (
    <div css={projectCreateContainer}>
      <header>[프로젝트] 공고 작성</header>
      <main>
        <ProjectCreateForm
          isFormValid={isFormValid}
          payload={payload}
          consent={consentState}
          setConsent={setConsentState}
          positionState={positionState}
          setPositionState={setPositionState}
          editMode={editMode}
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
