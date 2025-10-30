/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';
import { useTeamStore, currentUserId } from '../useTeamStore';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnHover: '#fcfbf8',
  white: '#fff',
  dangerBg: '#FFDFDF',
  successBg: '#CFE6C1',
  dangerText: '#666',
  successText: '#666',
  arrow: '#26422A',
};

const TeamCard = ({ team }) => {
  const { open, toggle, deleteMember, openReview, reviewedMembers } = useTeamStore();

  const isOpen = open.has(team.id);
  const leaderName = team.members.find((m) => m.grade === '리더')?.name || '리더';
  const isProject = team.category === '프로젝트';

  return (
    <section css={teamCard}>
      <button css={teamHeader} onClick={() => toggle(team.id)} aria-expanded={isOpen}>
        <div>
          <div css={teamTitle}>{team.title}</div>
          <div css={teamMeta}>
            <span>{leaderName}</span>
            <span css={badge(team.status)}>{team.status}</span>
            <span>{team.period}</span>
          </div>
        </div>
        <span css={count}>{team.members.length}명</span>
        <span css={caret(isOpen)} />
      </button>

      {isOpen &&
        team.members.map((member) => (
          <div key={member.id} css={memberRow(isProject)}>
            <div css={dot(member.color)} />
            <div>
              <div css={memberName}>{member.name}</div>
            </div>
            <small css={subText}>{member.grade}</small>
            {isProject && <small css={[subText, { textAlign: 'center' }]}>{member.position}</small>}
            <div css={actions}>
              <button
                css={btn}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMember(team.id, member.id);
                }}
                style={{ visibility: member.id !== currentUserId ? 'visible' : 'hidden' }}
              >
                삭제하기
              </button>
              <button
                css={[btn, reviewBtn]}
                onClick={(e) => {
                  e.stopPropagation();
                  openReview(team, member);
                }}
                style={{ visibility: member.id !== currentUserId ? 'visible' : 'hidden' }}
              >
                {reviewedMembers.has(`${team.id}_${member.id}`) ? '리뷰수정' : '리뷰쓰기'}
              </button>
            </div>
          </div>
        ))}
    </section>
  );
};

export default TeamCard;

const teamCard = css`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  overflow: hidden;
`;

const teamHeader = css`
  width: 100%;
  text-align: left;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: ${colors.white};
  border: 0;
  cursor: pointer;
  border-bottom: 1px solid ${colors.border};
`;

const teamTitle = css`
  font-weight: 700;
  font-size: 18px;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
`;

const teamMeta = css`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.muted};
  font-size: 12px;
  margin-top: 6px;
`;

const badge = (status) => css`
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid ${colors.border};
  background: ${status === '종료' ? colors.dangerBg : colors.successBg};
  color: ${status === '종료' ? colors.dangerText : colors.successText};
`;

const count = css`
  color: ${colors.muted};
  font-size: 14px;
`;

const caret = (open) => css`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid ${colors.arrow};
  align-self: center;
  justify-self: center;
  transition: transform 0.15s ease;
  transform: rotate(${open ? 180 : 0}deg);
`;

const memberRow = (isProject) => css`
  display: grid;
  grid-template-columns: ${isProject ? '56px 1fr 100px 150px auto' : '56px 1fr 100px auto'};
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid ${colors.border};
  &:last-of-type {
    border-bottom: 0;
  }
`;

const dot = (color) => css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${color || '#e5e5e5'};
`;

const memberName = css`
  font-weight: 600;
  font-size: 15px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const subText = css`
  color: ${colors.muted};
`;

const actions = css`
  display: flex;
  gap: 8px;
  justify-self: end;
`;

const btn = css`
  height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${colors.border};
  background: ${colors.white};
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  &:hover {
    background: #fcfbf8;
  }
`;

const reviewBtn = css`
  background: #fef1b2;
  &:hover {
    background: #f9e89a;
  }
`;
