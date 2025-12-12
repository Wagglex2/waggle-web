/** @jsxImportSource @emotion/react */
import { wrap, mainContent, loadingBox } from './jobDetailStyle';
import ProjectInfo from './components/job-info/ProjectInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import ProjectApplicationForm from './components/application-form/ProjectApplicationForm';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import profileImg from '../../assets/img/profileDefault.png';

const ProjectDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const defaultImgUrl = profileImg;

  // 공고 기본 데이터
  const [metaData, setMataData] = useState({
    imgUrl: defaultImgUrl,
    recruiterId: -1,
    recruiterNickname: '',
    viewCount: 0,
    title: '',
    createdAt: '0000-00-00',
    deadline: '0000-00-00',
    recruitmentId: -1,
  });
  const [bookMarkState, setBookMarkState] = useState({
    isChecked: false,
    id: -1,
  });

  // 공고 요약
  const [summary, setSummary] = useState({
    purpose: '',
    meetingType: '',
    grades: [],
    startDate: '0000-00-00',
    endDate: '0000-00-00',
    positions: [],
    techStack: [],
  });

  // 공고 상세
  const [projectDetail, setProjectDetail] = useState('');
  const handleListBtnClick = () => {
    const prevParams = location.state?.prevParams;

    if (prevParams) {
      navigate(`/project-list${prevParams}`);
    } else {
      navigate('/project-list');
    }
  };

  useEffect(() => {
    async function getProjectInfo() {
      try {
        const res = await api.get(`/api/v1/projects/${params.id}`);
        const projectInfo = res.data.data;
        setIsLoading(false);
        setMataData({
          imgUrl: projectInfo.authorProfileImageUrl || defaultImgUrl,
          recruiterId: projectInfo.authorId,
          recruiterNickname: projectInfo.authorNickname,
          viewCount: projectInfo.viewCount,
          title: projectInfo.title,
          createdAt: projectInfo.createdAt,
          deadline: projectInfo.deadline,
          recruitmentId: projectInfo.id,
        });

        setBookMarkState({
          isChecked: projectInfo.bookmarked,
          id: projectInfo.bookmarkId ?? -1,
        });

        setSummary({
          purpose: projectInfo.purpose.desc,
          meetingType: projectInfo.meetingType.desc,
          grades: projectInfo.grades,
          startDate: projectInfo.period.startDate,
          endDate: projectInfo.period.endDate,
          positions: projectInfo.positions,
          techStack: projectInfo.skills,
        });

        setProjectDetail(projectInfo.content);
      } catch (e) {
        console.error(e);
        if (e.response.status === 403) {
          alert('**권한 없음** \n 타 대학 공고입니다.');
          navigate('/project-list');
          return;
        }

        if (e.response.status === 404) {
          alert('해당 프로젝트 공고를 찾을 수 없습니다.');
          navigate('/project-list');
          return;
        }
      }
    }
    getProjectInfo();
  }, []);

  return (
    <div css={wrap}>
      <JobListLinkBtn category={'프로젝트'} onClick={handleListBtnClick} />
      <main css={mainContent}>
        {isLoading ? (
          <p css={loadingBox}>데이터를 불러오는 중...</p>
        ) : (
          <ProjectInfo
            meta={metaData}
            bookMarked={bookMarkState}
            changeBookMark={setBookMarkState}
            summary={summary}
            detail={projectDetail}
          />
        )}
        <ProjectApplicationForm />
      </main>
    </div>
  );
};

export default ProjectDetailPage;
