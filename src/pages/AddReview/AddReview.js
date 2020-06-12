import React, { Component } from "react";
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
      <div className="col-3 mt-3 p-3 mx-auto">
        <h3>Добавить резюме</h3>
        <Formik
          onSubmit={this.onSubmit}
          initialValues={{
            surname: "",
            name: "",
            patronymic: "",
            description: "",
            type: "",
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
              autoComplete="off"
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
              <span>Должность</span>
              <select
                className="mb-3"
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
              >
                <option value="" disabled label="Должность" />
                <option value="marketolog">Маркетолог</option>
                <option value="copywriter">Копирайтер</option>
                <option value="designer">Дизайнер</option>
                <option value="developer">Разработчик</option>
                <option value="hr">HR (рекрутер)</option>
              </select>
              {errors.type && touched.type && errors.type}
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

export default AddReview;
