/** @jsxImportSource @emotion/react */
import { wrap, mainContent, loadingBox } from './jobDetailStyle';
import HomeworkInfo from './components/job-info/HomeworkInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import HomeworkApplicationForm from './components/application-form/HomeworkApplicationForm';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import profileImg from '../../assets/img/profileDefault.png';

const HomeworkDetailPage = () => {
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
    grades: [],
    positions: {},
    lecture: '',
    lectureCode: '',
    department: '',
  });

  // 공고 상세
  const [homeworkDetail, setHomeworkDetail] = useState('');

  const handleListBtnClick = () => {
    const prevParams = location.state?.prevParams;

    if (prevParams) {
      navigate(`/hw-list${prevParams}`);
    } else {
      navigate('/hw-list');
    }
  };

  useEffect(() => {
    async function getHomeworkInfo() {
      try {
        const res = await api.get(`/api/v1/assignments/${params.id}`);
        const homeworkInfo = res.data.data;
        setIsLoading(false);
        setMataData({
          imgUrl: homeworkInfo.authorProfileImageUrl || defaultImgUrl,
          recruiterId: homeworkInfo.authorId,
          recruiterNickname: homeworkInfo.authorNickname,
          viewCount: homeworkInfo.viewCount,
          title: homeworkInfo.title,
          createdAt: homeworkInfo.createdAt,
          deadline: homeworkInfo.deadline,
          recruitmentId: homeworkInfo.id,
        });

        setBookMarkState({
          isChecked: homeworkInfo.bookmarked,
          id: homeworkInfo.bookmarkId ?? -1,
        });

        setSummary({
          grades: homeworkInfo.grades,
          positions: homeworkInfo.participants,
          lecture: homeworkInfo.lecture,
          lectureCode: homeworkInfo.lectureCode,
          department: homeworkInfo.department,
        });

        setHomeworkDetail(homeworkInfo.content);
      } catch (e) {
        console.error(e);
        if (e.response.status === 403) {
          alert('**권한 없음** \n 타 대학 공고입니다.');
          navigate('/hw-list');
          return;
        }

        if (e.response.status === 404) {
          alert('해당 과제 공고를 찾을 수 없습니다.');
          navigate('/hw-list');
          return;
        }
      }
    }
    getHomeworkInfo();
  }, []);

  return (
    <div css={wrap}>
      <JobListLinkBtn category={'과제'} onClick={handleListBtnClick} />
      <main css={mainContent}>
        {isLoading ? (
          <p css={loadingBox}>데이터를 불러오는 중...</p>
        ) : (
          <HomeworkInfo
            meta={metaData}
            bookMarked={bookMarkState}
            changeBookMark={setBookMarkState}
            summary={summary}
            detail={homeworkDetail}
          />
        )}
        <HomeworkApplicationForm />
      </main>
    </div>
  );
};

export default HomeworkDetailPage;
