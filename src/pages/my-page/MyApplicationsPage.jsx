/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useApplicationStore, toneByStatus } from './useApplicationStore';
import ApplicationModal from './components/ApplicationModal';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  tabActive: '#FEF1B2',
  btnHover: '#fcfbf8',
};

const MyApplicationsPage = () => {
  const { rows, modalData, removeRow, openModal, closeModal } = useApplicationStore();
  const [tab, setTab] = useState('프로젝트');

  const filtered = useMemo(() => rows.filter((r) => r.category === tab), [rows, tab]);

  return (
    <div css={wrap}>
      <div css={contentContainer}>
        <h2 css={title}>📩 내가 지원한 공고</h2>

        <div css={tabs}>
          <button css={tabBtn(tab === '프로젝트')} onClick={() => setTab('프로젝트')}>
            프로젝트
          </button>
          <button css={tabBtn(tab === '과제')} onClick={() => setTab('과제')}>
            과제
          </button>
          <button css={tabBtn(tab === '스터디')} onClick={() => setTab('스터디')}>
            스터디
          </button>
        </div>

        <div css={tableWrap}>
          <div css={tableHead}>
            <div>No.</div>
            <div>공고제목</div>
            <div>마감일</div>
            <div>지원상태</div>
            <div>지원서보기</div>
            <div>지원 취소</div>
          </div>

          {filtered.length === 0 && <div css={empty}>해당 카테고리의 공고가 없습니다.</div>}

          {filtered.map((r, i) => (
            <div css={row} key={r.id}>
              <div>{i + 1}</div>
              <div css={cellEllipsis} title={r.title}>
                {r.title}
              </div>
              <div>{r.due}</div>
              <div>
                <span css={badge(toneByStatus(r.status))}>{r.status}</span>
              </div>
              <div>
                <button css={action} onClick={() => openModal(r)}>
                  지원서
                </button>
              </div>
              <div>
                <button css={[action, danger]} onClick={() => removeRow(r.id)}>
                  취소하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ApplicationModal data={modalData} onClose={closeModal} />
    </div>
  );
};

export default MyApplicationsPage;

const wrap = css`
  padding: 24px 32px;
  color: ${colors.text};
  font-family: 'nanumR', 'NanumSquareRound', sans-serif;
`;

const contentContainer = css`
  max-width: 1100px;
  margin: 0 auto;
`;

const title = css`
  margin: 40px 0 24px;
  font-size: 22px;
  font-weight: 800;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const tabs = css`
  display: flex;
  gap: 8px;
  margin: 0 0 12px;
`;

const tabBtn = (active) => css`
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
`;

const tableWrap = css`
  border: 1px solid ${colors.border};
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
`;

const tableHead = css`
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
`;

const row = css`
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
`;

const cellEllipsis = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
`;

const badge = (tone) => css`
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
`;

const action = css`
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
`;

const danger = css`
  border-color: #b3b3b3;
  background: #fff;
  color: #666666;
`;

const empty = css`
  padding: 28px;
  text-align: center;
  color: ${colors.muted};
`;
