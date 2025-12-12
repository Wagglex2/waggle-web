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

// 1. 제공해주신 기술 스택 리스트
const techStackOptions = [
  'Java',
  'C',
  'C++',
  'C#',
  'HTML',
  'CSS',
  'TypeScript',
  'JavaScript',
  'Kotlin',
  'Swift',
  'Python',
  'Express',
  'Vue.js',
  'Next.js',
  'React',
  'Node.js',
  'Spring Boot',
  'Django',
  'Flutter',
  'Pandas',
  'scikit-learn',
  'TensorFlow',
  'PyTorch',
  'Unity',
  'Unreal',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Redis',
  'Git',
  'GitHub',
  'GitHub Actions',
  'Docker',
  'Figma',
  'Notion',
  'Jira',
];

// 2. 리스트를 기반으로 Enum -> Display Name 매핑 객체 자동 생성
// 예: 'Spring Boot' -> { SPRING_BOOT: 'Spring Boot' }
const skillMap = techStackOptions.reduce((acc, stack) => {
  // 기본 변환: 공백, 점(.), 하이픈(-)을 언더바(_)로 바꾸고 대문자로 변환
  // 예: "Node.js" -> "NODE_JS", "Spring Boot" -> "SPRING_BOOT"
  const standardKey = stack.toUpperCase().replace(/[\s.-]/g, '_');
  acc[standardKey] = stack;

  // 특수 케이스 처리 (C++, C# 등은 Enum으로 만들 때 보통 별칭을 씀)
  if (stack === 'C++') {
    acc['CPP'] = stack;
    acc['C_PLUS_PLUS'] = stack;
  } else if (stack === 'C#') {
    acc['CSHARP'] = stack;
    acc['C_SHARP'] = stack;
  } else if (stack === 'HTML') {
    acc['HTML5'] = stack; // 혹시 모를 HTML5 대응
  } else if (stack === 'CSS') {
    acc['CSS3'] = stack; // 혹시 모를 CSS3 대응
  }

  return acc;
}, {});

const ApplicantModal = ({ modalData, onClose, onAcceptClick, onRejectClick }) => {
  if (!modalData) {
    return null;
  }

  const { postType, name, mode, grade, position, skills, content } = modalData;

  // 스택 이름을 포맷팅하는 함수
  const formatSkill = (skill) => {
    // 1. 객체거나 문자열이거나 상관없이 원본 string 추출
    const raw = typeof skill === 'string' ? skill : skill.name || skill.desc || '';

    if (!raw) return '';

    // 2. 매핑된 값이 있으면 그대로 반환 (예: SPRING_BOOT -> Spring Boot)
    // 대문자로 변환하여 매칭 시도
    const upperRaw = raw.toUpperCase();
    if (skillMap[upperRaw]) {
      return skillMap[upperRaw];
    }

    // 3. 맵에 없으면 언더바(_)를 공백으로 바꾸고, 첫 글자만 대문자로 하거나 그대로 출력
    return raw.replace(/_/g, ' ');
  };

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
                    ? skills.map((skill) => formatSkill(skill)).join(', ')
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
