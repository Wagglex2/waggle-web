/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
import ProjectInfo from './components/job-info/ProjectInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import ProjectApplicationForm from './components/application-form/ProjectApplicationForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api/api';

const ProjectDetailPage = () => {
  const params = useParams();
  const defaultImgUrl =
    'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';

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

  useEffect(() => {
    async function getProjectInfo() {
      try {
        const res = await api.get(`/api/v1/projects/${params.id}`);
        console.log(res);
        const projectInfo = res.data.data;
        setMataData({
          imgUrl: defaultImgUrl,
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
          purpose: projectInfo.category.desc,
          meetingType: projectInfo.meetingType.desc,
          grades: projectInfo.grades,
          startDate: projectInfo.period.startDate,
          endDate: projectInfo.period.endDate,
          positions: projectInfo.positions,
          techStack: projectInfo.skills,
        });

        setProjectDetail(projectInfo.content);

        console.log(res);
      } catch (e) {
        console.error(e);
      }
    }
    getProjectInfo();
  }, []);

  return (
    <div css={wrap}>
      <JobListLinkBtn category={'프로젝트'} />
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
