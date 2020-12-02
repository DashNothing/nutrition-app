/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";


const HeadingText = styled.h1`
  margin-bottom: ${({ big }) => (big ? "25px" : "60px")};
  font-size: ${({ big }) => (big ? "1.8rem" : "1.5rem")};
  line-height: 150%;
  color: #333;
  font-variant-numeric: oldstyle-nums;
`;

const Heading = ({ big, ...props }) => {

  return (
    <HeadingText big={big}>{props.children}</HeadingText>
  );
}

export default Heading
