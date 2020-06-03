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
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "100%",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "100%",
                  position: "absolute",
                  backgroundColor: "#333",
                  cursor: "pointer",
                }}
              ></div>
              <img src={photo} alt="img" style={{ width: "inherit" }}></img>
            </div>
          </div>
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
                onSubmit={handleSubmit}
                className="d-flex flex-column mt-3 p-3 mx-auto col-3"
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
