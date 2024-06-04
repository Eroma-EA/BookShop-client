import styled from "styled-components";

export const InputField = styled.input`
  width: 100%;
  display: block;
  outline: none;
  padding: 10px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid var(--color-2);
  transition: all 0.3s ease;
  InputField &:focus {
    border-color: var(--color-3);
  }
`;
