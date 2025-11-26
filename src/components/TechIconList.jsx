/** @jsxImportSource @emotion/react */
import techIcons from '@/data/techIcons';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

const TechIconList = ({ teches, techMaxLength }) => {
  return (
    <div css={jobTech}>
      {teches.slice(0, techMaxLength).map((tech) => {
        return (
          <div css={iconBox(teches.length, techMaxLength)} key={tech}>
            <img src={techIcons[tech]} />
          </div>
        );
      })}
      {teches.length > techMaxLength && <p>+{teches.length - techMaxLength}</p>}
    </div>
  );
};

export default TechIconList;

const jobTech = css`
  border-top: 1px solid ${colors.secondary};
  display: flex;
  justify-content: center;

  p {
    font-family: 'nanumEB';
    padding-top: 17px;
    margin-left: 4px;
    color: ${colors.tertiary};
  }
`;

const iconBox = (techLength, maxLength) => css`
  margin-top: 10px;
  margin-right: ${techLength > maxLength - 1 ? '-15px' : '4px'};
  width: 40px;
  height: 40px;
  border-radius: 100%;
  overflow: hidden;

  &:last-of-type {
    margin-right: 0;
  }

  img {
    width: 40px;
  }
`;
