/** @jsxImportSource @emotion/react */
import api from '@/api/api';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';

const PasswordEditPage = () => {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [newPwConfirm, setNewPwConfirm] = useState('');

  const [newPwMsg, setNewPwMsg] = useState(''); // #2 밑 경고 메시지
  const [confirmPwMsg, setConfirmPwMsg] = useState(''); // #3 밑 경고 메시지
  const [disabled, setDisabled] = useState(true); // 변경 버튼 상태

  const pwRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

  // 비밀번호 변경 api
  async function postPassword(e) {
    e.preventDefault();

    try {
      await api.post('/api/v1/users/me/password-change', {
        old: currentPw,
        newPassword: newPw,
        passwordConfirm: newPwConfirm,
      });

      setCurrentPw('');
      setNewPw('');
      setNewPwConfirm('');

      //console.log(res);
      alert('비밀번호가 변경되었습니다.');
    } catch (e) {
      console.error(e);
      if (e.status === 400) {
        alert('현재 비밀번호가 잘못되었습니다. 다시 시도해 주세요.');
        setCurrentPw('');
      } else {
        alert('변경에 실패하였습니다. 다시 시도해 주세요.');
      }
    }
  }

  // #2 경고 메시지 (우선순위 적용)
  useEffect(() => {
    if (!newPw) {
      setNewPwMsg('');
      return;
    }

    if (currentPw && currentPw === newPw) {
      setNewPwMsg('*현재 비밀번호와 다른 비밀번호를 입력해 주세요.');
      return;
    }

    if (!pwRegex.test(newPw)) {
      setNewPwMsg('*비밀번호 형식이 맞지 않습니다. (영문/숫자/특수문자 포함 8~20자)');
      return;
    }

    setNewPwMsg('');
  }, [currentPw, newPw]);

  // #3 경고 메시지 (비밀번호 확인)
  useEffect(() => {
    if (!newPwConfirm) {
      setConfirmPwMsg('');
      return;
    }

    if (newPw !== newPwConfirm) {
      setConfirmPwMsg('*비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPwMsg('');
    }
  }, [newPw, newPwConfirm]);

  // 변경하기 버튼 활성화 조건
  useEffect(() => {
    const isValid =
      currentPw.length > 0 &&
      newPw.length > 0 &&
      newPwConfirm.length > 0 &&
      newPwMsg === '' && // #2 문제 없음
      confirmPwMsg === ''; // #3 문제 없음

    setDisabled(!isValid);
  }, [currentPw, newPw, newPwConfirm, newPwMsg, confirmPwMsg]);

  return (
    <form css={wrap}>
      <h2 css={pageTitle}>비밀번호 변경</h2>

      <div>
        {/* 현재 비밀번호 (#1) */}
        <div css={inputPwBox}>
          <p className="current-pw">현재 비밀번호</p>
          <input
            type="password"
            value={currentPw}
            onChange={(e) => setCurrentPw(e.target.value)}
            placeholder="현재 비밀번호를 입력해 주세요"
          />
        </div>

        {/* 새 비밀번호 (#2) */}
        <div css={inputPwBox}>
          <p>새 비밀번호</p>
          <input
            type="password"
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            placeholder="영문자, 숫자, 특수문자 포함 8~20자"
          />
        </div>
        {newPwMsg && <p css={confirmPwMsgStyle}>{newPwMsg}</p>}

        {/* 새 비밀번호 확인 (#3) */}
        <div css={inputPwBox}>
          <p>비밀번호 확인</p>
          <input
            type="password"
            value={newPwConfirm}
            onChange={(e) => setNewPwConfirm(e.target.value)}
            placeholder="비밀번호를 확인해 주세요"
          />
        </div>
        {confirmPwMsg && <p css={confirmPwMsgStyle}>{confirmPwMsg}</p>}
      </div>

      <button type="submit" css={passwordUpdateBtn} disabled={disabled} onClick={postPassword}>
        변경하기
      </button>
    </form>
  );
};

export default PasswordEditPage;

const wrap = css`
  font-family: 'nanumR';
  padding: 24px 32px;
  margin-left: 100px;
  width: 565px;
  height: 420px;

  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  position: relative;
`;

const pageTitle = css`
  margin: 40px 0 24px;
  font-size: 22px;
  font-family: 'nanumB';
`;

const inputPwBox = css`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${colors.gray[300]};
  margin-top: 16px;

  input {
    height: 50px;
    width: 500px;
    border-radius: 10px;
    border: none;
    padding: 0 10px 0 120px;
  }

  p {
    width: 105px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-right: 1px solid ${colors.gray[300]};
    background-color: #fef7d4;
    font-size: 14px;
    font-family: 'nanumB';
    color: ${colors.gray[400]};
    left: 0;
    top: 0;
  }

  .current-pw {
    background-color: ${colors.gray[100]};
  }
`;

const passwordUpdateBtn = css`
  margin-top: 15px;
  margin-left: auto;
  padding: 12px 30px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  background-color: #fef7d4;
  font-family: 'nanumB';
`;

const confirmPwMsgStyle = css`
  color: #dc3545;
  margin-top: 3px;
  margin-bottom: 10px;
  margin-left: 5px;
  align-self: flex-end;
`;
