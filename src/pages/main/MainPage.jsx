/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import HexagonCard from './components/HexagonCard';
import bgImg from '../../assets/img/main-bg.png';
import MainPurposeFilter from './components/filter/MainPurposeFilter';
import MainPositionFilter from './components/filter/MainPositionFilter';
import { useState, useEffect, useMemo } from 'react';
import UserInfoModal from '../../layout/components/UserInfoModal';
import api from '@/api/api';
import useAuthStore from '@/stores/useAuthStore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';
import { colors } from '@/styles/theme';

const cardLocation = [
  // 1
  { top: '0', left: '0' },
  { top: '0', left: '453px' },
  { top: '0', left: '905px' },

  // 2
  { top: '104px', left: '226px' },
  { top: '104px', left: '679px' },

  // 3
  { top: '208px', left: '0' },
  { top: '208px', left: '453px' },
  { top: '208px', left: '905px' },

  // 4
  { top: '312px', left: '679px' },

  // 5
  { top: '416px', left: '0' },
  { top: '416px', left: '453px' },

  // 6
  { top: '520px', left: '226px' },
  { top: '520px', left: '679px' },

  // 7
  { top: '624px', left: '0' },
  { top: '624px', left: '453px' },
  { top: '624px', left: '905px' },
];

const MainPage = () => {
  // 유저 기본정보 입력 관련
  const [openModal, setOpenModal] = useState(false);
  const { userInfoChecking, setUserInfoChecking } = useAuthStore();

  useEffect(() => {
    if (userInfoChecking) return;
    const checkUserInfo = async () => {
      try {
        const response = await api.get('/api/v1/users/me');
        const data = response.data.data;

        console.log('User info:', data);

        const hasGrade = data.grade && data.grade > 0;
        const hasPosition = data.position && data.position.name;
        const hasSkills = data.skills && data.skills.length > 0;
        const hasIntro = data.shortIntro && data.shortIntro.trim() !== '';

        const isMissingInfo = !hasGrade || !hasPosition || !hasSkills || !hasIntro;

        console.log('Missing info check:', {
          hasGrade,
          hasPosition,
          hasSkills,
          hasIntro,
          isMissingInfo,
        });

        setOpenModal(isMissingInfo);
        if (!isMissingInfo) setUserInfoChecking(true);
      } catch (error) {
        console.error('User info fetch error:', error);
        setOpenModal(true);
      }
    };

    checkUserInfo();
  }, []);

  const handleModalClose = () => {
    setOpenModal(false);
    setUserInfoChecking(true);
  };

  //  메인페이지
  const navigate = useNavigate();
  const [selectedPosition, setSelectedPosition] = useState([]); //선택된 포지션 리스트
  const [selectedPurpose, setSelectedPurpose] = useState('목적'); // 선택된 목적
  const [originalProjectList, setOriginalProjectList] = useState([]); // 서버에서 받아온 리스트 원본

  // 오늘의 공고 목록 가져오기 api
  useEffect(() => {
    async function getTodaysJobs() {
      try {
        const res = await api.get('/api/v1/projects?status=recruiting&size=16');
        const projects = res.data.data.content;
        setOriginalProjectList(projects.map((item) => ({ ...item, isSelected: 0 })));
      } catch (e) {
        console.error(e);
      }
    }

    getTodaysJobs();
  }, []);

  // 공고 필터링
  const filteredProjectList = useMemo(() => {
    // 필터가 활성화되었는지 확인
    const isPurposeActive = selectedPurpose !== '전체' && selectedPurpose !== '목적';
    const isPositionActive = selectedPosition.length > 0;

    // 아무 옵션도 선택하지 않은 경우 (0: 전체 선택)
    if (!isPurposeActive && !isPositionActive) {
      return originalProjectList.map((item) => ({ ...item, isSelected: 0 }));
    }

    // 어떤 옵션을 선택한 경우
    return originalProjectList.map((item) => {
      // 1. 목적 체크 (필터가 꺼져있으면 무조건 통과)
      const isPurposeMatch = !isPurposeActive || item.purpose.desc === selectedPurpose;

      // 2. 포지션 체크 (필터가 꺼져있으면 무조건 통과, 켜져있으면 하나라도 포함되면 통과)
      const isPositionMatch =
        !isPositionActive || item.positions.some((pos) => selectedPosition.includes(pos.desc));

      // 3. 목적과 포지션 모두 만족해야 함
      const isMatch = isPurposeMatch && isPositionMatch;

      return {
        ...item,
        isSelected: isMatch ? 1 : 2, // 매칭되면 1, 아니면 2
      };
    });
  }, [originalProjectList, selectedPurpose, selectedPosition]);

  return (
    <div css={container(bgImg)}>
      <div css={text}>
        <p>꿀벌의 춤을 따라</p>
        <p>빛나는 꿈을 향해</p>
      </div>
      <div css={filterBox}>
        <MainPurposeFilter
          selectedPurpose={selectedPurpose}
          setSelectedPurpose={setSelectedPurpose}
        />
        <MainPositionFilter
          selectedPosition={selectedPosition}
          setSelectedPosition={setSelectedPosition}
        />
      </div>
      {!cardLocation ? (
        <p css={loadingBox}>데이터를 불러오는 중...</p>
      ) : (
        <div css={jobCardList}>
          <p css={link} onClick={() => navigate('/project-list')}>
            프로젝트 공고 전체 보기
            <ArrowForwardIosIcon fontSize="18px" />
          </p>
          {cardLocation.map((loc, index) => (
            <div key={index} css={cardPosition(loc.top, loc.left)}>
              <HexagonCard jobData={filteredProjectList[index]} />
            </div>
          ))}
        </div>
      )}
      {openModal && <UserInfoModal setOpenModal={setOpenModal} onSave={handleModalClose} />}
    </div>
  );
};

export default MainPage;

const container = (img) => css`
  position: relative;

  background-image: url(${img});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 1300px;
  padding-bottom: 200px;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(69, 68, 59, 0.76);
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const text = css`
  width: 575px;
  margin: auto;
  padding: 80px 0px 90px;

  p {
    font-family: 'nanumEB';
    font-size: 40px;
    color: #ffffff;
  }

  p:first-of-type {
    /* margin-left: 225px; */
  }

  p:last-of-type {
    margin-left: 300px;
    margin-top: 20px;
  }
`;

const filterBox = css`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  position: relative;
  z-index: 100;
`;

const jobCardList = css`
  width: 1185px;
  margin: auto;
  position: relative;
`;

const cardPosition = (top, left) => css`
  position: absolute;
  top: ${top};
  left: ${left};
`;

const link = css`
  position: absolute;
  top: -30px;
  right: 60px;
  color: #dddddd;
  font-size: 14px;

  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: ${colors.primary};
  }
`;

const loadingBox = css`
  text-align: center;
  margin-top: 130px;
  margin-left: 20px;
  font-size: 25px;
  color: ${colors.gray[100]};
  font-family: 'nanumB';
`;
