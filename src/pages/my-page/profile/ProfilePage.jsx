/** @jsxImportSource @emotion/react */
import DropDown from '@/components/dropdown/DropDown';
import MultiSelectDropDown from '@/components/dropdown/MultiSelectDropdown';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { Pagination, Box } from '@mui/material';
import { positionOptions, techStackOptions } from '@/data/options';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const grade = ['1학년', '2학년', '3학년', '4학년 이상'];

const ProfilePage = () => {
  const [selectedGrade, setSelectedGrade] = useState(0);

  return (
    <div css={wrap}>
      <h2 css={pageTitle}>🍯 내 프로필</h2>
      <div css={profileContentBox}>
        <div css={basicInfoCard}>
          <div css={imgBox}>
            <div className="img-card">
              <img src="https://placehold.co/100" />
            </div>
            <div css={changeImgBtnBox}>
              <label htmlFor="file">
                <CameraAltOutlinedIcon fontSize="13px" />
              </label>
              <input type="file" id="file" />
              <button className="imgDeleteBtn">X</button>
            </div>
          </div>
          <h3 className="user-name">솔랑솔랑</h3>
          <p className="univ">영남대 인증 완료</p>
        </div>
        <form css={details}>
          <div css={detailsItem}>
            <p className="item-label">이메일</p>
            <p css={itemContent}>eogud3332@yu.ac.kr</p>
          </div>
          <div css={detailsItem}>
            <p className="item-label">닉네임</p>
            <div css={itemContent}>
              <div className="change-user-name-box">
                <input type="text" placeholder="닉네임을 입력해 주세요" />
                <button>중복검사</button>
              </div>
            </div>
          </div>
          <div css={detailsItem}>
            <p className="item-label">비밀번호</p>
            <div css={itemContent}>
              <Link to={'/my-page/profile/editpw'}>
                <p className="change-pw-btn">
                  비밀번호 변경하기
                  <LaunchOutlinedIcon sx={{ fontSize: '16px' }} />
                </p>
              </Link>
            </div>
          </div>
          <div css={detailsItem}>
            <p className="item-label">학년</p>
            <div css={itemContent}>
              {grade.map((item, i) => (
                <button
                  type="button"
                  key={item}
                  css={gradeBtn(selectedGrade, i)}
                  onClick={() => setSelectedGrade(i)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div css={detailsItem}>
            <p className="item-label">포지션</p>
            <div css={itemContent}>
              <DropDown label="포지션" options={positionOptions} buttonWidth={'200px'} />
            </div>
          </div>
          <div css={detailsItem}>
            <p className="item-label">기술</p>
            <div css={itemContent}>
              <MultiSelectDropDown label="기술" options={techStackOptions} buttonWidth={'440px'} />
            </div>
          </div>
          <div css={detailsItem} className="last-item">
            <p className="item-label">한 줄 소개</p>
            <div css={itemContent}>
              <input
                className="input-introduction"
                type="text"
                placeholder="한 줄 소개를 적어주세요"
              />
            </div>
          </div>
          <button css={profileUpdateBtn}>수정하기</button>
        </form>
        <div css={reviewBox}>
          <h3>✨ 동료 리뷰</h3>
          <div className="reviews">
            <p>덕분에 좋은 추억 만들었어요. 많이 배웠습니다.</p>
            <p>덕분에 좋은 추억 만들었어요. 많이 배웠습니다.</p>
            <p>덕분에 좋은 추억 만들었어요. 많이 배웠습니다.</p>
          </div>
          <Box display="flex" justifyContent="center">
            <Pagination count={3} shape="rounded" />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

const wrap = css`
  max-width: 1000px;
  margin: auto;
  padding: 24px 32px;
  font-family: 'nanumR';
`;

const pageTitle = css`
  margin: 40px 0 24px;
  font-size: 22px;
  font-family: 'nanumB';
`;

const profileContentBox = css`
  width: 100%;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  padding: 40px 100px;
`;

const basicInfoCard = css`
  display: flex;
  flex-direction: column;
  align-items: center;

  .user-name {
    margin-top: 20px;
  }

  .univ {
    font-size: 13px;
    color: #6bb23d;
    margin: 5px 0 40px;
  }
`;

const imgBox = css`
  position: relative;

  .img-card {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
  }
`;

const changeImgBtnBox = css`
  position: absolute;
  bottom: -10px;
  left: 22px;

  width: 55px;
  background-color: #ffffff;
  border: 1px solid ${colors.gray[300]};
  border-radius: 15px;
  display: flex;
  align-items: center;
  color: ${colors.gray[300]};

  label {
    display: flex;
    align-items: center;
    width: 30px;
    padding: 1px 6px;
  }

  input {
    width: 0;
  }

  .imgDeleteBtn {
    background: none;
    width: 30px;
    border: none;
    border-left: 1px solid ${colors.gray[300]};
    color: ${colors.gray[300]};
    font-size: 12px;
  }
`;

const details = css`
  .last-item {
    border-bottom: 1px solid ${colors.gray[300]};
  }
`;

const detailsItem = css`
  display: flex;
  border-top: 1px solid ${colors.gray[300]};

  .item-label {
    width: 118px;
    background-color: #fef7d4;
    font-size: 15px;
    font-family: 'nanumB';

    display: flex;
    align-items: center;
    text-align: center;
    padding-left: 20px;
    margin-right: 15px;
  }
`;

const itemContent = css`
  padding: 16px 7px;
  font-size: 14px;
  display: flex;
  align-items: center;

  .change-user-name-box {
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid ${colors.gray[300]};

    input {
      height: 33px;
      width: 250px;
      border: none;
      padding: 0 60px 0 10px;
    }

    button {
      padding: 0 7px;
      height: 100%;
      position: absolute;
      border: none;
      border-left: 1px solid ${colors.gray[300]};
      background-color: #fef7d4;
      font-size: 12px;
      font-family: 'nanumR';
      right: 0;
    }
  }

  .change-pw-btn {
    height: 33px;
    width: 150px;
    padding: 0px 10px;
    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    background-color: #fef7d4;

    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .input-introduction {
    height: 33px;
    width: 440px;
    padding: 0px 10px;
    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
  }
`;

const gradeBtn = (selectedGrade, myGrade) => css`
  margin-right: 16px;
  padding: 4px 15px;
  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  background-color: ${selectedGrade == myGrade ? '#fef7d4' : 'colors.gray[300]'};
  font-family: 'nanumR';
`;

const profileUpdateBtn = css`
  margin-top: 10px;
  padding: 7px 20px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  background-color: #fef7d4;
  font-family: 'nanumE';

  display: block;
  margin-left: auto;
`;

const reviewBox = css`
  margin-top: 60px;

  .reviews {
    margin: 20px 0;
  }

  .reviews p {
    border: 1px solid ${colors.gray[300]};
    padding: 8px 0;
    margin-bottom: 8px;
    border-radius: 5px;
    text-align: center;
    background-color: #faf8f8;
  }
`;
