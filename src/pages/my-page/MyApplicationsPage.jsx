/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import React, { useMemo, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore, toneByStatus } from '@/stores/useApplicationStore';
import MyApplicationModal from './components/MyApplicationModal';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  tabActive: '#FEF1B2',
  btnHover: '#fcfbf8',
};

const MyApplicationsPage = () => {
  const navigate = useNavigate();
  const {
    rows,
    modalData,
    loading,
    error,
    removeRow,
    openModal,
    closeModal,
    fetchAllApplications,
  } = useApplicationStore();
  const [tab, setTab] = useState('프로젝트');

  useEffect(() => {
    fetchAllApplications();
  }, []);

  const filtered = useMemo(() => rows.filter((r) => r.category === tab), [rows, tab]);

  const handleTitleClick = (item) => {
    const targetId = item.id;

    switch (item.category) {
      case '프로젝트':
        navigate(`/project-list/${targetId}`);
        break;
      case '과제':
        navigate(`/hw-list/${targetId}`);
        break;
      case '스터디':
        navigate(`/study-list/${targetId}`);
        break;
      default:
        navigate(`/project-list/${targetId}`);
    }
  };

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

          {loading && <div css={empty}>데이터를 불러오는 중...</div>}
          {error && <div css={empty}>오류: {error}</div>}
          {!loading && !error && filtered.length === 0 && (
            <div css={empty}>해당 카테고리의 공고가 없습니다.</div>
          )}

          {!loading &&
            !error &&
            filtered.map((r, i) => (
              <div css={row} key={r.id}>
                <div>{i + 1}</div>
                <div className="cell-ellipsis" title={r.title} onClick={() => handleTitleClick(r)}>
                  {r.title}
                </div>
                <div>{r.due}</div>
                <div>
                  <span className={`status-badge tone-${toneByStatus(r.status)}`}>{r.status}</span>
                </div>
                <div>
                  <button className="action-btn" onClick={() => openModal(r)}>
                    지원서
                  </button>
                </div>
                <div>
                  <button
                    className="action-btn danger"
                    onClick={() => removeRow(r.id)}
                    disabled={r.status !== '대기중'}
                    style={{
                      opacity: r.status !== '대기중' ? 0.5 : 1,
                      cursor: r.status !== '대기중' ? 'not-allowed' : 'pointer',
                    }}
                  >
                    취소하기
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <MyApplicationModal modalData={modalData} onClose={closeModal} />
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

  .cell-ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: #0056b3;
    }
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 20px;
    border-radius: 15px;
    font-size: 13px;
  }

  .tone-waiting {
    background: #fff4c2;
    border: 1px solid #f2e6a2;
    color: #6e5b08;
  }
  .tone-rejected {
    background: #ffdfdf;
    border: 1px solid #f4caca;
    color: #7a3a3a;
  }
  .tone-accepted {
    background: #cfe6e9;
    border: 1px solid #b6d7de;
    color: #2f5f66;
  }
  .tone-cancelled {
    background: #ddeedb;
    border: 1px solid #c7e0c2;
    color: #3c6a43;
  }
  .tone-closed {
    background: #e9e9e9;
    border: 1px solid #d9d9d9;
    color: #666;
  }

  .action-btn {
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
  }

  .action-btn.danger {
    border-color: #b3b3b3;
    background: #fff;
    color: #666666;
  }
`;

const empty = css`
  padding: 28px;
  text-align: center;
  color: ${colors.muted};
`;
