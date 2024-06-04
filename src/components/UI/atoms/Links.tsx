import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  text-decoration: none;
  color: var(--color-1);
  transition: all 0.3s ease;
`;

export const LinkButton = styled(LinkStyled)`
  padding: 10px 20px;
  // border-radius: 5px;
  height: 100%;
  display: flex;
  align-items: center;
  // border: 1px solid var(--color-1);

  &:hover {
    color: var(--color-8);
    background-color: var(--color-1);
  }

  &.active {
    color: var(--color-8);
    background-color: var(--color-1);
  }
`;
