/** @jsxRuntime automatic */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

const gridStyle = css`
  display: flex; 
  flex-wrap: wrap; 
  gap: 18px;
  justify-content: start; 
`;

const flexItemStyle = css`
  width: 360px;
  min-height: 280px;
`;

export default function CardGrid({ items, itemsPerPage, renderCard }) {
  const emptyCardCount = itemsPerPage - items.length > 0 ? itemsPerPage - items.length : 0;
  const emptyCards = Array.from({ length: emptyCardCount }, (_, index) => (
    <div key={`empty-${index}`} css={flexItemStyle} />
  ));

  return (
    <div css={gridStyle}>
      {items.map((item) => (
        <div key={item.id} css={flexItemStyle}>
          {renderCard(item)}
        </div>
      ))}
      {emptyCards}
    </div>
  );
}