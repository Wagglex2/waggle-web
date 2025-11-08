/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import TechIconList from '@/components/TechIconList';

const HexagonCard = ({ jobData }) => {
  return (
    <div css={container}>
      <div css={hexagonBorder}></div>
      <div css={hexagon}>
        <div css={content}>
          <div css={cardBadge}>
            <p className="purpose">{jobData.purposeTag}</p>
            <p className="method">{jobData.methodTag}</p>
          </div>
          <p css={deadLine}>{jobData.deadline}</p>
          <p css={jobTitle}>{jobData.title}</p>
          <TechIconList teches={jobData.techStack} techMaxLength={4} />
        </div>
      </div>
    </div>
  );
};

export default HexagonCard;

const container = css`
  position: relative;
  width: 278px;
  height: 204px;
`;

const hexagonBorder = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.secondary};
  clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
`;

const hexagon = css`
  position: absolute;
  background-color: #ffffff;
  top: 1px;
  left: 1px;
  width: 276px;
  height: 202px;
  clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  z-index: 1;

  display: flex;
  justify-content: center;
`;

const content = css`
  width: 170px;
  height: 100%;
  text-align: center;
`;

const cardBadge = css`
  font-size: 11px;
  display: flex;
  padding-top: 15px;
  justify-content: center;
  color: ${colors.gray[400]};

  p {
    padding: 0 8px 2px 8px;
    border-radius: 20px;
  }

  .purpose {
    background-color: #fef4c2;
    margin-right: 5px;
  }
  .method {
    background-color: #ffdfdf;
  }
`;

const deadLine = css`
  font-size: 11px;
  color: ${colors.gray[400]};
  padding-top: 8px;
  margin-bottom: 10px;
`;

const jobTitle = css`
  font-family: 'nanumEB';
  font-size: 14px;
  color: ${colors.secondary};
  width: 170px;
  margin-bottom: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
