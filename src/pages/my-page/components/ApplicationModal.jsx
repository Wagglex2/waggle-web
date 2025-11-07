/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';

const colors = {
  border: '#eee6d6',
  text: '#3a3a3a',
  muted: '#8f8678',
  btnHover: '#fcfbf8',
  primary: '#FFCC00',
  white: '#fff',
  overlay: 'rgba(0, 0, 0, 0.45)',
  modalTitle: '#103c1f',
  avatarBg: '#ffe7e7',
  placeholder: '#b5b0a8',
  detailBg: '#fdfdfd',
};

const ApplicationModal = ({ modalData, onClose, onAcceptClick, onRejectClick }) => {
  if (!modalData) {
    return null;
  }

  const applicant = modalData;
  const category = modalData.postType;

  return (
    <div css={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div css={modal} onClick={(e) => e.stopPropagation()}>
        <header css={modalHeader}>
          <h3 css={modalTitle}>{applicant.name}님의 지원서</h3>
          <button css={closeBtn} onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </header>

        <div css={modalContent}>
          <div css={fieldRow}>
            <span css={fieldLabel}>가능한 진행방식</span>
            <span css={fieldValue}>{applicant.mode}</span>
          </div>
          <div css={fieldRow}>
            <span css={fieldLabel}>학년</span>
            <span css={fieldValue}>{applicant.year}</span>
          </div>

          {category === '프로젝트' && (
            <>
              <div css={fieldRow}>
                <span css={fieldLabel}>지원 포지션</span>
                <span css={fieldValue}>{applicant.position}</span>
              </div>
              <div css={fieldRow}>
                <span css={fieldLabel}>기술 스택</span>
                <span css={fieldValue}>{applicant.stack}</span>
              </div>
            </>
          )}

          <label htmlFor="review-detail" css={label}>
            상세내용
          </label>
          <div css={detailBox}>
            <textarea id="review-detail" css={detailArea} readOnly value={applicant.detail || ''} />
          </div>
        </div>

        <div css={saveBar}>
          <button css={deleteBtn} onClick={onRejectClick}>
            거절하기
          </button>
          <button css={smallSaveBtn} onClick={onAcceptClick}>
            수락하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;

const overlay = css`
  position: fixed;
  inset: 0;
  background: ${colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const modal = css`
  width: 410px;
  max-width: calc(100% - 32px);
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

const modalHeader = css`
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.border};
`;

const modalTitle = css`
  margin: 0;
  font-size: 22px;
  color: ${colors.modalTitle};
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
`;

const closeBtn = css`
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: ${colors.muted};
`;

const modalContent = css`
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 10px;
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
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const fieldValue = css`
  font-weight: 700;
  color: ${colors.text};
  font-size: 13px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const label = css`
  display: block;
  font-weight: 600;
  margin: 20px 0 6px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  color: ${colors.muted};
  font-size: 13px;
`;

const detailBox = css`
  border: 1px solid ${colors.border};
  border-radius: 12px;
  overflow: hidden;
`;

const detailArea = css`
  width: 100%;
  min-height: 120px;
  resize: none;
  padding: 14px;
  border: 0;
  outline: none;
  font-family: inherit;
  color: ${colors.text};
  font-size: 13px;
  background-color: ${colors.detailBg};
`;

const saveBar = css`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const smallSaveBtn = css`
  min-width: 150px;
  height: 48px;
  border-radius: 12px;
  border: 0;
  background: ${colors.primary};
  color: #173300;
  font-weight: 700;
  cursor: pointer;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
`;

const deleteBtn = css`
  min-width: 150px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid ${colors.border};
  background: ${colors.btnHover};
  color: ${colors.muted};
  font-weight: 700;
  cursor: pointer;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
`;
