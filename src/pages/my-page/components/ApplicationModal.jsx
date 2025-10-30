/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  primary: '#FFCC00',
};

const ApplicantModal = ({ modalData, onClose, onAcceptClick, onRejectClick }) => {
  if (!modalData) {
    return null;
  }

  return (
    <div css={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div css={modal} onClick={(e) => e.stopPropagation()}>
        <header css={modalHeader}>
          {modalData.name}님의 지원서
          <button css={closeBtn} onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </header>

        <div css={modalContent}>
          <div css={fieldRow}>
            <span css={fieldLabel}>가능한 진행방식</span>
            <span css={fieldValue}>{modalData.mode}</span>
          </div>
          <div css={fieldRow}>
            <span css={fieldLabel}>학년</span>
            <span css={fieldValue}>{modalData.year}</span>
          </div>

          {modalData.postType === '프로젝트' && (
            <>
              <div css={fieldRow}>
                <span css={fieldLabel}>지원 포지션</span>
                <span css={fieldValue}>{modalData.position}</span>
              </div>
              <div css={fieldRow}>
                <span css={fieldLabel}>기술 스택</span>
                <span css={fieldValue}>{modalData.stack}</span>
              </div>
            </>
          )}

          <div style={{ marginTop: '12px' }}>
            <span css={fieldLabel}>상세</span>
            <div css={detailBox}>
              <textarea css={detailArea} readOnly value={modalData.detail || ''} />
            </div>
          </div>
        </div>

        <footer css={modalActions}>
          <button css={modalReject} onClick={onRejectClick}>
            거절하기
          </button>
          <button css={modalAccept} onClick={onAcceptClick}>
            수락하기
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ApplicantModal;

const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const modal = css`
  width: 400px;
  height: 600px;
  max-width: calc(100% - 32px);
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const modalHeader = css`
  position: relative;
  padding: 20px 24px;
  border-bottom: 1px solid ${colors.border};
  text-align: center;
  color: #153b24;
  font-weight: 800;
  font-size: 22px;
  flex-shrink: 0;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
`;

const modalContent = css`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0 24px;
`;

const closeBtn = css`
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
`;

const fieldRow = css`
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: start;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid ${colors.border};
  &:first-of-type {
    margin-top: 10px;
  }
`;

const fieldLabel = css`
  color: ${colors.muted};
  font-size: 13px;
`;

const fieldValue = css`
  font-weight: 700;
  color: ${colors.text};
  font-size: 13px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const detailBox = css`
  margin-top: 12px;
  border: 1px solid ${colors.border};
  border-radius: 12px;
  overflow: hidden;
`;

const detailArea = css`
  width: 100%;
  min-height: 220px;
  resize: none;
  padding: 12px;
  border: 0;
  outline: none;
  font-family: inherit;
  color: ${colors.text};
  font-size: 13px;
`;

const modalActions = css`
  padding: 18px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-shrink: 0;
`;

const modalReject = css`
  min-width: 160px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #b3b3b3;
  background: #fff;
  color: #333;
  cursor: pointer;
  font-size: 13px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const modalAccept = css`
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
`;
