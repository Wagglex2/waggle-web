/** @jsxImportSource @emotion/react */
import { jobInfoBox, infoBox, jobSummary } from './jobInfoStyle';
import Meta from './info-data/Meta';
import RecruitmentStatus from './info-data/Recruitmentstatus';
import Details from './info-data/Details';

const HomeworkInfo = () => {
  return (
    <div css={jobInfoBox}>
      <div css={infoBox}>
        {/* 공고 메타 데이터 */}
        <Meta />

        {/* 공고 지원조건 요약 */}
        <table css={jobSummary}>
          <tbody>
            <tr>
              <td>학과</td>
              <td>컴퓨터공학과</td>
              <td>과목코드</td>
              <td>0039</td>
            </tr>
            <tr>
              <td>우대학년</td>
              <td>2, 3학년</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 모집현황 */}
      <div css={infoBox}>
        <h5 className="text-green">모집 현황</h5>
        <RecruitmentStatus category={'과제'} />
      </div>

      {/* 공고 상세 내용 */}
      <div css={infoBox}>
        <h5 className="text-green">공고 상세</h5>
        <Details />
      </div>
    </div>
  );
};

export default HomeworkInfo;
