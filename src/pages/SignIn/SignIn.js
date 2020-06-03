import React, { Component } from "react";
import { Formik, Form } from "formik";

import User, { withAuth } from "../../stores/User";

import EmployeesService from "../../services/EmployeesService";

import Wrapper from "../../components/Wrapper";
import Button from "../../components/Button";

import { ErrorMsg, Input } from "./view";

import "./style.scss";

class SignIn extends Component {
  static initialValues = { email: "", password: "" };

  componentDidMount() {
    const { user, history } = this.props;

    if (user) {
      history.push("/home");
    }
  }

  onSubmit = async (values, { setErrors }) => {
    const { history } = this.props;

    try {
      const user = await EmployeesService.login(values);

      User.setUser(user);

      history.push("/home");
    } catch {
      setErrors({ error: "Invalid email or password" });
    }
  };

  validator = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  render() {
    return (
      <Wrapper>
        <h1>Sign in</h1>
        <Formik
          initialValues={SignIn.initialValues}
          validate={this.validator}
          onSubmit={this.onSubmit}
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
              <label htmlFor="check" className="checkbox_pseudo">
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
  }
}

export default withAuth(SignIn);
