/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import TechIconList from '@/components/TechIconList';
import { useNavigate } from 'react-router-dom';

const HexagonCard = ({ jobData }) => {
  const navigate = useNavigate();

  return (
    <div css={container}>
      <div css={hexagonBorder(jobData?.isSelected)}></div>
      <div
        css={hexagon(jobData?.isSelected)}
        onClick={() => navigate(`/project-list/${jobData?.id}`)}
      >
        <div css={content}>
          <div css={cardBadge}>
            <p className="purpose">{jobData?.purpose.desc}</p>
            <p className="method">{jobData?.meetingType.desc}</p>
          </div>
          <p css={deadLine}>{jobData?.deadline}까지</p>
          <p css={jobTitle}>{jobData?.title}</p>
          <TechIconList teches={jobData?.skills.map((item) => item.name)} techMaxLength={4} />
        </div>
      </div>
      {jobData?.isSelected === 2 && <div css={fakeHexagon}></div>}
    </div>
  );
};

export default HexagonCard;

const container = css`
  position: relative;
  width: 278px;
  height: 204px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }
`;

const hexagonBorder = (isSelected) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${isSelected === 1 ? '#daa520' : 'colors.secondary'};
  clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
`;

const hexagon = (isSelected) => css`
  position: absolute;
  background-color: ${isSelected === 1 ? '#FFFEEF' : '#ffffff'};
  top: ${isSelected === 1 ? '4px' : '1px'};
  left: ${isSelected === 1 ? '4px' : '1px'};
  width: ${isSelected === 1 ? '270px' : '276px'};
  height: ${isSelected === 1 ? '196px' : '202px'};
  clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  z-index: 1;

  display: flex;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: #fdfdf7;
  }
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
  height: 44px;
  margin-bottom: 16px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const fakeHexagon = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(72, 77, 73, 0.6);
  clip-path: polygon(20% 0, 80% 0, 100% 50%, 80% 100%, 20% 100%, 0% 50%);
  z-index: 100;
`;
