/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
import ProjectInfo from './components/job-info/ProjectInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import ProjectApplicationForm from './components/application-form/ProjectApplicationForm';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api/api';

const ProjectDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const defaultImgUrl =
    'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';

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

  const [summary, setSummary] = useState({
    purpose: '',
    meetingType: '',
    grades: [],
    startDate: '0000-00-00',
    endDate: '0000-00-00',
    positions: [],
    techStack: [],
  });

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
      }
    }
    getProjectInfo();
  }, []);

  return (
    <div css={wrap}>
      <JobListLinkBtn category={'프로젝트'} onClick={handleListBtnClick} />
      <main css={mainContent}>
        <ProjectInfo
          meta={metaData}
          bookMarked={bookMarkState}
          changeBookMark={setBookMarkState}
          summary={summary}
          detail={projectDetail}
        />
        <ProjectApplicationForm />
      </main>
    </div>
  );
};

export default ProjectDetailPage;