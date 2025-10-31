/** @jsxImportSource @emotion/react */
import { formItem, itemLabelBox } from '../applicationFormStyle';

const MyDetails = () => {
  return (
    <div css={formItem}>
      <div css={itemLabelBox}>
        <p className="item-title text-green">상세 설명</p>
      </div>
      <textarea placeholder="어쩌구저쩌구 뭐 적지" />
    </div>
  );
};

export default MyDetails;
