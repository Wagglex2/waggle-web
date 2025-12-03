/** @jsxImportSource @emotion/react */
import { jobInfoBox, infoBox, jobSummary } from './jobInfoStyle';
import Meta from './info-data/Meta';
import RecruitmentStatus from './info-data/RecruitmentStatus';
import Details from './info-data/Details';

const HomeworkInfo = (props) => {
  const { meta, bookMarked, changeBookMark, summary, detail } = props;

  return (
    <div css={jobInfoBox}>
      <div css={infoBox}>
        {/* 공고 메타 데이터 */}
        <Meta metaData={meta} bookMarked={bookMarked} setBookMark={changeBookMark} />

        {/* 공고 지원조건 요약 */}
        <table css={jobSummary}>
          <tbody>
            <tr>
              <td>학과</td>
              <td>{summary.department}</td>
              <td>과목</td>
              <td>
                {summary.lecture}({summary.lectureCode})
              </td>
            </tr>
            <tr>
              <td>우대학년</td>
              <td>{summary.grades.sort().join(', ')}학년</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 모집현황 */}
      <div css={infoBox}>
        <h5 className="text-green">모집 현황</h5>
        <RecruitmentStatus category={'과제'} positions={summary.positions} />
      </div>

      {/* 공고 상세 내용 */}
      <div css={infoBox}>
        <h5 className="text-green">공고 상세</h5>
        <Details detail={detail} />
      </div>
    </div>
  );
};

export default HomeworkInfo;
