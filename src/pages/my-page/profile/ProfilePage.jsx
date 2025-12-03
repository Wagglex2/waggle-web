/** @jsxImportSource @emotion/react */
import DropDown from '@/components/dropdown/DropDown';
import MultiSelectDropDown from '@/components/dropdown/MultiSelectDropdown';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import { positionOptions, techStackOptions } from '@/data/options';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import api from '@/api/api';
import ProfileReviewBox from '../components/ProfileReviewBox';

const gradeList = ['1학년', '2학년', '3학년', '4학년 이상'];

const ProfilePage = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const defaultImgUrl =
    'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';
  const [imgFile, setImgFile] = useState(null);
  const [originalUserData, setOriginalUserData] = useState({
    nickname: '',
    grade: 0,
    position: {},
    techStack: [],
    shortIntro: '',
  });
  const [nickname, setNickname] = useState('');
  const [grade, setGrade] = useState(0);
  const [position, setPosition] = useState({});
  const [techStack, setTechStack] = useState([]);
  const [shortIntro, setShortIntro] = useState('');
  const [otherUserData, setOtherUserData] = useState({
    imgUrl: defaultImgUrl,
    univ: '',
    email: '',
  });

  // 닉네임 변경 관련 상태들
  const [nicknameConfirmState, setNicknameConfirmState] = useState({
    btnState: false,
    ok: true,
    message: '',
  });
  const [nicknameCheckingMsg, setNicknameCheckingMsg] = useState('중복검사');
  const nicknameRegex = /^[a-zA-Z가-힣0-9]{2,10}$/;

  useEffect(() => {
    console.log(techStack);
  }, [techStack]);

  // 내 정보 조회 api
  useEffect(() => {
    async function getUserProfile() {
      try {
        const res = await api.get('/api/v1/users/me');
        const userInfo = res.data.data;
        handleSetAllUserData(userInfo);
      } catch (e) {
        console.error(e);
      }
    }

    getUserProfile();
  }, []);

  // 프로필 이미지 수정 ui + api
  // 이미지 파일 변경될 때 blob URL 만들어서 미리보기용으로 저장
  useEffect(() => {
    if (!imgFile) return;

    const blobUrl = URL.createObjectURL(imgFile);

    setOtherUserData((prev) => ({
      ...prev,
      imgUrl: blobUrl,
    }));

    return () => {
      URL.revokeObjectURL(blobUrl);
    };
  }, [imgFile]);

  // imgFile이 변경될 때 서버 업로드 실행
  useEffect(() => {
    if (!imgFile) return;

    async function postUserImg() {
      try {
        const formData = new FormData();
        formData.append('file', imgFile);

        const res = await api.post('/api/v1/users/me/profile-image', formData);
        setOtherUserData((prev) => ({
          ...prev,
          imgUrl: res.data.data.profileImageUrl,
        }));
      } catch (e) {
        console.log(e);
      }
    }

    postUserImg();
  }, [imgFile]);

  // 이미지 삭제
  async function deleteUserImg() {
    try {
      const res = await api.delete('/api/v1/users/me/profile-image');
      setOtherUserData((prev) => ({
        ...prev,
        imgUrl: res.data.data.profileImageUrl,
      }));
    } catch (e) {
      console.error(e);
    }
  }

  // 닉네임 중복검사 api
  async function getNicknameAvailability() {
    setNicknameCheckingMsg('확인 중');
    try {
      const res = await axios.post(`${apiKey}/api/v1/users/nickname/check`, {
        nickname: nickname,
      });
      setNicknameCheckingMsg('중복검사');

      if (!res.data.data) {
        setNicknameConfirmState({
          btnState: false,
          ok: true,
          message: '사용 가능한 닉네임입니다',
        });
      } else {
        setNicknameConfirmState({
          btnState: false,
          ok: false,
          message: '*이미 사용 중인 닉네임입니다.',
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  // 회원정보 수정 api
  async function patchUserData(e) {
    e.preventDefault();

    const nicknameTosend = nickname === originalUserData.nickname ? null : nickname;
    const techStackTosend = techStack.map((tech) => tech.name);

    try {
      const res = await api.patch('/api/v1/users/me', {
        nickname: nicknameTosend,
        grade: grade + 1,
        position: position.name,
        skills: techStackTosend,
        shortIntro: shortIntro,
      });
      const userInfo = res.data.data;
      handleSetAllUserData(userInfo);

      setNicknameConfirmState({
        btnState: false,
        ok: true,
        message: '',
      });
    } catch (e) {
      console.log(e);
    }
  }

  // 유저가 값을 수정했는지에 대한 여부([수정]버튼 활성화 여부)
  const isDataUnchanged = useMemo(() => {
    if (!nicknameConfirmState.ok) return true;
    if (shortIntro.length === 0) return true;
    if (techStack.length === 0 || techStack.length > 10) return true;

    const isNicknameSame = originalUserData.nickname === nickname;
    const isGradeSame = originalUserData.grade === grade + 1;
    const isShortIntroSame = originalUserData.shortIntro === shortIntro;

    const isPositionSame =
      JSON.stringify(originalUserData.position.name) === JSON.stringify(position.name);

    const isTechStackSame = (() => {
      if (originalUserData.techStack.length !== techStack.length) return false;

      const sortFunc = (a, b) => (a > b ? 1 : -1);
      const sortedOriginal = originalUserData.techStack.map((item) => item.name).sort(sortFunc);
      const sortedCurrent = techStack.map((item) => item.name).sort(sortFunc);
      return JSON.stringify(sortedOriginal) === JSON.stringify(sortedCurrent);
    })();

    return isNicknameSame && isGradeSame && isPositionSame && isTechStackSame && isShortIntroSame;
  }, [originalUserData, nickname, nicknameConfirmState.ok, grade, position, techStack, shortIntro]);

  // 닉네임 변경(ui)
  function handleNickname(e) {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname === '') {
      setNicknameConfirmState({
        btnState: false,
        ok: false,
        message: '*2~10자, 한글/영문/숫자만 사용 가능합니다.',
      });
      return;
    }

    if (!nicknameRegex.test(newNickname)) {
      setNicknameConfirmState({
        btnState: false,
        ok: false,
        message: '*2~10자, 한글/영문/숫자만 사용 가능합니다.',
      });
      return;
    }

    if (newNickname === originalUserData.nickname) {
      setNicknameConfirmState({
        btnState: false,
        ok: true,
        message: '',
      });
    } else {
      setNicknameConfirmState({
        btnState: true,
        ok: false,
        message: '*중복검사가 필요합니다.',
      });
    }
  }

  function handleSetAllUserData(userInfo) {
    setNickname(userInfo.nickname);
    setGrade(userInfo.grade - 1);
    setPosition(userInfo.position);
    setTechStack(userInfo.skills);
    setShortIntro(userInfo.shortIntro);
    setOtherUserData({
      imgUrl: userInfo.profileImageUrl,
      univ: userInfo.university.desc,
      email: userInfo.email,
    });

    setOriginalUserData({
      nickname: userInfo.nickname,
      grade: userInfo.grade,
      position: userInfo.position,
      techStack: userInfo.skills,
      shortIntro: userInfo.shortIntro,
    });
  }

  // 프로필 이미지 미리보기(ui)
  function handleUploadImg(e) {
    const file = e.target.files[0];
    if (file) {
      const newImg = URL.createObjectURL(file);
      setOtherUserData({ ...otherUserData, imgUrl: newImg });
      setImgFile(file); //서버 전달용
    }
  }
  return (
    <div css={wrap}>
      <h2 css={pageTitle}>🍯 내 프로필</h2>
      <div css={profileContentBox}>
        <div css={basicInfoCard}>
          <div css={imgBox}>
            <div className="img-card">
              <img src={otherUserData.imgUrl} />
            </div>
            <div css={changeImgBtnBox}>
              <label htmlFor="file">
                <CameraAltOutlinedIcon fontSize="13px" />
              </label>
              <input type="file" id="file" accept="image/*" onChange={handleUploadImg} />
              <button className="imgDeleteBtn" onClick={deleteUserImg}>
                ✕
              </button>
            </div>
          </div>
          <h3 className="user-name">{originalUserData.nickname}</h3>
          <p className="univ">✓ {otherUserData.univ} 인증 완료</p>
        </div>
        <form css={details}>
          <div css={detailsItem}>
            <p className="item-label">이메일</p>
            <p css={itemContent}>{otherUserData.email}</p>
          </div>
          <div css={detailsItem}>
            <p className="item-label">닉네임</p>
            <div css={itemContent}>
              <div className="change-user-name-box">
                <input
                  type="text"
                  placeholder="닉네임을 입력해 주세요"
                  value={nickname}
                  onChange={handleNickname}
                />
                <button
                  type="button"
                  disabled={!nicknameConfirmState.btnState}
                  onClick={getNicknameAvailability}
                >
                  {nicknameCheckingMsg}
                </button>
              </div>
              <p css={confirmMsg(nicknameConfirmState.message)}>{nicknameConfirmState.message}</p>
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
              <div>
                {gradeList.map((item, i) => (
                  <button
                    type="button"
                    key={item}
                    css={gradeBtn(grade, i)}
                    onClick={() => setGrade(i)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div css={detailsItem}>
            <p className="item-label">포지션</p>
            <div css={itemContent}>
              <DropDown
                label="포지션"
                options={positionOptions}
                buttonWidth={'200px'}
                onChange={setPosition}
                prevData={position}
              />
            </div>
          </div>
          <div css={detailsItem}>
            <p className="item-label">기술</p>
            <div css={itemContent}>
              <MultiSelectDropDown
                label="기술"
                options={techStackOptions}
                buttonWidth={'440px'}
                onChange={setTechStack}
                prevData={techStack}
              />
              {techStack.length === 0 && <p css={confirmMsg}>*기술을 한 개 이상 선택해 주세요.</p>}
              {techStack.length > 10 && (
                <p css={confirmMsg}>*10개 이하의 기술만 선택 가능합니다.</p>
              )}
            </div>
          </div>
          <div css={detailsItem} className="last-item">
            <p className="item-label">한 줄 소개</p>
            <div css={itemContent}>
              <input
                className="input-introduction"
                type="text"
                placeholder="한 줄 소개를 적어주세요"
                value={shortIntro}
                onChange={(e) => setShortIntro(e.target.value)}
              />
              {shortIntro.length === 0 && <p css={confirmMsg}>*한 줄 소개를 작성해 주세요.</p>}
            </div>
          </div>
          <button
            type="submit"
            css={profileUpdateBtn}
            disabled={isDataUnchanged}
            onClick={patchUserData}
          >
            {isDataUnchanged ? '변경사항 없음' : '저장하기'}
          </button>
        </form>
        <ProfileReviewBox />
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
    border: 1px solid ${colors.gray[300]};
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

const changeImgBtnBox = css`
  position: absolute;
  bottom: -13px;
  left: 21px;

  width: 60px;
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
    padding-left: 7px;
    padding-top: 1px;
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
    font-size: 13px;
    margin-bottom: 2px;
    margin-top: 2px;
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
  flex-direction: column;
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
      border-radius: 10px;
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

const confirmMsg = (confirmMsg) => css`
  width: 100%;
  font-size: 12px;
  color: ${confirmMsg === '사용 가능한 닉네임입니다' ? '#6bb23d' : '#dc3545'};
  margin-top: 3px;
  margin-left: 7px;
`;
