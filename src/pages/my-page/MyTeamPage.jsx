/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useMemo, useState } from 'react';
import { css } from '@emotion/react';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnBg: '#fff',
  btnHover: '#fcfbf8',
  tabActive: '#FEF1B2',
  primary: '#FFCC00',
  white: '#fff',
  overlay: 'rgba(0, 0, 0, 0.45)',
  dangerBg: '#FFDFDF',
  successBg: '#CFE6C1',
  dangerText: '#666',
  successText: '#666',
  modalTitle: '#103c1f',
  avatarBg: '#ffe7e7',
  placeholder: '#b5b0a8',
  arrow: '#26422A',
};

const styles = {
  wrap: css`
    padding: 24px 32px;
    color: ${colors.text};
    font-family: 'nanumR', 'NanumSquareRound', sans-serif;
  `,
  contentContainer: css`
    max-width: 1100px;
    margin: 0 auto;
  `,
  title: css`
    margin: 40px 0 24px;
    font-size: 22px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  tabs: css`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  `,
  tabBtn: (active) => css`
    width: 90px;
    height: 33px;
    border-radius: 10px;
    border: 1px solid ${colors.border};
    background: ${active ? colors.tabActive : colors.white};
    cursor: pointer;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    &:hover {
      background: ${active ? '' : colors.btnHover};
    }
  `,
  teamCard: css`
    background: ${colors.white};
    border: 1px solid ${colors.border};
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    margin-bottom: 16px;
    overflow: hidden;
  `,
  teamHeader: css`
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
  `,
  teamTitle: css`
    font-weight: 700;
    font-size: 18px;
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  `,
  teamMeta: css`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${colors.muted};
    font-size: 12px;
    margin-top: 6px;
  `,
  badge: (status) => css`
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 12px;
    border: 1px solid ${colors.border};
    background: ${status === '종료' ? colors.dangerBg : colors.successBg};
    color: ${status === '종료' ? colors.dangerText : colors.successText};
  `,
  count: css`
    color: ${colors.muted};
    font-size: 14px;
  `,
  caret: (open) => css`
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${colors.arrow};
    align-self: center;
    justify-self: center;
    transition: transform 0.15s ease;
    transform: rotate(${open ? 180 : 0}deg);
  `,
  memberRow: (isProject) => css`
    display: grid;
    grid-template-columns: ${isProject ? '56px 1fr 100px 150px auto' : '56px 1fr 100px auto'};
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    border-bottom: 1px solid ${colors.border};
    &:last-of-type {
      border-bottom: 0;
    }
  `,
  dot: (color) => css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${color || '#e5e5e5'};
  `,
  memberName: css`
    font-weight: 600;
    font-size: 15px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  subText: css`
    color: ${colors.muted};
  `,
  actions: css`
    display: flex;
    gap: 8px;
    justify-self: end;
  `,
  btn: css`
    height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    border: 1px solid ${colors.border};
    background: ${colors.white};
    cursor: pointer;
    font-family: inherit;
    &:hover {
      background: #fcfbf8;
    }
  `,
  reviewBtn: css`
    background: #fef1b2;
    &:hover {
      background: #f9e89a;
    }
  `,
  empty: css`
    border: 1px dashed ${colors.border};
    border-radius: 12px;
    padding: 24px;
    color: ${colors.muted};
    text-align: center;
  `,
  overlay: css`
    position: fixed;
    inset: 0;
    background: ${colors.overlay};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `,
  modal: css`
    width: 410px;
    max-width: calc(100% - 32px);
    background: ${colors.white};
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    padding: 30px;
    display: flex;
    flex-direction: column;
  `,
  modalHeader: css`
    position: relative;
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.border};
  `,
  modalTitle: css`
    margin: 0;
    font-size: 22px;
    color: ${colors.modalTitle};
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  `,
  closeBtn: css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    border: 0;
    background: transparent;
    cursor: pointer;
    font-size: 20px;
    color: ${colors.muted};
  `,
  profileRow: css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 0 12px;
  `,
  avatar: css`
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${colors.avatarBg};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  `,
  label: css`
    display: block;
    font-weight: 600;
    margin: 8px 0 6px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  textArea: css`
    width: 100%;
    min-height: 150px;
    border: 1px solid ${colors.border};
    border-radius: 12px;
    resize: vertical;
    padding: 14px;
    font-family: inherit;
    color: ${colors.text};
    outline: none;
    &::placeholder {
      color: ${colors.placeholder};
    }
  `,
  helper: css`
    text-align: right;
    color: ${colors.muted};
    font-size: 12px;
    padding-top: 6px;
  `,
  notes: css`
    margin: 14px 0 24px;
    padding-left: 18px;
    color: ${colors.muted};
    font-size: 12px;
    line-height: 1.6;
  `,
  saveBar: css`
    margin-top: auto;
    display: flex;
    justify-content: center;
  `,
  saveBtn: css`
    min-width: 200px;
    height: 48px;
    border-radius: 12px;
    border: 0;
    background: ${colors.primary};
    color: #173300;
    font-weight: 700;
    cursor: pointer;
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  `,
};

