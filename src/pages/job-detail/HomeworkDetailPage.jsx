/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { PiFlower } from 'react-icons/pi';
import { GrView } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import DropDown from '@/components/dropdown/DropDown';
import { Link } from 'react-router-dom';

const grade = ['1학년', '2학년', '3학년', '4학년 이상'];

const HomeworkDetailPage = () => {
  return (
    <div css={wrap}>
      <Link to="/hw-list">
        <button type="button" className="navigation-btn">
          <IoIosArrowBack />
          과제 목록보기
        </button>
      </Link>
      <main css={mainContent}>
        <div css={jobInfoBox}>
          <div css={infoBox}>
            <div css={meta}>
              <div css={metaHeader}>
                <div className="user-info">
                  <div className="user-img">
                    <img src="https://placehold.co/35" />
                  </div>
                  <p className="user-name">솔랑솔랑</p>
                </div>
                <div className="other-info">
                  <button className="save-btn">
                    <PiFlower size={25} />
                  </button>
                  <div className="view-count">
                    <GrView size={17} />
                    <p>12</p>
                  </div>
                </div>
              </div>
              <p className="posting-period">게시:2025.12.31 - 마감: 2026.01.31</p>
              <h3 className="job-title text-green">
                경산 와글와글 위윙 웹 공모전 함께할 팀원 구합니다.
              </h3>
            </div>
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
          <div css={infoBox}>
            <h5 className="text-green">모집 현황</h5>
            <div css={positionStateBox}>
              <div css={positionBox}>
                <p className="position-name">멤버</p>
                <p className="personnel">
                  <b>0</b> / 5
                </p>
              </div>
            </div>
          </div>
          <div css={infoBox}>
            <h5 className="text-green">공고 상세</h5>
            <div css={moreInfo}>
              {`다가오는 경산 와글와글 위윙 공모전에 출전할 팀을 꾸리고 있습니다.
              \n
              🛠️ 기술 스택
              Frontend: React, Vite
              Backend: Node.js (Express) / Spring (예정)
              DB: MySQL
              협업 툴: GitHub, Notion, Jira
              \n
            `}
            </div>
          </div>
        </div>
        <form css={applicationForm}>
          <h4 className="application-title text-green">[과제] 지원서</h4>
          <div css={formItem}>
            <div css={itemLabelBox}>
              <p className="item-title text-green">진행방식</p>
              <p className="item-description">*참여 가능한 진행방식을 선택해 주세요</p>
            </div>
            <div css={itemContent}>
              <div css={inputBtnOption}>
                <input type="radio" name="progress-options" id="first-option" />
                <label htmlFor="first-option">온라인</label>
              </div>
              <div css={inputBtnOption}>
                <input type="radio" name="progress-options" id="second-option" />
                <label htmlFor="second-option">오프라인</label>
              </div>
              <div css={inputBtnOption}>
                <input type="radio" name="progress-options" id="third-option" />
                <label htmlFor="third-option">온/오프라인</label>
              </div>
            </div>
          </div>
          <div css={formItem}>
            <div css={itemLabelBox}>
              <p className="item-title text-green">학년</p>
              <p className="item-description">*본인의 현재 학년을 선택해 주세요</p>
            </div>
            <DropDown label="학년" options={grade} buttonWidth={'100%'} dropDownWidth={'100%'} />
          </div>
          <div css={formItem}>
            <div css={itemLabelBox}>
              <p className="item-title text-green">상세 설명</p>
            </div>
            <textarea placeholder="어쩌구저쩌구 뭐 적지" />
          </div>

          <div>
            <p className="warning-msg">※본인이 수강하는 과목이 맞는지 반드시 확인하세요 </p>
            <button type="submit" className="submit-btn text-green">
              지원하기
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default HomeworkDetailPage;

const wrap = css`
  font-family: 'nanumR';
  padding: 50px 0;

  .text-green {
    color: ${colors.tertiary};
  }

  .navigation-btn {
    background-color: #fef1b2;
    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    color: ${colors.gray[400]};
    font-size: 13px;
    font-family: 'nanumB';
    padding: 10px 10px;
    margin-left: 310px;
    display: flex;
    align-items: center;
  }
`;

const mainContent = css`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const jobInfoBox = css`
  margin-right: 10px;
  margin-left: 150px;
`;

const infoBox = css`
  width: 630px;
  padding: 15px 25px 20px 15px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
`;

const meta = css`
  .posting-period {
    font-size: 13px;
    color: ${colors.gray[300]};
    margin: 15px 0;
  }

  .job-title {
    padding-bottom: 12px;
    border-bottom: 1px solid ${colors.gray[300]};
  }
`;

const metaHeader = css`
  font-size: 13px;
  display: flex;
  justify-content: space-between;

  .user-info {
    display: flex;
    align-items: center;

    .user-img {
      width: 35px;
      height: 35px;
      border-radius: 100%;
      border: 1px solid ${colors.gray[300]};
      overflow: hidden;
    }

    .user-name {
      font-family: 'nanumB';
      margin-left: 8px;
    }
  }

  .other-info {
    display: flex;
    color: ${colors.gray[300]};

    .save-btn {
      border: none;
      background: none;
      color: ${colors.gray[300]};
    }

    .view-count {
      display: flex;
      align-items: center;

      p {
        margin: 1px 0 0 2px;
        font-family: 'nanumB';
      }
    }
  }
`;

const jobSummary = css`
  width: 530px;
  table-layout: fixed;

  td {
    padding-top: 17px;
    word-wrap: break-word;
    vertical-align: top;
    text-align: left;
    font-size: 13px;
  }

  td:nth-of-type(1),
  td:nth-of-type(3) {
    width: 60px;
    color: ${colors.gray[400]};
  }

  td:nth-of-type(2),
  td:nth-of-type(4) {
    width: 230px;
  }
`;

const positionStateBox = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const positionBox = css`
  display: flex;
  font-size: 13px;
  margin-top: 8px;

  .position-name {
    width: 75px;
    font-family: 'nanumB';
    color: ${colors.gray[400]};
  }
`;

const moreInfo = css`
  margin-top: 8px;
  white-space: pre-line;
  font-size: 14px;
`;

const applicationForm = css`
  position: relative;
  padding: 20px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  width: 400px;
  height: 100%;

  .application-title {
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid ${colors.gray[300]};
  }

  .warning-msg {
    color: #c00000;
    font-size: 13px;
    text-align: center;
    margin-bottom: 8px;
  }

  .submit-btn {
    width: 100%;
    height: 40px;
    margin-bottom: 5px;
    background-color: #fef1b2;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-family: 'nanumB';
  }

  ul {
    // 드롭다운 정렬용도
    float: none;
  }
`;

const formItem = css`
  margin-top: 20px;
  margin-bottom: 25px;
  font-size: 14px;

  textarea {
    resize: none;
    border: 1px solid ${colors.gray[300]};
    border-radius: 10px;
    width: 100%;
    height: 200px;
    font-family: 'nanumR';
    padding: 8px;
  }
`;

const itemLabelBox = css`
  display: flex;
  align-items: end;
  margin-bottom: 8px;

  .item-title {
    font-family: 'nanumB';
    margin-right: 8px;
  }

  .item-description {
    font-size: 11px;
    color: ${colors.gray[300]};
  }
`;

const itemContent = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const inputBtnOption = css`
  padding-left: 5px;
  display: flex;
  align-items: center;

  input {
    margin: 0;
    accent-color: ${colors.primary};
  }

  label {
    padding-top: 2px;
    padding-left: 4px;
  }
`;
