/** @jsxImportSource @emotion/react */
import { colors } from '@/styles/theme';
import { css } from '@emotion/react';
import { formField, fieldLabelBox } from '../applicationFormStyle';
import useApplicationFormStore from '@/stores/apply/useApplicationFormStore';

const PossibleMethod = () => {
  const { meetingType, setMeetingType } = useApplicationFormStore();

  return (
    <div css={formField}>
      <div css={fieldLabelBox}>
        <p className="field-title text-green">진행방식</p>
        <p className="field-description">*참여 가능한 진행방식을 선택해 주세요</p>
      </div>
      <div css={fieldItems}>
        <div css={inputBtnOption}>
          <input
            type="radio"
            name="progress-options"
            id="first-option"
            checked={meetingType === 'ONLINE'}
            onChange={() => setMeetingType('ONLINE')}
          />
          <label htmlFor="first-option">온라인</label>
        </div>

        <div css={inputBtnOption}>
          <input
            type="radio"
            name="progress-options"
            id="second-option"
            checked={meetingType === 'OFFLINE'}
            onChange={() => setMeetingType('OFFLINE')}
          />
          <label htmlFor="second-option">오프라인</label>
        </div>

        <div css={inputBtnOption}>
          <input
            type="radio"
            name="progress-options"
            id="third-option"
            checked={meetingType === 'HYBRID'}
            onChange={() => setMeetingType('HYBRID')}
          />
          <label htmlFor="third-option">온/오프라인</label>
        </div>
      </div>
    </div>
  );
};

export default PossibleMethod;

const fieldItems = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const inputBtnOption = css`
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
