/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useMemo, useState } from 'react';
import { css } from '@emotion/react';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  tabActive: '#FEF1B2',
  primary: '#FFCC00',
  danger: '#FFE7E7',
  dangerBorder: '#FFD6D6',
  btnHover: '#fcfbf8',
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
    font-weight: 800;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  `,
  tabs: css`
    display: flex;
    gap: 8px;
    margin: 0 0 12px;
  `,
  tabBtn: (active) => css`
    width: 90px;
    height: 33px;
    border-radius: 10px;
    border: 1px solid ${colors.border};
    background: ${active ? colors.tabActive : '#fff'};
    cursor: pointer;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    &:hover {
      background: ${active ? '' : colors.btnHover};
    }
  `,
  tableWrap: css`
    border: 1px solid ${colors.border};
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
  `,
  tableHead: css`
    display: grid;
    grid-template-columns: 70px 1fr 200px 220px 100px 100px;
    padding: 12px 24px 12px 16px;
    background: #faf7ef;
    border-bottom: 1px solid ${colors.border};
    font-weight: 700;
    font-size: 13px;
    color: #666;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    & > div {
      text-align: center;
    }
  `,
  row: css`
    display: grid;
    grid-template-columns: 70px 1fr 200px 220px 100px 100px;
    align-items: center;
    padding: 14px 24px 14px 16px;
    border-bottom: 1px solid ${colors.border};
    font-size: 14px;
    &:last-child {
      border-bottom: none;
    }
    & > div {
      text-align: center;
    }
  `,
  cellEllipsis: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  `,
  badge: (tone) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 20px;
    border-radius: 15px;
    font-size: 13px;
    ${tone === 'waiting' && `background:#FFF4C2; border:1px solid #F2E6A2; color:#6E5B08;`}
    ${tone === 'rejected' && `background:#FFDFDF; border:1px solid #F4CACA; color:#7A3A3A;`}
    ${tone === 'accepted' && `background:#CFE6E9; border:1px solid #B6D7DE; color:#2F5F66;`}
    ${tone === 'cancelled' && `background:#DDEEDB; border:1px solid #C7E0C2; color:#3C6A43;`}
    ${tone === 'closed' && `background:#E9E9E9; border:1px solid #D9D9D9; color:#666;`}
  `,
  action: css`
    width: 80px;
    height: 30px;
    padding: 0;
    border-radius: 15px;
    border: 1px solid #b3b3b3;
    background: #fff;
    cursor: pointer;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
    font-size: 13px;
    color: #666666;
  `,
  danger: css`
    border-color: #b3b3b3;
    background: #fff;
    color: #666666;
  `,
  empty: css`
    padding: 28px;
    text-align: center;
    color: ${colors.muted};
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
    max-width: calc(100% - 32px);
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 90vh;
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
    right: 10px;
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
    min-height: 120px;
    resize: none;
    padding: 12px;
    border: 0;
    outline: none;
    font-family: inherit;
    color: ${colors.text};
    font-size: 13px;
    background-color: #fdfdfd;
  `,
};

const sampleRows = [
  // 프로젝트 예시
  {
    id: 1,
    category: '프로젝트',
    title: '프론트엔드 개발자 구인 (React)',
    due: '2025.10.15',
    status: '대기중',
    applicant: {
      name: '짱구',
      mode: '온라인',
      year: '3학년',
      position: '프론트엔드',
      stack: 'React, TypeScript',
      detail: 'React 프로젝트 경험이 많습니다. 성실하게 참여하겠습니다.',
    },
  },
  {
    id: 2,
    category: '프로젝트',
    title: 'UX/UI 디자이너 모집',
    due: '2025.10.10',
    status: '수락됨',
    applicant: {
      name: '유리',
      mode: '온/오프라인',
      year: '4학년',
      position: 'UX/UI 디자인',
      stack: 'Figma, Adobe XD',
      detail: '사용자 중심의 디자인을 추구합니다. 포트폴리오 링크: ...',
    },
  },
  {
    id: 3,
    category: '프로젝트',
    title: '백엔드 사이드 프로젝트 (Node.js)',
    due: '2025.09.30',
    status: '거절됨',
    applicant: {
      name: '철수',
      mode: '온라인',
      year: '2학년',
      position: '백엔드',
      stack: 'Node.js, Express',
      detail: '백엔드 개발에 관심이 많아 지원합니다.',
    },
  },
  {
    id: 4,
    category: '프로젝트',
    title: '모바일 앱 개발 프로젝트',
    due: '2025.10.05',
    status: '모집종료',
    applicant: {
      name: '훈이',
      mode: '오프라인',
      year: '3학년',
      position: 'iOS 개발',
      stack: 'Swift, UIKit',
      detail: 'iOS 앱 개발 경험이 있습니다.',
    },
  },
  {
    id: 5,
    category: '프로젝트',
    title: '블록체인 기반 서비스 개발',
    due: '2025.10.20',
    status: '모집취소',
    applicant: {
      name: '맹구',
      mode: '온라인',
      year: '4학년',
      position: '풀스택',
      stack: 'Solidity, Next.js',
      detail: '블록체인 기술에 대한 이해도가 높습니다.',
    },
  },
  // 과제 예시
  {
    id: 6,
    category: '과제',
    title: '알고리즘 문제 풀이',
    due: '2025.09.28',
    status: '대기중',
    applicant: {
      name: '짱아',
      mode: '온라인',
      year: '1학년',
      detail: '알고리즘 과제를 함께 하고 싶습니다. 열심히 하겠습니다.',
    },
  },
  {
    id: 7,
    category: '과제',
    title: 'CS 스터디 과제 제출',
    due: '2025.10.01',
    status: '수락됨',
    applicant: {
      name: '흰둥이',
      mode: '온라인',
      year: '2학년',
      detail: 'CS 과목에 자신 있습니다. 함께 좋은 성적 받고 싶습니다.',
    },
  },
  {
    id: 8,
    category: '과제',
    title: '데이터 분석 과제',
    due: '2025.10.03',
    status: '모집종료',
    applicant: {
      name: '액션가면',
      mode: '오프라인',
      year: '3학년',
      detail: '데이터 분석 툴(R, Python) 사용에 능숙합니다.',
    },
  },
  // 스터디 예시
  {
    id: 9,
    category: '스터디',
    title: 'React 스터디원 모집',
    due: '2025.09.29',
    status: '거절됨',
    applicant: {
      name: '부리부리대마왕',
      mode: '온라인',
      year: '2학년',
      detail: 'React 기초를 탄탄히 다지고 싶습니다.',
    },
  },
  {
    id: 10,
    category: '스터디',
    title: '코딩테스트 준비 스터디',
    due: '2025.10.02',
    status: '모집취소',
    applicant: {
      name: '원장님',
      mode: '온/오프라인',
      year: '4학년',
      detail: '취업을 위해 코딩테스트를 꾸준히 준비하고 있습니다.',
    },
  },
  {
    id: 11,
    category: '스터디',
    title: '이펙티브 자바스크립트 스터디',
    due: '2025.10.07',
    status: '대기중',
    applicant: {
      name: '나미리',
      mode: '오프라인',
      year: '3학년',
      detail: '딥 다이브 스터디 경험 있습니다. 심도 있는 토론을 원합니다.',
    },
  },
];

const toneByStatus = (s) =>
  s === '대기중'
    ? 'waiting'
    : s === '거절됨'
      ? 'rejected'
      : s === '수락됨'
        ? 'accepted'
        : s === '모집취소'
          ? 'cancelled'
          : 'closed';

const ApplicationModal = ({ data, onClose }) => {
  if (!data) return null;

  const { applicant, category } = data;

  return (
    <div css={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div css={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header css={styles.modalHeader}>
          {applicant.name}님의 지원서
          <button css={styles.closeBtn} onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </header>

        <div css={styles.modalContent}>
          <div css={styles.fieldRow}>
            <span css={styles.fieldLabel}>가능한 진행방식</span>
            <span css={styles.fieldValue}>{applicant.mode}</span>
          </div>
          <div css={styles.fieldRow}>
            <span css={styles.fieldLabel}>학년</span>
            <span css={styles.fieldValue}>{applicant.year}</span>
          </div>

          {category === '프로젝트' && (
            <>
              <div css={styles.fieldRow}>
                <span css={styles.fieldLabel}>지원 포지션</span>
                <span css={styles.fieldValue}>{applicant.position}</span>
              </div>
              <div css={styles.fieldRow}>
                <span css={styles.fieldLabel}>기술 스택</span>
                <span css={styles.fieldValue}>{applicant.stack}</span>
              </div>
            </>
          )}

          <div style={{ marginTop: '12px', paddingBottom: '24px' }}>
            <span css={styles.fieldLabel}>상세내용</span>
            <div css={styles.detailBox}>
              <textarea css={styles.detailArea} readOnly value={applicant.detail || ''} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyApplicationsPage = () => {
  const [tab, setTab] = useState('프로젝트');
  const [rows, setRows] = useState(sampleRows);
  const [modalData, setModalData] = useState(null);

  const filtered = useMemo(() => rows.filter((r) => r.category === tab), [rows, tab]);

  const removeRow = (id) => {
    if (window.confirm('정말 지원을 취소하시겠습니까?')) {
      setRows((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div css={styles.wrap}>
      <div css={styles.contentContainer}>
        <h2 css={styles.title}>내가 지원한 공고</h2>

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

        <div css={styles.tableWrap}>
          <div css={styles.tableHead}>
            <div>No.</div>
            <div>공고제목</div>
            <div>마감일</div>
            <div>지원상태</div>
            <div>지원서보기</div>
            <div>지원 취소</div>
          </div>

          {filtered.length === 0 && <div css={styles.empty}>해당 카테고리의 공고가 없습니다.</div>}

          {filtered.map((r, i) => (
            <div css={styles.row} key={r.id}>
              <div>{i + 1}</div>
              <div css={styles.cellEllipsis} title={r.title}>
                {r.title}
              </div>
              <div>{r.due}</div>
              <div>
                <span css={styles.badge(toneByStatus(r.status))}>{r.status}</span>
              </div>
              <div>
                <button css={styles.action} onClick={() => setModalData(r)}>
                  지원서
                </button>
              </div>
              <div>
                <button css={[styles.action, styles.danger]} onClick={() => removeRow(r.id)}>
                  취소하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ApplicationModal data={modalData} onClose={() => setModalData(null)} />
    </div>
  );
};

export default MyApplicationsPage;
