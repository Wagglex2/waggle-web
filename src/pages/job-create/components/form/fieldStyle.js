import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

export const field = css`
  display: flex;
  border-bottom: 1px solid ${colors.gray[300]};

  .field-name {
    width: 118px;
    background-color: #fef7d4;
    font-size: 14px;
    font-family: 'nanumB';
    color: ${colors.gray[400]};

    display: flex;
    align-items: center;
    padding-left: 7px;
    margin-right: 15px;
  }

  .text-black {
    color: #000000;
  }
`;

// itemContent, noLabelItem input태그 공용
const contentInputStyle = css`
  height: 33px;
  padding: 0px 10px;
  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  font-family: 'nanumR';
`;

export const fieldContent = (inputWidth, direction = 'row') => css`
  padding: 16px 7px;
  font-size: 14px;
  color: ${colors.gray[300]};

  display: flex;
  flex-direction: ${direction};
  align-items: center;

  input {
    ${contentInputStyle};
    width: ${inputWidth};
  }
`;

export const noLabelField = (inputWidth) => css`
  border-bottom: 1px solid ${colors.gray[300]};
  padding: 7px 7px;
  font-size: 14px;

  input {
    ${contentInputStyle};
    width: ${inputWidth};
  }
`;

export const separator = css`
  margin: 0px 15px;
  color: #3b3537;
`;

export const unit = css`
  margin: 0px 5px;
  color: #3b3537;
`;

export const inputBtnOption = (mr) => css`
  margin-right: ${mr};
  padding-left: 5px;
  display: flex;
  align-items: center;

  input {
    margin: 0;
    accent-color: ${colors.primary};
  }

  label {
    padding-top: 2px;
    padding-left: 4px;
  }
`;
