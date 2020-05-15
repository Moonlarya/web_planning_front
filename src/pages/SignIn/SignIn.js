import React from "react";
import styled, { css } from "styled-components";
import "./style.scss";
import Wrapper from "../../components/Wrapper";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

const ErrorMsg = styled(ErrorMessage)`
  font-size: 12px;
  color: red;
`;

const Input = styled(Field)`
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

const SignIn = (props) => {
  //const history = useHistory();
  return (
    <Wrapper>
      <h1>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          /*if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }*/
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          /*
          const user = JSON.parse(localStorage.getItem("user"));
          if (
            values.password !== user.password ||
            values.email !== user.email
          ) {
            setErrors({ error: "Invalid email or password" });
          }*/
          if (values.password === "1" && values.email === "1") {
            props.history.push("/home");
          } else {
            setErrors({ error: "Invalid email or password" });
          }
          if (values.check) {
            localStorage.setItem("user", JSON.stringify(values));
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <ErrorMsg name="email" component="div" />
            <Input
              placeholder="Email*"
              type="text"
              name="email"
              valid={touched.email && !errors.email}
              error={touched.email && errors.email}
            />
            <ErrorMsg name="password" component="div" />
            <Input
              placeholder="Password*"
              type="password"
              name="password"
              valid={touched.password && !errors.password}
              error={touched.password && errors.password}
            />
            <Button type="submit" disabled={isSubmitting}>
              Sign In
            </Button>
            {errors.error && <p>{errors.error}</p>}
            <label for="check" className="checkbox_pseudo">
              <Input
                type="checkbox"
                name="check"
                style={{ width: "max-content" }}
              />
              Remember
            </label>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default SignIn;
