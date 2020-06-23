import React, { Component } from "react";
import ReviewsService from "../../services/ReviewsService";
import { Formik } from "formik";
import InputMask from "react-input-mask";

import { ErrorMsg } from "../SignIn/view";

class AddReview extends Component {
  onSubmit = async (values) => {
    try {
      await ReviewsService.create(values);
      this.props.history.push("/review");
    } catch {}
  };
  render() {
    return (
      <div className="col-12 col-md-5 col-lg-4 mx-auto m-3 ">
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

              <ErrorMsg name="surname" component="div" />
              <span>Имя</span>
              <input
                className="mb-3"
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              <ErrorMsg name="name" component="div" />
              <span>Отчество</span>
              <input
                className="mb-3"
                type="text"
                name="patronymic"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.patronymic}
              />

              <ErrorMsg name="patronymic" component="div" />
              <span>Комментарий</span>
              <textarea
                className="mb-3"
                cols="300"
                style={{ resize: "none" }}
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />

              <ErrorMsg name="description" component="div" />
              <span>e-mail</span>
              <input
                className="mb-3"
                type="text"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMsg name="email" component="div" />
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
              <ErrorMsg name="type" component="div" />
              <span>Номер телефона</span>
              <InputMask
                className="mb-3"
                type="tel"
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                {...this.props}
                mask="+99\(999) 999 99 99"
                maskChar=" "
              />
              <ErrorMsg name="phone" component="div" />
              <span>Приоритет</span>
              <input
                className="mb-3"
                type="text"
                name="priority"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.priority}
              />
              <ErrorMsg name="priority" component="div" />

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
