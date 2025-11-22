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

const MyApplicationModal = ({ modalData, onClose }) => {
  if (!modalData) {
    return null;
  }

  const { applicant, category } = modalData;

  return (
    <div css={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div css={modal} onClick={(e) => e.stopPropagation()}>
        <header css={modalHeader}>
          <h3 className="modal-title">내 지원서 상세</h3>
          <button className="close-btn" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </header>

        <div css={modalContent}>
          <div css={fieldRow}>
            <span className="field-label">가능한 진행방식</span>
            <span className="field-value">{applicant.mode}</span>
          </div>
          <div css={fieldRow}>
            <span className="field-label">학년</span>
            <span className="field-value">{applicant.year}</span>
          </div>

          {category === '프로젝트' && (
            <>
              <div css={fieldRow}>
                <span className="field-label">지원 포지션</span>
                <span className="field-value">{applicant.position}</span>
              </div>
              <div css={fieldRow}>
                <span className="field-label">기술 스택</span>
                <span className="field-value">{applicant.stack}</span>
              </div>
            </>
          )}

          <label htmlFor="review-detail" css={label}>
            상세내용
          </label>
          <div css={detailBox}>
            <textarea
              id="review-detail"
              className="detail-area"
              readOnly
              value={applicant.detail || ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplicationModal;

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

  .modal-title {
    margin: 0;
    font-size: 22px;
    color: ${colors.modalTitle};
    font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
  }

  .close-btn {
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
  }
`;

const modalContent = css`
  flex-grow: 1;
  overflow-y: auto;
  padding-top: 10px;
  padding-bottom: 10px;
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

  .field-label {
    color: ${colors.muted};
    font-size: 13px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  }

  .field-value {
    font-weight: 700;
    color: ${colors.text};
    font-size: 13px;
    font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  }
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

  .detail-area {
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
  }
`;
