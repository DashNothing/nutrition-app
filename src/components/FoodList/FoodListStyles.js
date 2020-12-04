import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";


export const ulStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
  width: 100%;
  list-style-type: none;
`;

export const ulGridStyle = css`
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;

export const FoodListItem = styled.div`
  display: inline-block;
  padding: 20px 40px;
  width: 100%;
  background-color: #fcfcfc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all .1s ease;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
    background-color: #fff;
  }
`;