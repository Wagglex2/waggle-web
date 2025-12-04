/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
import StudyInfo from './components/job-info/StudyInfo';
import StudyApplicationForm from './components/application-form/StudyApplicationForm';
import JobListLinkBtn from './components/JobListLinkBtn';
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '@/api/api';

const StudyDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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
    startDate: '0000-00-00',
    endDate: '0000-00-00',
    positions: {},
    techStack: [],
  });

  // 공고 상세
  const [studyDetail, setProjectDetail] = useState('');
  const handleListBtnClick = () => {
    const prevParams = location.state?.prevParams;

    if (prevParams) {
      navigate(`/study-list${prevParams}`);
    } else {
      navigate('/study-list');
    }
  };

  useEffect(() => {
    async function getProjectInfo() {
      try {
        const res = await api.get(`/api/v1/studies/${params.id}`);
        //console.log(res);
        const studyInfo = res.data.data;
        setMataData({
          imgUrl: studyInfo.authorProfileImageUrl || defaultImgUrl,
          recruiterId: studyInfo.authorId,
          recruiterNickname: studyInfo.authorNickname,
          viewCount: studyInfo.viewCount,
          title: studyInfo.title,
          createdAt: studyInfo.createdAt,
          deadline: studyInfo.deadline,
          recruitmentId: studyInfo.id,
        });

        setBookMarkState({
          isChecked: studyInfo.bookmarked,
          id: studyInfo.bookmarkId ?? -1,
        });

        setSummary({
          startDate: studyInfo.period.startDate,
          endDate: studyInfo.period.endDate,
          positions: studyInfo.participants,
          techStack: studyInfo.skills,
        });

        setProjectDetail(studyInfo.content);
      } catch (e) {
        console.error(e);
      }
    }
    getProjectInfo();
  }, []);

  return (
    <div css={wrap}>
      <JobListLinkBtn category={'스터디'} onClick={handleListBtnClick} />
      
      <main css={mainContent}>
        <StudyInfo
          meta={metaData}
          bookMarked={bookMarkState}
          changeBookMark={setBookMarkState}
          summary={summary}
          detail={studyDetail}
        />
        <StudyApplicationForm />
      </main>
    </div>
  );
};

export default StudyDetailPage;