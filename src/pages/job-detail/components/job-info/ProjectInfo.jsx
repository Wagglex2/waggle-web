/** @jsxImportSource @emotion/react */
import { jobInfoBox, infoBox, jobSummary } from './jobInfoStyle';
import Meta from './info-data/Meta';
import RecruitmentStatus from './info-data/Recruitmentstatus';
import Details from './info-data/Details';

const ProjectInfo = ({ positions }) => {
  return (
    <div css={jobInfoBox}>
      <div css={infoBox}>
        {/* 공고 메타 데이터 */}
        <Meta />

        {/* 공고 지원조건 요약 */}
        <table css={jobSummary}>
          <tbody>
            <tr>
              <td>목적</td>
              <td>공모전</td>
              <td>진행방식</td>
              <td>온/오프라인</td>
            </tr>
            <tr>
              <td>우대학년</td>
              <td>2, 3학년</td>
              <td>진행기간</td>
              <td>2026.02.02 ~ 2026.04.01</td>
            </tr>
            <tr>
              <td>포지션</td>
              <td>기획, 디자인, 프론트, 백엔드</td>
              <td>기술</td>
              <td>ts, react, spring, ts, react, spring, pigma</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 모집현황 */}
      <div css={infoBox}>
        <h5 className="text-green">모집 현황</h5>
        <RecruitmentStatus category={'프로젝트'} positions={positions} />
      </div>

      {/* 공고 상세 내용 */}
      <div css={infoBox}>
        <h5 className="text-green">공고 상세</h5>
        <Details />
      </div>
    </div>
  );
};

export default ProjectInfo;
