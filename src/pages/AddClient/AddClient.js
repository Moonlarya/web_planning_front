import React, { Component } from "react";
import ClientService from "../../services/ClientService";
import { Formik } from "formik";

class AddClient extends Component {
  onSubmit = async (values) => {
    try {
      await ClientService.create(values);
      this.props.history.push("/clients");
    } catch {}
  };
  render() {
    return (
      <div className="col-3 mx-auto m-3">
        <h3>Добавить клиента</h3>
        <Formik
          /* validate={(values) => {
            if (values.name.length < 3) return { name: "err" };
          }}*/
          onSubmit={this.onSubmit}
          initialValues={{
            email: "",
            surname: "",
            name: "",
            patronymic: "",
            phone: "",
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column mt-3 p-3 mx-auto"
            >
              <span>e-mail клиента</span>
              <input
                className="mb-3"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <span>Фамилия</span>
              <input
                className="mb-3"
                type="text"
                name="surname"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
              />
              {errors.surname && touched.surname && errors.surname}
              <span>Имя</span>
              <input
                className="mb-3"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
              <span>Отчество</span>
              <input
                className="mb-3"
                type="text"
                name="patronymic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.patronymic}
              />
              {errors.patronymic && touched.patronymic && errors.patronymic}
              <span>Телефон</span>
              <input
                className="mb-3"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && errors.phone}
              <button
                type="submit"
                className="btn btn-primary m-1"
                disabled={isSubmitting}
              >
                Создать
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddClient;
