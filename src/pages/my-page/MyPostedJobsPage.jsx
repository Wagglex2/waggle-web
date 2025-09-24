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
    margin: 0 0 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  tabs: css`
    display: flex;
    gap: 8px;
    margin: 0 0 16px;
  `,
  tabButton: (isActive) => css`
    width: 90px;
    height: 33px;
    border-radius: 10px;
    border: 1px solid ${colors.border};
    background: ${isActive ? colors.tabActive : '#fff'};
    cursor: pointer;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: ${isActive ? '' : colors.btnHover};
    }
  `,
  postCard: css`
    background: #fff;
    border: 1px solid ${colors.border};
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    overflow: hidden;
    margin-bottom: 16px;
  `,
  postHeader: css`
    width: 100%;
    text-align: left;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 12px;
    padding: 24px 20px;
    background: #fff;
    border: 0;
    border-bottom: 1px solid ${colors.border};
    cursor: pointer;
  `,
  postTitleSection: css`
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  postTitle: css`
    font-weight: 700;
    font-size: 18px;
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  `,
  postActions: css`
    display: flex;
    gap: 8px;
  `,
  editBtn: css`
    height: 27px;
    padding: 0 12px;
    border-radius: 5px;
    border: 1px solid #b3b3b3;
    background: #ffffff;
    color: #b3b3b3;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
    &:hover {
      background: #f0f0f0;
    }
  `,
  deleteBtn: css`
    height: 27px;
    padding: 0 12px;
    border-radius: 5px;
    border: 1px solid #b3b3b3;
    background: #ffffff;
    color: #b3b3b3;
    cursor: pointer;
    font-family: inherit;
    font-size: 12px;
    &:hover {
      background: #f0f0f0;
    }
  `,
  applicantInfoSection: css`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-self: end;
  `,
  viewApplicants: css`
    color: ${colors.muted};
    font-size: 14px;
  `,
  caret: (isOpen) => css`
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #26422a;
    align-self: center;
    justify-self: center;
    transition: transform 0.15s ease;
    transform: rotate(${isOpen ? 180 : 0}deg);
  `,
  postContent: css`
    padding: 0;
  `,
  memberRow: css`
    display: grid;
    grid-template-columns: 56px 1.5fr 1fr auto;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
    border-bottom: 1px solid ${colors.border};
    &:last-of-type {
      border-bottom: none;
    }
  `,
  dot: (bgColor) => css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${bgColor || '#e5e5e5'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
  `,
  memberName: css`
    font-weight: 600;
    font-size: 15px;
    color: #333;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  applicationDate: css`
    font-size: 15px;
    color: ${colors.muted};
    text-align: center;
  `,
  memberActions: css`
    display: flex;
    gap: 8px;
    justify-self: end;
  `,
  rejectBtn: css`
    min-width: 104px;
    height: 35px;
    padding: 0 12px;
    border-radius: 40px;
    border: 1px solid #b3b3b3;
    background: #ffffff;
    color: #666666;
    cursor: pointer;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    font-size: 15px;
    &:hover {
      background: #e3e3e3;
    }
  `,
  viewBtn: css`
    min-width: 104px;
    height: 35px;
    padding: 0 12px;
    border-radius: 40px;
    border: 1px solid #b3b3b3;
    background: #fef1b2;
    color: #666666;
    cursor: pointer;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    font-size: 15px;
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
    background: rgba(0, 0, 0, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  `,
  modal: css`
    width: 400px;
    height: 600px;
    max-width: calc(100% - 32px);
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `,
  modalHeader: css`
    position: relative;
    padding: 20px 24px;
    border-bottom: 1px solid ${colors.border};
    text-align: center;
    color: #153b24;
    font-weight: 800;
    font-size: 22px;
    flex-shrink: 0;
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  `,
  modalContent: css`
    flex-grow: 1;
    overflow-y: auto;
    padding: 0 24px;
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
    color: ${colors.muted};
    font-size: 20px;
  `,
  fieldRow: css`
    display: grid;
    grid-template-columns: 100px 1fr;
    align-items: start;
    gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid ${colors.border};
    &:first-of-type {
      margin-top: 10px;
    }
  `,
  fieldLabel: css`
    color: ${colors.muted};
    font-size: 13px;
  `,
  fieldValue: css`
    font-weight: 700;
    color: ${colors.text};
    font-size: 13px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  detailBox: css`
    margin-top: 12px;
    border: 1px solid ${colors.border};
    border-radius: 12px;
    overflow: hidden;
  `,
  detailArea: css`
    width: 100%;
    min-height: 220px;
    resize: none;
    padding: 12px;
    border: 0;
    outline: none;
    font-family: inherit;
    color: ${colors.text};
    font-size: 13px;
  `,
  modalActions: css`
    padding: 18px 24px 24px;
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-shrink: 0;
  `,
  modalReject: css`
    min-width: 160px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid #b3b3b3;
    background: #fff;
    color: #333;
    cursor: pointer;
    font-size: 13px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  modalAccept: css`
    min-width: 160px;
    height: 44px;
    border-radius: 12px;
    border: 0;
    background: ${colors.primary};
    color: #173300;
    font-weight: 700;
    cursor: pointer;
    font-size: 13px;
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  `,
};

const samplePosts = [
  {
    id: 1,
    title: '웹 어쩌구저쩌구 사이드프로젝트 함께할 팀원 구합니다.',
    content:
      '웹 애플리케이션 개발 프로젝트에 참여할 프론트엔드 개발자를 찾습니다. React, TypeScript 경험이 있으신 분 환영합니다.',
    type: '프로젝트',
    deadline: '2025.03.15',
    applicants: [
      {
        id: 'a1',
        name: '짱구',
        color: '#f5c24b',
        applicationDate: '2025.01.15 14:30',
        mode: '온라인',
        year: '3학년',
        position: '프론트',
        stack: 'ts, react, figma',
        detail: '어쩌구\n.\n.\n.\n저쩌구',
      },
      {
        id: 'a2',
        name: '짱아',
        color: '#c9a7ff',
        applicationDate: '2025.01.16 09:15',
        mode: '온라인',
        year: '4학년',
        position: '백엔드',
        stack: 'node, prisma',
        detail: '간단 자기소개와 참여 의사',
      },
      {
        id: 'a3',
        name: '맹구',
        color: '#8ee7f2',
        applicationDate: '2025.01.17 16:45',
        mode: '오프라인',
        year: '2학년',
        position: '디자인',
        stack: 'figma, ai',
        detail: '디자인 포트폴리오 보유',
      },
    ],
  },
  {
    id: 2,
    title: '알고리즘 스터디 모임',
    content:
      '매주 토요일 오후 2시에 진행하는 알고리즘 스터디입니다. 백준, 프로그래머스 문제를 함께 풀어보고 토론합니다.',
    type: '스터디',
    deadline: '2025.03.20',
    applicants: [
      {
        id: 'a4',
        name: '훈이',
        color: '#ffd482',
        applicationDate: '2025.01.18 11:20',
        mode: '온라인',
        year: '3학년',
        detail: '매주 토요일 참여 가능',
      },
      {
        id: 'a5',
        name: '유리',
        color: '#ffa3b8',
        applicationDate: '2025.01.19 13:10',
        mode: '온라인',
        year: '1학년',
        detail: '기초 알고리즘 학습 중',
      },
    ],
  },
  {
    id: 3,
    title: '운영체제 과제 같이 하실 분 구합니다.',
    content:
      '개인 포트폴리오 웹사이트를 제작하는 과제입니다. HTML, CSS, JavaScript를 활용하여 반응형 웹사이트를 만들어보세요.',
    type: '과제',
    deadline: '2025.03.25',
    applicants: [
      {
        id: 'a6',
        name: '철수',
        color: '#b3e5ff',
        applicationDate: '2025.01.20 15:30',
        mode: '오프라인',
        year: '2학년',
        detail: '과제 일정 맞춰 진행 가능',
      },
    ],
  },
];

const MyPostedJobsPage = () => {
  const [tab, setTab] = useState('프로젝트');
  const [posts, setPosts] = useState(samplePosts);
  const [open, setOpen] = useState(() => new Set());
  const [appModal, setAppModal] = useState(null);

  const toggle = (id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleEdit = (postId) => {
    alert(`공고 ${postId} 수정하기`);
  };

  const handleDelete = (postId) => {
    if (window.confirm('정말 이 공고를 삭제하시겠습니까?')) {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  const handleReject = (postId, applicantId) => {
    if (appModal) setAppModal(null);

    if (window.confirm('정말 이 지원자를 거절하시겠습니까?')) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              applicants: post.applicants.filter((app) => app.id !== applicantId),
            };
          }
          return post;
        })
      );
    }
  };

  const acceptApplicant = (postId, applicantId) => {
    alert('수락되었습니다.');
    setAppModal(null);
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            applicants: post.applicants.filter((app) => app.id !== applicantId),
          };
        }
        return post;
      })
    );
  };

  const handleViewApplication = (applicant, postType) => {
    setAppModal({ ...applicant, postType });
  };

  const closeModal = () => setAppModal(null);

  const filteredPosts = useMemo(() => posts.filter((p) => p.type === tab), [posts, tab]);

  const findPostIdByApplicantId = (applicantId) => {
    const post = posts.find((p) => p.applicants.some((a) => a.id === applicantId));
    return post ? post.id : null;
  };

  return (
    <div css={styles.wrap}>
      <div css={styles.contentContainer}>
        <h2 css={styles.title}>📝 내가 올린 공고</h2>

        <div css={styles.tabs}>
          <button css={styles.tabButton(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>
            프로젝트
          </button>
          <button css={styles.tabButton(tab === '과제')} onClick={() => setTab('과제')}>
            과제
          </button>
          <button css={styles.tabButton(tab === '스터디')} onClick={() => setTab('스터디')}>
            스터디
          </button>
        </div>

        {filteredPosts.length === 0 && <div css={styles.empty}>해당 카테고리의 공고가 없어요.</div>}

        {filteredPosts.map((post) => {
          const isOpen = open.has(post.id);

          return (
            <section css={styles.postCard} key={post.id}>
              <div
                css={styles.postHeader}
                onClick={() => toggle(post.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(post.id);
                  }
                }}
                role="button"
                tabIndex="0"
                aria-expanded={isOpen}
              >
                <div css={styles.postTitleSection}>
                  <h3 css={styles.postTitle}>{post.title}</h3>
                  <div css={styles.postActions} onClick={(e) => e.stopPropagation()}>
                    <button css={styles.editBtn} onClick={() => handleEdit(post.id)}>
                      수정
                    </button>
                    <button css={styles.deleteBtn} onClick={() => handleDelete(post.id)}>
                      삭제
                    </button>
                  </div>
                </div>
                <div css={styles.applicantInfoSection}>
                  <span css={styles.viewApplicants}>마감일 | {post.deadline}</span>
                  <span css={styles.viewApplicants}>지원자 보기</span>
                </div>
                <span css={styles.caret(isOpen)} />
              </div>

              {isOpen && (
                <div css={styles.postContent}>
                  {post.applicants.length > 0 ? (
                    post.applicants.map((applicant) => (
                      <div css={styles.memberRow} key={applicant.id}>
                        <div css={styles.dot(applicant.color)}>{applicant.avatar}</div>
                        <span css={styles.memberName}>{applicant.name}</span>
                        <span css={styles.applicationDate}>
                          {applicant.applicationDate.split(' ')[0]}
                        </span>
                        <div css={styles.memberActions}>
                          <button
                            css={styles.rejectBtn}
                            onClick={() => handleReject(post.id, applicant.id)}
                          >
                            거절하기
                          </button>
                          <button
                            css={styles.viewBtn}
                            onClick={() => handleViewApplication(applicant, post.type)}
                          >
                            지원서보기
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      css={css`
                        padding: 24px;
                        text-align: center;
                        color: ${colors.muted};
                      `}
                    >
                      아직 지원자가 없습니다.
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })}
      </div>

      {appModal && (
        <div css={styles.overlay} onClick={closeModal} role="dialog" aria-modal="true">
          <div css={styles.modal} onClick={(e) => e.stopPropagation()}>
            <header css={styles.modalHeader}>
              {appModal.name}님의 지원서
              <button css={styles.closeBtn} onClick={closeModal} aria-label="닫기">
                ✕
              </button>
            </header>

            <div css={styles.modalContent}>
              <div css={styles.fieldRow}>
                <span css={styles.fieldLabel}>가능한 진행방식</span>
                <span css={styles.fieldValue}>{appModal.mode}</span>
              </div>
              <div css={styles.fieldRow}>
                <span css={styles.fieldLabel}>학년</span>
                <span css={styles.fieldValue}>{appModal.year}</span>
              </div>

              {appModal.postType === '프로젝트' && (
                <>
                  <div css={styles.fieldRow}>
                    <span css={styles.fieldLabel}>지원 포지션</span>
                    <span css={styles.fieldValue}>{appModal.position}</span>
                  </div>
                  <div css={styles.fieldRow}>
                    <span css={styles.fieldLabel}>기술 스택</span>
                    <span css={styles.fieldValue}>{appModal.stack}</span>
                  </div>
                </>
              )}

              <div style={{ marginTop: '12px' }}>
                <span css={styles.fieldLabel}>상세</span>
                <div css={styles.detailBox}>
                  <textarea css={styles.detailArea} readOnly value={appModal.detail || ''} />
                </div>
              </div>
            </div>

            <footer css={styles.modalActions}>
              <button
                css={styles.modalReject}
                onClick={() => handleReject(findPostIdByApplicantId(appModal.id), appModal.id)}
              >
                거절하기
              </button>
              <button
                css={styles.modalAccept}
                onClick={() => acceptApplicant(findPostIdByApplicantId(appModal.id), appModal.id)}
              >
                수락하기
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPostedJobsPage;
