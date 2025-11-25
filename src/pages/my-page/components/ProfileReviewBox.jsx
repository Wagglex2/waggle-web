/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import { Pagination, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '@/api/api';

const ProfileReviewBox = () => {
  const [review, setReview] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getReview() {
      try {
        const res = await api.get(`/api/v1/reviews/me/received?page=${currentPage - 1}`);
        console.log(res);
        setReview(res.data.data.content);
        setTotalPages(res.data.data.page.totalPages);
      } catch (e) {
        console.log(e);
      }
    }

    getReview();
  }, [currentPage]);

  return (
    <div css={reviewBox}>
      <h3>✨ 동료 리뷰</h3>
      {review.length === 0 ? (
        <p css={noReviewBox}>조회된 리뷰가 없습니다.</p>
      ) : (
        <div className="reviews">
          {review.map((item) => (
            <p>{item.content}</p>
          ))}
        </div>
      )}

      {totalPages !== 0 && (
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mt: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => {
              setCurrentPage(value);
            }}
          />
        </Stack>
      )}
    </div>
  );
};

export default ProfileReviewBox;

const reviewBox = css`
  margin-top: 60px;

  .reviews {
    margin: 20px 0;
  }

  .reviews p {
    border: 1px solid ${colors.gray[300]};
    padding: 8px 0;
    margin-bottom: 8px;
    border-radius: 5px;
    text-align: center;
    background-color: #faf8f8;
  }
`;

const noReviewBox = css`
  width: 100%;
  height: 240px;
  border: 1px dashed ${colors.gray[300]};
  border-radius: 10px;
  text-align: center;
  line-height: 240px;
  vertical-align: middle;
  font-family: 'nanumR';
  color: ${colors.gray[400]};
`;
