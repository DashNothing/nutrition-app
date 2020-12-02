import { css } from "@emotion/react";


export const searchForm = css`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;

  input {
    font-size: 1.1rem;
  }

  &.nav {
    margin: 0 50px;

    input {
      height: 45px;
      font-size: 1rem;
    }

    input[type=text]{
      border-radius: 6px 0 0 6px;
    }

    input[type=submit]{
      border-radius:  0 6px 6px 0 ;
    }
  }
`;

export const searchFieldStyle = css`
  height: 50px;
  padding-left: 15px;
  border: 2px solid #ccc;
  border-right: none;
  border-radius: 10px 0 0 10px;
  outline: none;
  color: #666;
  background-color: #fafafa;

  &::placeholder {
    color: #888;
  }

  &:focus {
    background-color: #fff;
  }
`;

export const searchButtonStyle = css`
  height: 50px;
  padding: 0 15px;
  background-color: var(--primary-color);
  border: none;
  outline: none;
  border-radius: 0 10px 10px 0;
  font-weight: 500;
  color: white;
  cursor: pointer;
`;