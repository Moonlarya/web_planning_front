import React, { Component } from "react";
import { Formik } from "formik";
import { withAuth } from "../../stores/User";

import EmployeesService from "../../services/EmployeesService";

import photo from "../../assets/images/avatar1.jpg";

class Profile extends Component {
  onSubmit = async (values) => {
    const { user } = this.props;
    try {
      await EmployeesService.update(user._id, { password: values.newPassword });
      this.props.history.push("/home");
    } catch {}
  };
  render() {
    return (
      <div>
        <main className="m-3 text-center">
          <h5>Мой кабинет</h5>

          <Formik
            validate={(values) => {
              if (values.newPassword !== values.repeatPassword)
                return { error: "Пароли не совпадают!" };
            }}
            onSubmit={this.onSubmit}
            initialValues={{ newPassword: "", repeatPassword: "" }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="d-flex flex-column col-12 col-md-5 col-lg-4 mx-auto m-3"
              >
                <span>Введите новый пароль</span>
                <input
                  className="mb-3"
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.newPassword}
                />
                {errors.newPassword &&
                  touched.newPassword &&
                  errors.newPassword}
                <span>Повторите новый пароль</span>
                <input
                  className="mb-3"
                  type="password"
                  name="repeatPassword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.repeatPassword}
                />
                {errors.repeatPassword &&
                  touched.repeatPassword &&
                  errors.repeatPassword}
                <h5>{errors.error}</h5>
                <button
                  type="submit"
                  className="btn btn-primary m-1"
                  disabled={isSubmitting}
                >
                  Изменить пароль
                </button>
              </form>
            )}
          </Formik>
        </main>
      </div>
    );
  }
}

export default withAuth(Profile);
