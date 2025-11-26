/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

export const wrap = css`
  max-width: 1045px;
  font-family: 'nanumR';
  padding: 50px 0;
  margin: auto;

  .text-green {
    color: ${colors.tertiary};
  }
`;

export const mainContent = css`
  margin-top: 20px;
  display: flex;
`;
