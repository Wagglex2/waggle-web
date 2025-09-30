/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';

const PasswordEditPage = () => {
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmPwMsg, setConfirmPwMsg] = useState('');

  useEffect(() => {
    if (pw !== confirmPw) {
      setConfirmPwMsg('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPwMsg('');
    }
  }, [pw, confirmPw]);

  return (
    <form css={wrap}>
      <h2 css={pageTitle}>비밀번호 변경</h2>
      <div css={inputPwBox}>
        <p className="current-pw">현재 비밀번호</p>
        <input type="text" placeholder="현재 비밀번호를 입력해 주세요" />
      </div>
      <div css={inputPwBox}>
        <p>새 비밀번호</p>
        <input
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
          }}
          placeholder="새 비밀번호를 입력해 주세요"
        />
      </div>
      <div css={inputPwBox}>
        <p>비밀번호 확인</p>
        <input
          type="password"
          value={confirmPw}
          onChange={(e) => {
            setConfirmPw(e.target.value);
          }}
          placeholder="새 비밀번호를 입력해 주세요"
        />
      </div>
      <p css={confirmPwMsgStyle}>{confirmPwMsg}</p>
      <button css={passwordUpdateBtn}>변경하기</button>
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
  padding: 7px 30px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  background-color: #fef7d4;
  font-family: 'nanumB';

  position: absolute;
  bottom: 30px;
  right: 30px;
`;

const confirmPwMsgStyle = css`
  color: #eb0000;
  margin-top: 3px;
  margin-bottom: 10px;
  align-self: flex-end;
`;
