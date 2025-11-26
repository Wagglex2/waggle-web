/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';

const RecruitmentStatus = ({ category, positions }) => {
  return (
    <>
      {category === '프로젝트' ? (
        <div css={positionStateBox}>
          {positions.map((item, index) => (
            <div css={positionBox} key={index}>
              <p className="position-name">{item.position.desc}</p>
              <p className="personnel">
                <b>{item.participantInfo.currParticipants}</b> /{' '}
                {item.participantInfo.maxParticipants}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div css={positionStateBox}>
          <div css={positionBox}>
            <p className="position-name">멤버</p>
            <p className="personnel">
              <b>{positions.currParticipants}</b> / {positions.maxParticipants}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default RecruitmentStatus;

const positionStateBox = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const positionBox = css`
  display: flex;
  font-size: 13px;
  margin-top: 8px;

  .position-name {
    width: 75px;
    font-family: 'nanumB';
    color: ${colors.gray[400]};
  }
`;
