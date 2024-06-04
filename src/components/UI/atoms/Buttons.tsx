import styled from "styled-components";

export const Button = styled.input.attrs({ type: "submit" })<{ disabled?: boolean }>`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--color-1);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
