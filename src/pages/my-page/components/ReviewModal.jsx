/** @jsxImportSource @emotion/react */
/** @jsxRuntime automatic */
import { css } from '@emotion/react';
import { useTeamStore } from '../../../stores/useTeamStore';
import api from '@/api/api';
import { useEffect } from 'react';

const ReviewModal = () => {
  const {
    reviewTarget,
    reviewText,
    reviewedMembers,
    currentReviewId,
    closeReview,
    setReviewText,
    saveReview,
    deleteReview,
    reviews,
  } = useTeamStore();

  const maxChars = 100;

  if (!reviewTarget) {
    return null;
  }

  const memberKey = `${reviewTarget.team.id}_${reviewTarget.member.userId}`;
  const isEditing = reviewedMembers.has(memberKey);

  async function handleSubmitReview() {
    if (!reviewText.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    try {
      const res = await api.post('/api/v1/reviews', {
        teamId: reviewTarget.team.id,
        revieweeId: reviewTarget.member.userId,
        content: reviewText,
      });

      alert('리뷰가 성공적으로 저장되었습니다.');
      saveReview(res.data.data);
    } catch (error) {
      console.error(error);
      alert('리뷰 저장에 실패했습니다.');
    }
  }

  async function handleUpdateReview() {
    if (!reviewText.trim()) {
      alert('수정할 내용을 입력해주세요.');
      return;
    }

    const currentReview = reviews.get(memberKey);
    const reviewId = currentReview?.id;

    if (!reviewId) {
      alert('수정할 리뷰 정보를 찾을 수 없습니다.');
      return;
    }

    try {
      await api.patch(`/api/v1/reviews/me/written/${reviewId}`, {
        content: reviewText,
      });
      alert('리뷰가 수정되었습니다.');
      saveReview(reviewId);
    } catch (error) {
      console.error(error);
      alert('리뷰 수정에 실패했습니다.');
    }
  }

  async function handleDeleteReview() {
    if (!confirm('정말 리뷰를 삭제하시겠습니까?')) return;

    const currentReview = reviews.get(memberKey);
    const reviewId = currentReview?.id;

    if (!reviewId) {
      alert('삭제할 리뷰 ID가 없습니다.');
      return;
    }

    try {
      await api.delete(`/api/v1/reviews/me/written/${reviewId}`);
      alert('리뷰가 삭제되었습니다.');
      deleteReview();
    } catch (error) {
      console.error(error);
      alert('리뷰 삭제 중 오류가 발생했습니다.');
    }
  }

  return (
    <div css={overlay} onClick={closeReview}>
      <div css={modal} onClick={(e) => e.stopPropagation()}>
        <header css={modalHeader}>
          <h3 css={modalTitle}>{isEditing ? '리뷰 수정' : '리뷰 쓰기'}</h3>
          <button css={closeBtn} onClick={closeReview}>
            ✕
          </button>
        </header>

        <div css={profileRow}>
          <div css={avatar}>🐣</div>
          <div css={nameText}>{reviewTarget.member.name}</div>
        </div>

        <label htmlFor="review-detail" css={label}>
          상세
        </label>
        <textarea
          id="review-detail"
          css={textArea}
          maxLength={maxChars}
          placeholder={`${reviewTarget.member.nickname}님에 대한 솔직한 피드백을 남겨주세요.`}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <div css={helper}>
          {reviewText.length} / {maxChars}
        </div>

        <ul css={notes}>
          <li>
            작성한 피드백은 닉네임, 프로필 이미지와 함께 누구나 볼 수 있도록 공개됩니다. 피드백
            내용에 민감한 개인정보가 포함되지 않도록 조심해 주세요.
          </li>
          <li>
            솔직하게 작성하신 피드백은 다른 분들께 큰 도움이 됩니다. 하지만 허위 사실이나 명예훼손,
            욕설, 타인비방글 등 제 3자의 권리를 침해하는 피드백은 서비스 이용약관이나 관련 법률에
            따라 제재를 받을 수 있습니다.
          </li>
        </ul>

        <div css={saveBar}>
          {isEditing ? (
            <>
              <button css={deleteBtn} onClick={handleDeleteReview}>
                삭제하기
              </button>
              <button css={smallSaveBtn} onClick={handleUpdateReview}>
                수정하기
              </button>
            </>
          ) : (
            <button css={largeSaveBtn} onClick={handleSubmitReview}>
              저장하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

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
};

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
`;

const profileRow = css`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0 12px;
`;

const avatar = css`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${colors.avatarBg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
`;

const nameText = css`
  font-weight: 600;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const label = css`
  display: block;
  font-weight: 600;
  margin: 8px 0 6px;
  font-family: 'nanumB', 'NanumSquareRound', sans-serif;
`;

const textArea = css`
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
`;

const helper = css`
  text-align: right;
  color: ${colors.muted};
  font-size: 12px;
  padding-top: 6px;
`;

const notes = css`
  margin: 14px 0 24px;
  padding-left: 18px;
  color: ${colors.muted};
  font-size: 12px;
  line-height: 1.6;
`;

const saveBar = css`
  margin-top: auto;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const largeSaveBtn = css`
  min-width: 200px;
  height: 48px;
  border-radius: 12px;
  border: 0;
  background: ${colors.primary};
  color: #173300;
  font-weight: 700;
  cursor: pointer;
  font-family: 'nanumEB', 'NanumSquareRound', sans-serif;
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
