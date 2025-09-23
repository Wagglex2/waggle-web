/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import Editor from './components/Editor';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ProjectCreateForm = () => {
  return (
    <form css={formContainer}>
      <div css={formListBox}>
        <p css={listLabel}>공고구분</p>
        <div css={item}>
          <p>카테고리</p>
          <div css={itemContent}>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="category-options" id="first-option" />
              <label htmlFor="first-option">프로젝트</label>
            </div>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="category-options" id="second-option" />
              <label htmlFor="second-option">과제</label>
            </div>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="category-options" id="third-option" />
              <label htmlFor="third-option">스터디</label>
            </div>
          </div>
        </div>
        <div css={item}>
          <p>목적</p>
          <div css={itemContent}>
            <div css={dropDown('200px')}>
              <button>
                목적{' '}
                <ArrowDropDownIcon
                  css={css({ float: 'right', color: '#3B3537', paddingTop: '3px' })}
                />
              </button>
            </div>
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
          <p>진행방식</p>
          <div css={itemContent}>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="progress-options" id="first-option" />
              <label htmlFor="first-option">온라인</label>
            </div>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="progress-options" id="second-option" />
              <label htmlFor="second-option">오프라인</label>
            </div>
            <div css={inputBtnOption('100px')}>
              <input type="radio" name="progress-options" id="third-option" />
              <label htmlFor="third-option">온/오프라인</label>
            </div>
          </div>
        </div>
        <div css={item}>
          <p>학년</p>
          <div css={itemContent}>
            <div css={inputBtnOption('40px')}>
              <input type="checkbox" id="first-option" />
              <label htmlFor="first-option">1학년</label>
            </div>
            <div css={inputBtnOption('40px')}>
              <input type="checkbox" id="second-option" />
              <label htmlFor="second-option">2학년</label>
            </div>
            <div css={inputBtnOption('40px')}>
              <input type="checkbox" id="third-option" />
              <label htmlFor="third-option">3학년</label>
            </div>
            <div css={inputBtnOption('40px')}>
              <input type="checkbox" id="fourth-option" />
              <label htmlFor="fourth-option">4학년 이상</label>
            </div>
            <div css={inputBtnOption('40px')}>
              <input type="checkbox" id="fifth-option" />
              <label htmlFor="fifth-option">무관</label>
            </div>
          </div>
        </div>
        <div css={item}>
          <p>포지션</p>
          <div css={itemContent('200px')}>
            <div css={dropDown('200px')}>
              <button>
                포지션
                <ArrowDropDownIcon
                  css={css({ float: 'right', color: '#3B3537', paddingTop: '3px' })}
                />
              </button>
            </div>
            <span css={css({ margin: '0px 15px', color: '#3B3537' })}>:</span>
            <input type="text" placeholder="공고 제목을 적어주세요" />
          </div>
        </div>
        <div css={item}>
          <p>기술</p>
          <div css={itemContent}>
            <div css={dropDown('435px')}>
              <button>
                프로젝트/스터디에 필요한 언어 및 도구를 선택해 주세요
                <ArrowDropDownIcon
                  css={css({ float: 'right', color: '#3B3537', paddingTop: '3px' })}
                />
              </button>
            </div>
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

export default ProjectCreateForm;

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

const dropDown = (buttonWidth) => css`
  height: 33px;
  width: ${buttonWidth};

  button {
    width: 100%;
    height: 100%;
    text-align: left;
    padding-left: 10px;
    line-height: 30px;
    background-color: #ffffff;

    border-radius: 10px;
    border: 1px solid ${colors.gray[300]};
    font-family: 'nanumR';
    color: ${colors.gray[300]};
  }
`;