const sampleTeams = [
  {
    id: 't1',
    category: '프로젝트',
    title: '사이드프로젝트 팀원 구해요',
    status: '종료',
    period: '2025.06.07 ~ 2025.08.16',
    members: [
      { id: 'm1', name: '솔랑솔랑', grade: '리더', position: '프론트엔드', color: '#f5c24b' },
      { id: 'm2', name: '팔랑팔랑', grade: '멤버', position: '백엔드', color: '#c9a7ff' },
      { id: 'm3', name: '팔랑귀', grade: '멤버', position: '디자인', color: '#ffa3b8' },
    ],
  },
  {
    id: 't2',
    category: '프로젝트',
    title: '웹 프로젝트 함께할 분',
    status: '진행중',
    period: '2025.06.07 ~ 진행 중',
    members: [{ id: 'm5', name: '짱구', grade: '리더', position: '백엔드', color: '#ffd482' }],
  },
  {
    id: 't3',
    category: '과제',
    title: '운영체제 과제 같이해요',
    status: '진행중',
    period: '2025.09.01 ~ 진행 중',
    members: [{ id: 'm6', name: '유리', grade: '리더', color: '#ffb3c7' }],
  },
  {
    id: 't4',
    category: '스터디',
    title: '코테 스터디 모집',
    status: '종료',
    period: '2025.04.01 ~ 2025.06.30',
    members: [{ id: 'm7', name: '철수', grade: '리더', color: '#b3e5ff' }],
  },
];
const currentUserId = 'm1';

