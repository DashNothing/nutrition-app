import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";


export const exploreStyle = css`
  width: 100%;
  padding-top: 100px;
`;

export const wrapperStyle = css`
  width: 80%;
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const tipStyle = css`
  margin-top: 50px;
  color: #666;
  font-weight: 500;
  align-self: flex-start;
  line-height: 150%;
`

export const TipLink = styled(Link)`
  color: var(--dark-color);
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`