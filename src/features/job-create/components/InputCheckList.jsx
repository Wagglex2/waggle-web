/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

const InputcheckList = () => {
  return (
    <div
      css={css({
        height: 'auto',
        marginLeft: '20px',
        marginTop: '28px',
      })}
    >
      <div css={checkBox}>
        <p>입력현황</p>
        <p>ok 공고 구분</p>
        <p>ok 제목</p>
        <p>ok 마감일</p>
        <p>ok 정보</p>
        <p>ok 공고 상세</p>
      </div>
    </div>
  );
};

export default InputcheckList;

const checkBox = css`
  width: 145px;
  background-color: #fffceb;
  padding: 7px 15px;
  border-radius: 5px;
  border: 1px solid ${colors.gray[300]};
  position: sticky;
  top: 5px;

  p {
    margin: 12px 0px;
    font-size: 12px;
    color: ${colors.gray[300]};
  }

  p:first-of-type {
    font-size: 13px;
    font-family: 'nanumB';
    color: #000000;
  }
`;
