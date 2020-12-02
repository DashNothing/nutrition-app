/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { BsGrid3X3Gap } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";


const containerStyle = css`
  display: flex;
  height: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, .1);
  border-radius: 25px;
  overflow: hidden;
`;

const iconStyle = css`
  font-size: 1.8rem;
`;

const buttonStyle = css`
  display: inline-block;
  padding: 5px 20px;
  background-color: #eee;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    opacity: .6;
  }
`;

const leftButtonStyle = css`
  padding-right: 10px;
`;

const rightButtonStyle = css`
  padding-left: 10px;
`;

const activeStyle = css`
  top: -5px;
  background-color: #fff;

  & .icon {
    color: var(--primary-color);
  }
`;

const ListDisplayMenu = ({ isGrid, onGridClick, onListClick }) => {

  return (
    <div css={containerStyle}>
      <button
        onClick={onListClick}
        css={[buttonStyle, leftButtonStyle, isGrid ? null : activeStyle]}
      >
        <FaListUl css={iconStyle} className="icon" />
      </button>
      <button
        onClick={onGridClick}
        css={[buttonStyle, rightButtonStyle, isGrid ? activeStyle : null]}
      >
        <BsGrid3X3Gap css={iconStyle} className="icon" />
      </button>
    </div>
  )
}

export default ListDisplayMenu
