/** @jsxImportSource @emotion/react */
import useCreateJobStore from '@/stores/useCreateJobStore';
import { field, fieldContent, inputBtnOption } from '../fieldStyle';

const MethodField = () => {
  const { meetingType, setMeetingType } = useCreateJobStore();

  return (
    <div css={field}>
      <p className="field-name">진행방식</p>
      <div css={fieldContent}>
        <div css={inputBtnOption('100px')}>
          <input
            type="radio"
            name="progress-options"
            id="first-option"
            checked={meetingType === 'ONLINE'}
            onChange={() => setMeetingType('ONLINE')}
          />
          <label htmlFor="first-option">온라인</label>
        </div>
        <div css={inputBtnOption('100px')}>
          <input
            type="radio"
            name="progress-options"
            id="second-option"
            checked={meetingType === 'OFFLINE'}
            onChange={() => setMeetingType('OFFLINE')}
          />
          <label htmlFor="second-option">오프라인</label>
        </div>
        <div css={inputBtnOption('100px')}>
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

export default MethodField;
