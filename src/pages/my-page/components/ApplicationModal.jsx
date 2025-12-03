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
  acceptBtn: '#FFCC00',
  acceptBtnHover: '#E6B800',
  rejectBtn: '#ffffff',
  rejectBtnHover: '#f0f0f0',
};

const ApplicantModal = ({ modalData, onClose, onAcceptClick, onRejectClick }) => {
  if (!modalData) {
    return null;
  }

  const { postType, name, mode, grade, position, skills, content } = modalData;

  return (
    <div css={overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div css={modal} onClick={(e) => e.stopPropagation()}>
        <header css={modalHeader}>
          <h3 className="modal-title">지원서 상세</h3>
          <button className="close-btn" onClick={onClose} aria-label="닫기">
            ✕
          </button>
        </header>

        <div css={modalContent}>
          <div css={fieldRow}>
            <span className="field-label">지원자</span>
            <span className="field-value">{name}</span>
          </div>

          <div css={fieldRow}>
            <span className="field-label">가능한 진행방식</span>
            <span className="field-value">{mode || '-'}</span>
          </div>

          <div css={fieldRow}>
            <span className="field-label">학년</span>
            <span className="field-value">{grade || '-'}</span>
          </div>

          {postType === '프로젝트' && (
            <>
              <div css={fieldRow}>
                <span className="field-label">지원 포지션</span>
                <span className="field-value">{position || '-'}</span>
              </div>
              <div css={fieldRow}>
                <span className="field-label">기술 스택</span>
                <span className="field-value">
                  {skills && skills.length > 0
                    ? skills
                        .map((skill) =>
                          typeof skill === 'string' ? skill : skill.name || skill.desc || skill
                        )
                        .join(', ')
                    : '-'}
                </span>
              </div>
            </>
          )}

          <label htmlFor="application-detail" css={label}>
            상세내용
          </label>
          <div css={detailBox}>
            <textarea
              id="application-detail"
              className="detail-area"
              readOnly
              value={content || ''}
            />
          </div>
        </div>

        <div css={buttonRow}>
          <button css={rejectButton} onClick={onRejectClick}>
            거절하기
          </button>
          <button css={acceptButton} onClick={onAcceptClick}>
            수락하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantModal;

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
    &:hover {
      opacity: 0.7;
    }
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
  grid-template-columns: 120px 1fr;
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
    word-break: break-word;
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

const buttonRow = css`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const rejectButton = css`
  flex: 1;
  height: 44px;
  border-radius: 40px;
  border: 1px solid #b3b3b3;
  background: ${colors.rejectBtn};
  color: #666666;
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  font-size: 15px;
  &:hover {
    background: ${colors.rejectBtnHover};
  }
`;

const acceptButton = css`
  flex: 1;
  height: 44px;
  border-radius: 40px;
  border: 1px solid ${colors.primary};
  background: ${colors.acceptBtn};
  color: #666666;
  cursor: pointer;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
  font-size: 15px;
  &:hover {
    background: ${colors.acceptBtnHover};
  }
`;
