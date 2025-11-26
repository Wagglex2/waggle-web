import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

export const jobInfoBox = css`
  margin-right: 10px;
`;

export const infoBox = css`
  width: 630px;
  padding: 15px 25px 20px 15px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
`;

export const jobSummary = css`
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
