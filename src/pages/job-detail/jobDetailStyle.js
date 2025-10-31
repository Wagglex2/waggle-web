/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

export const wrap = css`
  font-family: 'nanumR';
  padding: 50px 0;

  .text-green {
    color: ${colors.tertiary};
  }
`;

export const mainContent = css`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
