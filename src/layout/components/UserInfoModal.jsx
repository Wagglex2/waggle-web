/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';

const positionOptions = [
  '백엔드',
  '프론트엔드',
  '풀스택',
  '데이터',
  'AI',
  '게임',
  '기획',
  '디자인',
];

const techStackOptions = [
  'Java',
  'C/C++',
  'C#',
  'HTML/CSS',
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
  'Git/GitHub',
  'GitHub Actions',
  'Docker',
  'Figma',
  'Notion',
  'Jira',
];

const colors = {
  primary: '#FCD514',
  secondary: '#e0bd00',
  gray: {
    100: '#d9d9d9',
    300: '#E0E0E0',
    400: '#B3B3B3',
  },
  yellow: {
    background: '#FFF9DC',
  },
  danger: '#FF4d4f',
};

const ModalLayout = ({ children }) => (
  <div
    css={css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `}
  >
    {children}
  </div>
);

const WarningPopup = ({ onClose }) => (
  <div css={warningOverlay}>
    <div css={warningBox}>
      <p className="message">작성되지 않은 기본 정보가 있습니다.</p>
      <button onClick={onClose} css={warningBtn}>
        확인
      </button>
    </div>
  </div>
);

const ArrowIcon = () => (
  <svg
    css={arrowIconStyle}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 10L12 15L17 10H7Z" fill="currentColor" />
  </svg>
);

const MultiSelectDropDown = ({
  label,
  options,
  buttonWidth,
  selected,
  setSelected,
  isGrid = false,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const isSelected = selected.length > 0;

  return (
    <div css={dropdownContainerStyle(buttonWidth)} ref={dropdownRef}>
      <button
        type="button"
        css={dropDownButtonStyle(buttonWidth, isSelected)}
        onClick={() => setOpenModal(!openModal)}
      >
        <div className="text-area">
          {selected.length === 0 ? (
            <span>{label}</span>
          ) : (
            <>
              {selected.slice(0, 3).map((option, index) => (
                <span key={option}>
                  {option}
                  {index < Math.min(selected.length, 3) - 1 ? ', ' : ''}
                </span>
              ))}
              {selected.length > 3 && <span> +{selected.length - 3}</span>}
            </>
          )}
        </div>
        <ArrowIcon />
      </button>

      {openModal && (
        <ul css={isGrid ? techDropDownMenuStyle : dropDownMenuStyle}>
          {options.map((option) => {
            const isItemChecked = selected.includes(option);
            return (
              <li
                key={option}
                css={dropDownMenuItemStyle(isItemChecked, isGrid)}
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  css={customCheckboxStyle}
                  checked={isItemChecked}
                  onChange={() => {}}
                />
                <span>{option}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

const UserInfoModal = ({ setOpenModal, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [intro, setIntro] = useState('');
  const [positions, setPositions] = useState([]);
  const [techStack, setTechStack] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  const textareaRef = useRef(null);
  const grades = [1, 2, 3, 4];

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const response = await fetch('/api/v1/users/basic-info', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const isMissingInfo = !data.grade || !data.position || data.position.length === 0;

          if (isMissingInfo) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            if (setOpenModal) setOpenModal(false);
          }

          if (data.grade) setSelectedGrade(data.grade);
          if (data.shortIntro) setIntro(data.shortIntro);
        } else {
          setIsVisible(true);
        }
      } catch (error) {
        setIsVisible(true);
      }
    };

    checkUserInfo();
  }, [setOpenModal]);

  const handleIntroChange = (e) => {
    setIntro(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = '50px';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async () => {
    const isValid =
      selectedGrade !== null && positions.length > 0 && techStack.length > 0 && intro.trim() !== '';

    if (!isValid) {
      setShowWarning(true);
      return;
    }

    const positionMap = {
      백엔드: 'BACK_END',
      프론트엔드: 'FRONT_END',
      풀스택: 'FULL_STACK',
      데이터: 'DATA',
      AI: 'AI',
      게임: 'GAME',
      기획: 'PLANNING',
      디자인: 'DESIGN',
    };

    const toServerEnum = (str) => {
      const specialMap = {
        'C/C++': 'C_CPP',
        'C#': 'CSHARP',
      };
      if (specialMap[str]) return specialMap[str];
      return str.toUpperCase().replace(/[\s.]/g, '_');
    };

    const userData = {
      grade: selectedGrade,
      position: positionMap[positions[0]],
      skills: techStack.map((skill) => toServerEnum(skill)),
      shortIntro: intro,
    };

    try {
      const response = await fetch('/api/v1/users/basic-info', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        try {
          const errorData = JSON.parse(errorText);
          alert(errorData.message || '저장에 실패했습니다.');
        } catch (e) {
          alert('저장에 실패했습니다.');
        }
        return;
      }

      const responseText = await response.text();
      const result = responseText ? JSON.parse(responseText) : {};

      console.log('Success:', result);

      if (onSave) {
        await onSave(userData);
      }

      if (setOpenModal) {
        setOpenModal(false);
      }
      setIsVisible(false);
    } catch (error) {
      console.error('Network Error:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  if (!isVisible) return null;

  return (
    <ModalLayout>
      <div css={modalBox}>
        <div css={modalHeader}>
          <h2 className="title">기본 정보 입력</h2>
        </div>

        <div css={contentContainer}>
          <div css={sectionStyle}>
            <label className="label">학년</label>
            <div css={gradeBtnContainer}>
              {grades.map((grade) => (
                <button
                  key={grade}
                  type="button"
                  css={gradeBtn(selectedGrade === grade)}
                  onClick={() => setSelectedGrade(grade)}
                >
                  {grade}학년
                </button>
              ))}
            </div>
          </div>

          <div css={sectionStyle}>
            <label className="label">포지션</label>
            <MultiSelectDropDown
              label="포지션을 선택해주세요"
              options={positionOptions}
              buttonWidth="100%"
              selected={positions}
              setSelected={setPositions}
              isGrid={true}
            />
          </div>

          <div css={sectionStyle}>
            <label className="label">기술</label>
            <MultiSelectDropDown
              label="기술을 선택해주세요"
              options={techStackOptions}
              buttonWidth="100%"
              selected={techStack}
              setSelected={setTechStack}
              isGrid={true}
            />
          </div>

          <div css={sectionStyle}>
            <label className="label">한 줄 소개</label>
            <textarea
              ref={textareaRef}
              value={intro}
              onChange={handleIntroChange}
              placeholder="자신을 한 줄로 소개해주세요."
              css={introInput}
              rows={1}
            />
          </div>
        </div>

        <div css={buttonWrapper}>
          <button type="button" css={submitBtn} onClick={handleSubmit}>
            완료
          </button>
        </div>

        {showWarning && <WarningPopup onClose={() => setShowWarning(false)} />}
      </div>
    </ModalLayout>
  );
};

export default UserInfoModal;

const modalBox = css`
  width: 750px;
  height: 800px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 40px 50px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'nanumR', sans-serif;
`;

const modalHeader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 50px;
  min-height: 40px;

  .title {
    font-family: 'nanumEB', sans-serif;
    font-size: 32px;
    font-weight: 800;
    margin: 0;
    color: #000;
  }
`;

const contentContainer = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const sectionStyle = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .label {
    font-family: 'nanumEB', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: #333;
  }
`;

const gradeBtnContainer = css`
  display: flex;
  gap: 10px;
`;

const gradeBtn = (isSelected) => css`
  width: 85px;
  height: 40px;
  border-radius: 10px;
  font-family: 'nanumR', sans-serif;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${isSelected ? colors.primary : '#ffffff'};
  border: ${isSelected ? 'none' : `1px solid ${colors.gray[100]}`};
  color: ${isSelected ? '#000' : '#333'};
  font-weight: ${isSelected ? 'bold' : 'normal'};

  &:hover {
    border-color: ${colors.primary};
  }
`;

const introInput = css`
  width: 100%;
  min-height: 50px;
  max-height: 150px;
  border: 1px solid ${colors.gray[100]};
  border-radius: 8px;
  padding: 14px 20px;
  font-family: 'nanumR', sans-serif;
  font-size: 16px;
  box-sizing: border-box;
  resize: none;
  overflow-y: hidden;
  line-height: 1.5;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const buttonWrapper = css`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const submitBtn = css`
  width: 450px;
  height: 50px;
  background-color: ${colors.primary};
  border: none;
  border-radius: 10px;
  font-family: 'nanumEB', sans-serif;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const warningOverlay = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  border-radius: 10px;
`;

const warningBox = css`
  width: 300px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: popIn 0.2s ease-out;

  @keyframes popIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .message {
    font-family: 'nanumEB', sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
`;

const warningBtn = css`
  padding: 8px 20px;
  background-color: ${colors.primary};
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  font-family: 'nanumEB', sans-serif;

  &:hover {
    background-color: ${colors.secondary};
  }
`;

const dropdownContainerStyle = (width) => css`
  position: relative;
  display: inline-block;
  width: ${width};
`;

const dropDownButtonStyle = (width, isSelected) => css`
  width: 100%;
  height: 50px;
  background-color: ${isSelected ? colors.yellow.background : '#ffffff'};
  border-radius: 10px;
  border: 1px solid ${colors.gray[400]};
  font-size: 16px;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  padding: 0 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'nanumR', sans-serif;
  transition:
    background-color 0.2s,
    color 0.2s;

  .text-area {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    gap: 5px;
  }

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

const arrowIconStyle = css`
  margin-left: 10px;
  color: ${colors.gray[300]};
  flex-shrink: 0;
`;

const dropDownMenuStyle = css`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 8px;
  padding: 8px;
  list-style: none;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
`;

const techDropDownMenuStyle = css`
  ${dropDownMenuStyle};
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const customCheckboxStyle = css`
  appearance: none;
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
  transition:
    background-color 0.2s,
    border-color 0.2s;
  flex-shrink: 0;

  &:checked {
    background-color: ${colors.primary};
    border-color: ${colors.primary};
    &::after {
      content: '✔';
      font-size: 14px;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const dropDownMenuItemStyle = (isSelected, isGrid = false) => css`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  font-family: 'nanumR', sans-serif;
  font-size: 14px;
  white-space: nowrap;
  color: ${isSelected ? colors.secondary : colors.gray[400]};
  background-color: ${isSelected && !isGrid ? colors.yellow.background : 'transparent'};

  &:hover {
    background-color: ${colors.yellow.background};
  }
`;
