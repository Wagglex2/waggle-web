/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import Editor from '../Editor';
import { techStackOptions } from '@/data/options';
import MultiSelectDropDown from '@/components/dropdown/MultiSelectDropdown';
import DropDown from '@/components/dropdown/DropDown';

const StudyCreateForm = () => {
  return (
    <form css={formContainer}>
      <div css={formListBox}>
        <p css={listLabel}>공고구분</p>
        <div css={item}>
          <p>카테고리</p>
          <div css={itemContent}>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="category-options" id="first-option" disabled />
              <label htmlFor="first-option">프로젝트</label>
            </div>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="category-options" id="second-option" disabled />
              <label htmlFor="second-option">과제</label>
            </div>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="category-options" id="third-option" defaultChecked />
              <label htmlFor="third-option">스터디</label>
            </div>
          </div>
        </div>
        <div css={item}>
          <p>목적</p>
          <div css={itemContent}>
            <DropDown label="스터디" buttonWidth={'200px'} />
          </div>
        </div>
      </div>

      <div css={formListBox}>
        <p css={listLabel}>제목</p>
        <div css={noLabelItem('100%')}>
          <input type="text" placeholder="공고 제목을 적어주세요" />
        </div>
      </div>

      <div css={formListBox}>
        <p css={listLabel}>마감일</p>
        <div css={noLabelItem('250px')}>
          <input type="date" />
        </div>
      </div>

      <div css={formListBox}>
        <p css={listLabel}>정보</p>
        <div css={item}>
          <p>진행기간</p>
          <div css={itemContent('200px')}>
            <input type="date" />
            <span css={css({ margin: '0px 15px', color: '#3B3537' })}>~</span>
            <input type="date" />
          </div>
        </div>

        <div css={item}>
          <p>포지션</p>
          <div css={itemContent('200px')}>
            <DropDown label="멤버" buttonWidth={'200px'} />
            <span css={css({ margin: '0px 15px', color: '#3B3537' })}>:</span>
            <input type="text" placeholder="모집 인원을 입력해 주세요" />
          </div>
        </div>

        <div css={item}>
          <p>기술</p>
          <div css={itemContent}>
            <MultiSelectDropDown label="기술" options={techStackOptions} buttonWidth={'435px'} />
          </div>
        </div>
      </div>

      <div css={formListBox}>
        <p css={listLabel}>공고 상세</p>
        <Editor />
      </div>

      <div css={consentField}>
        <div css={consentFieldItem}>
          <input type="checkbox" id="first-condition" />
          <label htmlFor="first-condition">서비스 이용 약관 동의</label>
          <p>* 공고 등록 시 본 서비스의 이용 약관에 동의한 것으로 간주됩니다.</p>
        </div>
        <div css={consentFieldItem}>
          <input type="checkbox" id="second-condition" />
          <label htmlFor="second-condition">공고 내용 책임 동의</label>
          <p>* 등록한 공고 내용에 대한 책임은 등록자에게 있습니다.</p>
          <p>* 허위 정보, 저작권 침해, 차별적 내용 등으로 인한 모든 책임은 등록자에게 있습니다.</p>
        </div>
      </div>

      <button css={submitBtn} type="submit">
        등록하기
      </button>
    </form>
  );
};

export default StudyCreateForm;

const formContainer = css`
  width: 740px;
  height: 100%;
`;

const formListBox = css`
  margin-bottom: 52px;
`;

const listLabel = css`
  font-size: 15px;
  font-family: 'nanumB';
  border-bottom: 1px solid ${colors.gray[400]};
  padding: 3px 7px;
`;

const noLabelItem = (inputWidth) => css`
  border-bottom: 1px solid ${colors.gray[300]};
  padding: 7px 7px;
  font-size: 14px;

  input {
    height: 33px;
    width: ${inputWidth};
    padding: 0px 10px;
    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    font-family: 'nanumR';
  }
`;

const item = css`
  display: flex;
  border-bottom: 1px solid ${colors.gray[300]};

  p {
    width: 118px;
    background-color: #fef7d4;
    font-size: 14px;
    font-family: 'nanumB';
    color: ${colors.gray[400]};

    display: flex;
    align-items: center;
    padding-left: 7px;
    margin-right: 15px;
  }
`;

const itemContent = (inputWidth) => css`
  padding: 16px 7px;
  font-size: 14px;
  color: ${colors.gray[300]};

  display: flex;
  align-items: center;

  input {
    height: 33px;
    width: ${inputWidth};
    padding: 0px 10px;
    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    font-family: 'nanumR';
  }
`;

const inputBtnOption = (mr) => css`
  margin-right: ${mr};
  padding-left: 5px;
  display: flex;
  align-items: center;

  input {
    margin: 0;
    accent-color: ${colors.primary};
  }

  label {
    padding-top: 2px;
    padding-left: 4px;
  }
`;

const consentField = css`
  margin-top: 90px;
  border-top: 1px solid ${colors.gray[300]};
  border-bottom: 1px solid ${colors.gray[300]};
`;

const consentFieldItem = css`
  margin: 15px 0px;

  input {
    accent-color: ${colors.primary};
  }

  label {
    font-size: 14px;
  }

  p {
    font-size: 12px;
    color: ${colors.gray[300]};
    padding-left: 20px;
  }
`;

const submitBtn = css`
  display: block;
  margin: 50px auto;
  width: 350px;
  height: 50px;

  border-radius: 10px;
  border: 1px solid ${colors.gray[300]};
  background-color: #fef7d4;

  font-family: 'nanumEB';
  font-size: 15px;
  color: ${colors.secondary};
`;