const MyTeamPage = () => {
  const [tab, setTab] = useState('프로젝트');
  const [teams, setTeams] = useState(sampleTeams);
  const [open, setOpen] = useState(() => new Set());
  const [reviewTarget, setReviewTarget] = useState(null);
  const [reviewText, setReviewText] = useState('');

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDeleteMember = (teamId, memberId) => {
    if (!window.confirm('정말 팀에서 삭제하시겠습니까?')) return;
    setTeams((prev) =>
      prev.map((team) =>
        team.id === teamId
          ? { ...team, members: team.members.filter((m) => m.id !== memberId) }
          : team
      )
    );
  };

  const openReview = (team, member) => {
    setReviewTarget({ team, member });
    setReviewText('');
  };
  const closeReview = () => setReviewTarget(null);
  const saveReview = () => {
    alert(`리뷰 저장: ${reviewTarget?.member.name}\n${reviewText}`);
    closeReview();
  };

  const filtered = useMemo(() => teams.filter((t) => t.category === tab), [teams, tab]);
  const maxChars = 200;

  return (
    <div css={styles.wrap}>
      <div css={styles.contentContainer}>
        <h2 css={styles.title}>🧑‍🤝‍🧑 내 팀 관리</h2>

        <div css={styles.tabs}>
          <button css={styles.tabBtn(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>
            프로젝트
          </button>
          <button css={styles.tabBtn(tab === '과제')} onClick={() => setTab('과제')}>
            과제
          </button>
          <button css={styles.tabBtn(tab === '스터디')} onClick={() => setTab('스터디')}>
            스터디
          </button>
        </div>

        {filtered.length === 0 && <div css={styles.empty}>해당 카테고리의 팀이 없어요.</div>}

        {filtered.map((team) => {
          const isOpen = open.has(team.id);
          const leaderName = team.members.find((m) => m.grade === '리더')?.name || '리더';
          const isProject = team.category === '프로젝트';
          const isLeader = team.members.some((m) => m.id === currentUserId && m.grade === '리더');

          return (
            <section key={team.id} css={styles.teamCard}>
              <button
                css={styles.teamHeader}
                onClick={() => toggle(team.id)}
                aria-expanded={isOpen}
              >
                <div>
                  <div css={styles.teamTitle}>{team.title}</div>
                  <div css={styles.teamMeta}>
                    <span>{leaderName}</span>
                    <span css={styles.badge(team.status)}>{team.status}</span>
                    <span>{team.period}</span>
                  </div>
                </div>
                <span css={styles.count}>{team.members.length}명</span>
                <span css={styles.caret(isOpen)} />
              </button>

              {isOpen &&
                team.members.map((member) => (
                  <div key={member.id} css={styles.memberRow(isProject)}>
                    <div css={styles.dot(member.color)} />
                    <div>
                      <div css={styles.memberName}>{member.name}</div>
                    </div>
                    <small css={styles.subText}>{member.grade}</small>
                    {isProject && (
                      <small css={[styles.subText, { textAlign: 'center' }]}>
                        {member.position}
                      </small>
                    )}
                    <div css={styles.actions}>
                      <button
                        css={styles.btn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMember(team.id, member.id);
                        }}
                        style={{ visibility: member.id !== currentUserId ? 'visible' : 'hidden' }}
                      >
                        삭제하기
                      </button>
                      <button
                        css={[styles.btn, styles.reviewBtn]}
                        onClick={(e) => {
                          e.stopPropagation();
                          openReview(team, member);
                        }}
                        style={{ visibility: member.id !== currentUserId ? 'visible' : 'hidden' }}
                      >
                        리뷰쓰기
                      </button>
                    </div>
                  </div>
                ))}
            </section>
          );
        })}

        {reviewTarget && (
          <div css={styles.overlay} onClick={closeReview}>
            <div css={styles.modal} onClick={(e) => e.stopPropagation()}>
              <header css={styles.modalHeader}>
                <h3 css={styles.modalTitle}>리뷰쓰기</h3>
                <button css={styles.closeBtn} onClick={closeReview}>
                  ✕
                </button>
              </header>
              <div css={styles.profileRow}>
                <div css={styles.avatar}>🐣</div>
                <div
                  css={css`
                    font-weight: 600;
                    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
                  `}
                >
                  {reviewTarget.member.name}
                </div>
              </div>
              <label htmlFor="review-detail" css={styles.label}>
                상세
              </label>
              <textarea
                id="review-detail"
                css={styles.textArea}
                maxLength={maxChars}
                placeholder={`${reviewTarget.member.name}님에 대한 솔직한 피드백을 남겨주세요.`}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <div css={styles.helper}>
                {reviewText.length} / {maxChars}
              </div>
              <ul css={styles.notes}>
                <li>
                  작성한 피드백은 닉네임, 프로필 이미지와 함께 누구나 볼 수 있도록 공개됩니다.
                  피드백 내용에 민감한 개인정보가 포함되지 않도록 조심해 주세요.
                </li>
                <li>
                  솔직하게 작성하신 피드백은 다른 분들께 큰 도움이 됩니다. 하지만 허위 사실이나
                  명예훼손, 욕설, 타인비방글 등 제 3자의 권리를 침해하는 피드백은 서비스
                  이용약관이나 관련 법률에 따라 제재를 받을 수 있습니다.
                </li>
              </ul>
              <div css={styles.saveBar}>
                <button css={styles.saveBtn} onClick={saveReview}>
                  저장하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTeamPage;
