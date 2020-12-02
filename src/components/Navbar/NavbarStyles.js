import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";


export const headerStyle = css`
  width: 100%;
  padding: 0px 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 768px) {
    padding: 0 15px;
  }
`

export const logoStyle = css`
  font-size: 1.4rem;
  color: var(--primary-color);
`;

export const navigationStyle = css`
  display: flex;
  list-style-type: none;
`

export const NavigationItem = styled.li`
  display: inline-block;
`

export const NavigationLink = styled(Link)`
  display: inline-block;
  position: relative;
  padding: 20px 20px;
  color: #888;
  font-size: 1.1rem;
  font-weight: 500;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 3px;
    background: #888;
    transition: all .2s ease-in-out;
  }

  &:hover:before {
    width: 100%;
  }
`