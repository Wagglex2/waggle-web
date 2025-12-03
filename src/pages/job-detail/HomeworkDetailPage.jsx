/** @jsxImportSource @emotion/react */
import { wrap, mainContent } from './jobDetailStyle';
import HomeworkInfo from './components/job-info/HomeworkInfo';
import JobListLinkBtn from './components/JobListLinkBtn';
import HomeworkApplicationForm from './components/application-form/HomeworkApplicationForm';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api/api';

const HomeworkDetailPage = () => {
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
    grades: [],
    positions: {},
    lecture: '',
    lectureCode: '',
    department: '',
  });

  // 공고 상세
  const [homeworkDetail, setHomeworkDetail] = useState('');

  useEffect(() => {
    async function getHomeworkInfo() {
      try {
        const res = await api.get(`/api/v1/assignments/${params.id}`);
        //console.log(res);
        const homeworkInfo = res.data.data;
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
      }
    }
    getHomeworkInfo();
  }, []);

  return (
    <div css={wrap}>
      <JobListLinkBtn category={'과제'} />
      <main css={mainContent}>
        <HomeworkInfo
          meta={metaData}
          bookMarked={bookMarkState}
          changeBookMark={setBookMarkState}
          summary={summary}
          detail={homeworkDetail}
        />
        <HomeworkApplicationForm />
      </main>
    </div>
  );
};

export default HomeworkDetailPage;
