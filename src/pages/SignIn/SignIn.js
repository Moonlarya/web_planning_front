import React from "react";
import { Formik, Form } from "formik";

import "./style.scss";
import Wrapper from "../../components/Wrapper";
import Button from "../../components/Button";

import EmployeesService from "../../services/EmployeesService";
import { ErrorMsg, Input } from "./view";

import User, { withAuth } from "../../stores/User";

const SignIn = (props) => {
  console.log(props);
  //const history = useHistory();
  return (
    <Wrapper>
      <div>{props.user && props.user.name}</div>
      <h1>Sign in</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={async (values, { setErrors }) => {
          try {
            const user = await EmployeesService.login(values);

            User.setUser(user);

            // props.history.push("/home");
          } catch {
            setErrors({ error: "Invalid email or password" });
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
export default withAuth(SignIn);
