/** @jsxImportSource @emotion/react */
import api from '@/api/api';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';

const ApplyBtn = ({ isEnabled, data, reset }) => {
  const params = useParams();

  async function postApplicationForm(e) {
    e.preventDefault();

    try {
      await api.post(`/api/v1/applications/recruitments/${params.id}`, data);

      reset();
      alert('**지원 성공** \n[마이페이지]->[내가 지원한 공고]에서 현황을 확인하세요.');
    } catch (e) {
      console.log(e);
      alert(`**지원 실패** \n${e.response.data.message}`);
    }
  }

  return (
    <button css={applyBtnStyle} type="submit" disabled={!isEnabled} onClick={postApplicationForm}>
      지원하기
    </button>
  );
};

export default ApplyBtn;

const applyBtnStyle = css`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background-color: #fef1b2;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-family: 'nanumB';
`;
