/** @jsxImportSource @emotion/react */
import api from '@/api/api';
import useCreateJobStore from '@/stores/useCreateJobStore';
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const SubmitFormBtn = ({ isEnabled, payload, path, setConsent }) => {
  const { reset } = useCreateJobStore();
  const navigate = useNavigate();

  async function postJobForm() {
    console.log(payload);
    try {
      const res = await api.post(`/api/v1/${path.url}`, payload);
      reset();
      setConsent({
        first: false,
        sec: false,
      });
      navigate(`/${path.path}/${res.data.data}`);
      alert('**등록 완료** \n[마이페이지]->[내가 올린 공고]에서 지원자 현황을 확인하세요.');

      console.log(res);
    } catch (e) {
      console.log(e);
      alert(`**등록 실패** \n${e.response.data.data[0].message}`);
    }
  }

  return (
    <button css={submitBtn(!isEnabled)} type="submit" disabled={!isEnabled} onClick={postJobForm}>
      등록하기
    </button>
  );
};

export default SubmitFormBtn;

const submitBtn = (btn) => css`
  display: block;
  margin: 50px auto;
  width: 350px;
  height: 50px;

  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  background-color: #fef7d4;

  font-family: 'nanumEB';
  font-size: 15px;
  color: ${btn ? colors.gray[300] : colors.secondary};
`;
