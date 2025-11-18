/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '@/styles/theme';
import { Link } from 'react-router-dom';
import ModalLayout from '@/components/layout/ModalLayout';

const CreateJobModal = ({ setOpenModal }) => {
  const category = [
    {
      name: '프로젝트',
      path: 'create-project',
    },
    {
      name: '과제',
      path: 'create-hw',
    },
    {
      name: '스터디',
      path: 'create-study',
    },
  ];

  return (
    <ModalLayout>
      <div css={modalBox}>
        <div css={modalTop}>
          <p className="modal-title">공고 등록하기</p>
          <p className="close-btn" onClick={() => setOpenModal(false)}>
            ✕
          </p>
        </div>
        <p css={modalText}>작성할 공고의 카테고리를 선택해 주세요</p>
        <div css={categoryBtn}>
          {category.map((item) => (
            <Link key={item.name} to={item.path}>
              <button type="button" onClick={() => setOpenModal(false)}>
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </ModalLayout>
  );
};

export default CreateJobModal;

const modalBox = css`
  width: 345px;
  height: 160px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 8px 14px 20px;

  text-align: center;
`;

const modalTop = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'nanumB';
  font-size: 16px;
  padding-bottom: 3px;
  border-bottom: 1px solid ${colors.gray[100]};

  .modal-title {
    margin-left: 120px;
  }

  .close-btn:hover {
    cursor: pointer;
    font-weight: bolder;
  }
`;

const modalText = css`
  font-family: 'nanumR';
  font-size: 15px;
  margin-top: 27px;
  margin-bottom: 20px;
`;

const categoryBtn = css`
  width: 273px;
  margin: auto;
  display: flex;
  justify-content: space-between;

  button {
    font-family: 'nanumR';
    padding-top: 3px;
    font-size: 14px;
    width: 77px;
    height: 30px;
    border-radius: 10px;
    border: none;
    background-color: ${colors.primary};

    &:hover {
      background-color: ${colors.secondary};
      color: #ffffff;
      cursor: pointer;
    }
  }
`;
