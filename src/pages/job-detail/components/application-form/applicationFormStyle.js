import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

export const applicationForm = css`
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

  ul {
    // 드롭다운 정렬용도
    float: none;
  }
`;

export const formField = css`
  margin-top: 20px;
  margin-bottom: 25px;
  font-size: 14px;
`;

export const fieldLabelBox = css`
  display: flex;
  align-items: end;
  margin-bottom: 8px;

  .field-title {
    font-family: 'nanumB';
    margin-right: 8px;
  }

  .field-description {
    font-size: 11px;
    color: ${colors.gray[300]};
  }
`;
