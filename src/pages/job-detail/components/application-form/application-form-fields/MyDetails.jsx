/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { formField, fieldLabelBox } from '../applicationFormStyle';

const MyDetails = () => {
  return (
    <div css={formField}>
      <div css={fieldLabelBox}>
        <p className="field-title text-green">상세 설명</p>
      </div>
      <textarea css={details} placeholder="어쩌구저쩌구 뭐 적지" />
    </div>
  );
};

export default MyDetails;

const details = css`
  resize: none;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;
  width: 100%;
  height: 200px;
  font-family: 'nanumR';
  padding: 8px;
`;
