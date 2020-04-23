import React, { Component, Fragment } from "react";
import ReviewsService from "../../services/ReviewsService";
import { Formik } from "formik";

class AddReview extends Component {
  onSubmit = async (values) => {
    try {
      await ReviewsService.create(values);
      this.props.history.push("/review");
    } catch {}
  };
  render() {
    return (
      <div>
        <h1>Добавить резюме</h1>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            surname: "",
            name: "",
            patronymic: "",
            description: "",
            email: "",
            phone: "",
            priority: "",
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
              className="d-flex flex-column formCreate"
            >
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
              <span>Комментарий</span>
              <input
                className="mb-3"
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />
              {errors.description && touched.description && errors.description}
              <span>e-mail</span>
              <input
                className="mb-3"
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <span>Номер телефона</span>
              <input
                className="mb-3"
                type="text"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {errors.phone && touched.phone && errors.phone}
              <span>Приоритет</span>
              <input
                className="mb-3"
                type="text"
                name="priority"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.priority}
              />
              {errors.priority && touched.priority && errors.priority}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default AddReview;
