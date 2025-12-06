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

export const loadingBox = css`
  width: 620px;
  height: 570px;
  margin-right: 8px;
  color: ${colors.gray[300]};
  font-size: 20px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
