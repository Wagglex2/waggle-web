/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

const InputcheckList = ({ category, purpose, title, deadline, info, desc }) => {
  return (
    <div css={container}>
      <div css={checkBox}>
        <p className="label">입력현황</p>
        <ul css={checkingListBox}>
          {category === '프로젝트' && (
            <li css={checking(purpose)}>
              공고 구분 <span>✓</span>
            </li>
          )}
          <li css={checking(title)}>
            제목 <span>✓</span>
          </li>
          <li css={checking(deadline)}>
            마감일 <span>✓</span>
          </li>
          <li css={checking(info)}>
            정보 <span>✓</span>
          </li>
          <li css={checking(desc)}>
            공고 상세 <span>✓</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InputcheckList;

const container = css`
  height: auto;
  margin-left: 30px;
  margin-top: 28px;
`;

const checkBox = css`
  width: 145px;
  background-color: #fffceb;
  padding: 7px 10px;
  border-radius: 5px;
  border: 1px solid ${colors.gray[400]};
  position: sticky;
  top: 5px;

  .label {
    font-size: 13px;
    font-family: 'nanumB';
    padding-bottom: 2px;
    border-bottom: 1px solid ${colors.gray[400]};
    color: ${colors.secondary};
    text-align: center;
  }
`;

const checkingListBox = css`
  padding-left: 23px;
`;

const checking = (inputState) => css`
  margin: 15px 0px;
  font-size: 13px;
  color: ${colors.secondary};

  span {
    margin-left: 1px;
    font-size: 14px;
    font-weight: 700;
    visibility: ${inputState ? 'visible' : 'hidden'};
    color: #169916;
  }
`;
