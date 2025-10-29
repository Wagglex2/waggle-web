/** @jsxImportSource @emotion/react */
import { field, fieldContent } from '../fieldStyle';

const CategoryField = ({ categoryName }) => {
  return (
    <div css={field}>
      <p className="field-name">카테고리</p>
      <p css={fieldContent} className="text-black">
        {categoryName}
      </p>
    </div>
  );
};

export default CategoryField;
