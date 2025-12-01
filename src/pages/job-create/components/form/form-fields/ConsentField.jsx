/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

const ConsentField = ({ consent, setConsent }) => {
  const toggleConsent = (key) => {
    setConsent({
      ...consent,
      [key]: !consent[key],
    });
  };

  return (
    <div css={consentField}>
      <div css={consentFieldItem}>
        <input
          type="checkbox"
          id="first-condition"
          checked={consent.first}
          onChange={() => toggleConsent('first')}
        />
        <label htmlFor="first-condition">서비스 이용 약관 동의</label>
        <p>* 공고 등록 시 본 서비스의 이용 약관에 동의한 것으로 간주됩니다.</p>
      </div>

      <div css={consentFieldItem}>
        <input
          type="checkbox"
          id="second-condition"
          checked={consent.sec}
          onChange={() => toggleConsent('sec')}
        />
        <label htmlFor="second-condition">공고 내용 책임 동의</label>
        <p>* 등록한 공고 내용에 대한 책임은 등록자에게 있습니다.</p>
        <p>* 허위 정보, 저작권 침해, 차별적 내용 등으로 인한 모든 책임은 등록자에게 있습니다.</p>
      </div>
    </div>
  );
};

export default ConsentField;

const consentField = css`
  margin-top: 90px;
  border-top: 1px solid ${colors.gray[300]};
  border-bottom: 1px solid ${colors.gray[300]};
`;

const consentFieldItem = css`
  margin: 15px 0px;

  input {
    accent-color: ${colors.primary};
  }

  label {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: ${colors.gray[300]};
    padding-left: 20px;
  }
`;
