/** @jsxImportSource @emotion/react */
import { jobInfoBox, infoBox, jobSummary } from './jobInfoStyle';
import Meta from './info-data/Meta';
import RecruitmentStatus from './info-data/RecruitmentStatus';
import Details from './info-data/Details';
import { useState } from 'react';
import UserProfileModal from '@/pages/my-page/components/UserProfileModal';

const StudyInfo = (props) => {
  const { meta, bookMarked, changeBookMark, summary, detail } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div css={jobInfoBox}>
      <div css={infoBox}>
        {/* 공고 메타 데이터 */}
        <Meta
          metaData={meta}
          bookMarked={bookMarked}
          setBookMark={changeBookMark}
          setIsProfileOpen={setIsOpen}
        />

        {/* 공고 지원조건 요약 */}
        <table css={jobSummary}>
          <tbody>
            <tr>
              <td>진행기간</td>
              <td>
                {summary.startDate} ~ {summary.endDate}
              </td>
              <td>기술</td>
              <td>{summary.techStack.map((item) => item.desc).join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 모집현황 */}
      <div css={infoBox}>
        <h5 className="text-green">모집 현황</h5>
        <RecruitmentStatus category={'스터디'} positions={summary.positions} />
      </div>

      {/* 공고 상세 내용 */}
      <div css={infoBox}>
        <h5 className="text-green" detail={detail}>
          공고 상세
        </h5>
        <Details detail={detail} />
      </div>

      {/* 공고 등록자 프로필 */}
      <UserProfileModal isOpen={isOpen} user={meta} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default StudyInfo;
