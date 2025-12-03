/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';
import { useTeamStore } from '../../../stores/useTeamStore';
import api from '@/api/api';

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
  const {
    open,
    toggle,
    deleteMember,
    openReview,
    reviewedMembers,
    setHoveredMember,
    currentUserNickname,
  } = useTeamStore();

  const isOpen = open.has(team.id);
  const leaderName = team.leaderNickname;
  const isProject = team.category.name === 'PROJECT';

  async function handleDeleteMember(e, teamId, targetId) {
    e.stopPropagation();
    if (confirm('정말 팀에서 삭제하시겠습니까?') === false) return;
    try {
      const res = await api.delete(`/api/v1/teams/${teamId}/members/${targetId}`);
      if (res.status === 200) {
        deleteMember(teamId, targetId);
        alert('팀에서 멤버가 성공적으로 삭제되었습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleMemberClick = (e, member) => {
    e.preventDefault();
    e.stopPropagation();
    setHoveredMember(member);
  };

  const periodText =
    team.period && typeof team.period === 'object'
      ? `${team.period.startDate} ~ ${team.period.endDate}`
      : team.period;
  const statusValue =
    team.status && typeof team.status === 'object' ? team.status.desc : team.status;
  const titleValue =
    team.recruitmentTitle && typeof team.recruitmentTitle === 'object'
      ? team.recruitmentTitle.name || team.recruitmentTitle.desc
      : team.recruitmentTitle;

  return (
    <section css={teamCard}>
      <button css={teamHeader} onClick={() => toggle(team.id)}>
        <div>
          <div css={teamTitle}>{titleValue}</div>
          <div css={teamMeta}>
            <span>{leaderName}</span>
            <span css={badge(statusValue)}>{statusValue}</span>
            <span>{periodText}</span>
          </div>
        </div>
        <span css={count}>{team.memberCount}명</span>
        <span css={caret(isOpen)} />
      </button>

      {isOpen &&
        team.members.map((member) => {
          const isCurrentUser = member.nickname === currentUserNickname;
          const isMemberLeader = member.nickname === leaderName;
          const currentUserIsLeader = currentUserNickname === leaderName;

          return (
            <div key={member.userId} css={memberRow(isProject)}>
              <div css={dot(member.color)}>
                <img 
                  src={member.profileImageUrl || defaultImgUrl}
                  alt={member.nickname}
                />
              </div>

              <button
                type="button"
                css={memberNameWrapper}
                onClick={(e) => handleMemberClick(e, member)}
              >
                <span css={memberName}>{member.nickname}</span>
              </button>

              <small css={subText}>{member.role.desc}</small>
              {isProject && (
                <small css={[subText, { textAlign: 'center' }]}>{member.position?.desc}</small>
              )}
              <div css={actions}>
                {currentUserIsLeader && !isCurrentUser && !isMemberLeader && (
                  <button css={btn} onClick={(e) => handleDeleteMember(e, team.id, member.userId)}>
                    삭제하기
                  </button>
                )}
                {!isCurrentUser && (
                  <button
                    css={[btn, reviewBtn]}
                    onClick={(e) => {
                      e.stopPropagation();
                      openReview(team, member);
                    }}
                  >
                    {reviewedMembers.has(`${team.id}_${member.userId}`) ? '리뷰수정' : '리뷰쓰기'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default TeamCard;

const memberNameWrapper = css`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
    text-decoration: underline;
  }
  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;

const teamCard = css`
  background: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  overflow: hidden;
  position: relative;
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
  background: ${status === 'CLOSED' || status === 'COMPLETED' ? colors.dangerBg : colors.successBg};
  color: ${status === 'CLOSED' || status === 'COMPLETED' ? colors.dangerText : colors.successText};
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
const defaultImgUrl =
  'https://waggle-image-bucket.s3.ap-northeast-2.amazonaws.com/user-profile-images/default-profile-image.png';

const dot = (color) => css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${color || '#e5e5e5'};
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
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
  min-width: 180px;
  justify-content: flex-end;
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
