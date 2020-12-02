/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useEffect } from "react";


const containerStyle = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const nutrientTypeStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  margin: 0 10px;
  background-color: #fff;
  color: #666;
  font-weight: 500;
  font-size: 1.1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, .1);
  border-radius: 5px;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }

  &.selected {
    box-shadow: 0px 0px 2px rgba(0, 0, 0, .1);
    background-color: #f4f4f4;
  }
`;

const NutrientDisplayMenu = ({ onClick, selectedNutrientType }) => {

  return (
    <div css={containerStyle}>
      <div
        css={nutrientTypeStyle}
        className={selectedNutrientType == "basic" ? "selected" : null}
        id="basic"
        onClick={onClick}
      >
        Basic
      </div>
      <div
        css={nutrientTypeStyle}
        className={selectedNutrientType == "minerals" ? "selected" : null}
        id="minerals"
        onClick={onClick}
      >
        Minerals
      </div>
      <div
        css={nutrientTypeStyle}
        className={selectedNutrientType == "vitamins" ? "selected" : null}
        id="vitamins"
        onClick={onClick}
      >
        Vitamins
      </div>
    </div>
  )
}

export default NutrientDisplayMenu
