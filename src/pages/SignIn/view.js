import styled, { css } from "styled-components";
import { Field, ErrorMessage } from "formik";

export const ErrorMsg = styled(ErrorMessage)`
  font-size: 12px;
  color: red;
`;

export const Input = styled(Field)`
  color: #333;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: rgb(235, 233, 233);
  outline: none;

  &:focus,
  &:active {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    outline: none;
  }

  ${({ valid }) =>
    valid &&
    css`
      border: 1px solid rgb(0, 156, 38);

      &:focus,
      &:active {
        border: 1px solid rgb(0, 156, 38);
        outline: none;
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border: 1px solid rgb(191, 49, 12);
      outline: none;

      &:focus,
      &:active {
        border: 1px solid rgb(255, 255, 0);
        outline: none;
      }
    `}
`;
